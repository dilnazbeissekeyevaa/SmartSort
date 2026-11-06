import { Ionicons } from "@expo/vector-icons";
import { CameraView as Camera, useCameraPermissions } from "expo-camera";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScanResult = {
    material: string;
    confidence: number;
    category?: string;
    recyclable?: boolean;
    instructions?: string[];
};

type LocationItem = {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
    distanceKm?: number;
};

type ScanRouteParams = {
    imageBase64?: string;
    imageUri?: string;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ?? "";
const HAS_API_BASE_URL = API_BASE_URL.length > 0;
const DEFAULT_SCAN_RESULT: ScanResult = {
    material: "Plastic",
    confidence: 95,
    category: "Recyclable waste",
    recyclable: true,
    instructions: ["Rinse first", "Keep it dry"],
};
const MOCK_LOCATIONS: LocationItem[] = [
    {
        name: "Eco Point",
        address: "Green Street 12",
        latitude: 41.31,
        longitude: 69.28,
        distanceKm: 1.8,
    },
    {
        name: "Recycle Hub",
        address: "Eco Avenue 5",
        latitude: 41.32,
        longitude: 69.27,
        distanceKm: 2.3,
    },
];

function buildApiUrl(path: string) {
    if (!HAS_API_BASE_URL) {
        return path;
    }

    return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ScanScreen() {
    const [scanResult, setScanResult] =
        useState<ScanResult | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [lastCapturedUri, setLastCapturedUri] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<Camera | null>(null);
    const captureFlash = useRef(new Animated.Value(0)).current;
    const captureScale = useRef(new Animated.Value(1)).current;
    const params = useLocalSearchParams<ScanRouteParams>();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (!permission?.granted && permission?.canAskAgain) {
            void requestPermission();
        }
    }, [permission, requestPermission]);

    useEffect(() => {
        if (typeof params.imageBase64 !== "string" || !params.imageBase64.trim()) {
            return;
        }

        void scanItem(params.imageBase64, params.imageUri);
    }, [params.imageBase64, params.imageUri]);

    async function scanItem(imageBase64: string, imageUri?: string) {
        try {
            setIsScanning(true);
            setCameraError(null);

            if (!HAS_API_BASE_URL) {
                console.log("Using mock scan");
                await wait(900);
                setScanResult(DEFAULT_SCAN_RESULT);
                return;
            }



















            const response = await fetch("http://10.1.112.228:8002/scan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageBase64,
                    imageUri,
                }),
            });

            if (!response.ok) {
                throw new Error(`Scan request failed with ${response.status}`);
            }

            const data = (await response.json()) as Partial<ScanResult>;

            setScanResult({
                material: data.material ?? DEFAULT_SCAN_RESULT.material,
                confidence:
                    typeof data.confidence === "number"
                        ? data.confidence
                        : DEFAULT_SCAN_RESULT.confidence,
                category: data.category ?? DEFAULT_SCAN_RESULT.category,
                recyclable:
                    typeof data.recyclable === "boolean"
                        ? data.recyclable
                        : DEFAULT_SCAN_RESULT.recyclable,
                instructions:
                    Array.isArray(data.instructions) &&
                    data.instructions.every(
                        (instruction) => typeof instruction === "string"
                    )
                        ? data.instructions
                        : DEFAULT_SCAN_RESULT.instructions,
            });
        } catch (error) {
            console.error("Failed to scan item:", error);
            Alert.alert(
                "Scan failed",
                "We could not analyze this item right now."
            );
        } finally {
            setIsScanning(false);
        }
    }

    async function handleCapture() {
        if (!cameraRef.current) {
            setCameraError("Camera is not ready yet.");
            return;
        }

        try {
            setIsCapturing(true);
            setCameraError(null);
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(captureFlash, {
                        toValue: 0.22,
                        duration: 110,
                        useNativeDriver: true,
                    }),
                    Animated.spring(captureScale, {
                        toValue: 0.92,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(captureFlash, {
                        toValue: 0,
                        duration: 180,
                        useNativeDriver: true,
                    }),
                    Animated.spring(captureScale, {
                        toValue: 1,
                        friction: 4,
                        tension: 120,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();

            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
            });

            const imageBase64 = photo.base64;
            const imageUri = photo.uri;

            if (!imageBase64) {
                throw new Error("Could not read photo data.");
            }

            setLastCapturedUri(imageUri);
            await scanItem(imageBase64, imageUri);
        } catch (error) {
            console.error("Camera capture failed:", error);
            setCameraError("Camera failed to capture the item.");
        } finally {
            setIsCapturing(false);
        }
    }

    async function getLocations(material: string): Promise<LocationItem[]> {
        if (!HAS_API_BASE_URL) {
            console.log("Using mock locations");
            return MOCK_LOCATIONS;
        }

        const response = await fetch(
            buildApiUrl(
                `/locations?material=${encodeURIComponent(material)}`
            )
        );

        if (!response.ok) {
            throw new Error(
                `Locations request failed with ${response.status}`
            );
        }

        const data = (await response.json()) as LocationItem[];
        return data;
    }

    async function handleWhereToSend() {
        if (!scanResult) {
            Alert.alert(
                "No scan result yet",
                "Take a photo first to see where to send this item."
            );
            return;
        }

        try {
            setIsLoadingLocations(true);

            const locations = await getLocations(scanResult.material);

            router.push(
                `/locations?locations=${encodeURIComponent(
                    JSON.stringify(locations)
                )}&material=${encodeURIComponent(scanResult.material)}` as never
            );
        } catch (error) {
            console.error("Failed to load locations:", error);
            Alert.alert(
                "Locations unavailable",
                error instanceof Error
                    ? error.message
                    : "We could not load nearby drop-off locations."
            );
        } finally {
            setIsLoadingLocations(false);
        }
    }

    const confidencePercentage = scanResult
        ? Math.round(scanResult.confidence)
        : 0;
    const isBusy = isCapturing || isScanning;

    function renderCameraContent() {
        if (!permission) {
            return (
                <View style={styles.cameraFallback}>
                    <ActivityIndicator size="large" color="#A8D5C2" />
                    <Text style={styles.cameraFallbackText}>
                        Requesting camera permission...
                    </Text>
                </View>
            );
        }

        if (!permission.granted) {
            return (
                <View style={styles.cameraFallback}>
                    <Ionicons name="camera-outline" size={42} color="#A8D5C2" />
                    <Text style={styles.cameraFallbackTitle}>
                        Camera access needed
                    </Text>
                    <Text style={styles.cameraFallbackText}>
                        Allow camera permission to scan items here.
                    </Text>
                </View>
            );
        }

        return (
            <Camera
                ref={cameraRef}
                style={styles.camera}
                facing="back"
                onMountError={(event) => {
                    setCameraError(event.message);
                }}
            />
        );
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Stack.Screen options={{ headerShown: false }} />

            <View
                style={[
                    styles.header,
                    { paddingTop: Math.max(insets.top, 12) + 8 },
                ]}
            >
                <TouchableOpacity
                    onPress={() => router.push("/(tabs)")}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan Result</Text>
                <View style={{ width: 36 }} />
            </View>

            <View style={styles.imageContainer}>
                {renderCameraContent()}

                <View pointerEvents="none" style={styles.overlayFrame}>
                    <View style={[styles.corner, styles.cornerTopLeft]} />
                    <View style={[styles.corner, styles.cornerTopRight]} />
                    <View style={[styles.corner, styles.cornerBottomLeft]} />
                    <View style={[styles.corner, styles.cornerBottomRight]} />
                    <View style={styles.overlayCenter}>
                        <Text style={styles.overlayHint}>
                            Center the item inside the frame
                        </Text>
                    </View>
                </View>

                <View style={styles.previewBadge}>
                    <Ionicons name="sparkles" size={14} color="#fff" />
                    <Text style={styles.previewBadgeText}>AI Ready</Text>
                </View>

                {cameraError ? (
                    <View style={styles.errorBanner}>
                        <Text style={styles.errorBannerText}>{cameraError}</Text>
                    </View>
                ) : null}

                {lastCapturedUri ? (
                    <View style={styles.captureBadge}>
                        <Ionicons name="checkmark-circle" size={14} color="#fff" />
                        <Text style={styles.captureBadgeText}>Photo captured</Text>
                    </View>
                ) : null}

                {permission?.granted ? (
                    <Animated.View
                        style={[
                            styles.captureButtonWrap,
                            { transform: [{ scale: captureScale }] },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={handleCapture}
                            disabled={isBusy}
                        >
                            <View style={styles.captureButtonOuterRing}>
                                <View style={styles.captureButtonInner} />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null}

                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.captureFlashOverlay,
                        { opacity: captureFlash },
                    ]}
                />

                {isBusy ? (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Analyzing item...</Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Detected Material</Text>
                {scanResult ? (
                    <>
                        <Text style={styles.resultText}>{scanResult.material}</Text>
                        <Text style={styles.categoryText}>
                            {scanResult.category ?? "Material classification"}
                        </Text>
                        <View style={styles.confidenceBar}>
                            <View
                                style={[
                                    styles.confidenceLevel,
                                    {
                                        width: `${Math.max(
                                            0,
                                            Math.min(confidencePercentage, 100)
                                        )}%`,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.confidenceText}>
                            {confidencePercentage}% Confidence
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.resultText}>Scan an item</Text>
                        <Text style={styles.categoryText}>
                            Take a photo to see the detected material.
                        </Text>
                    </>
                )}
            </View>

            <View style={styles.aiSection}>
                <Text style={styles.sectionTitle}>AI Analysis</Text>
                <View style={styles.aiCard}>
                    {scanResult ? (
                        <>
                            <View style={styles.aiItem}>
                                <Ionicons
                                    name={
                                        scanResult.recyclable
                                            ? "checkmark-circle"
                                            : "close-circle"
                                    }
                                    size={20}
                                    color="#A8D5C2"
                                />
                                <Text style={styles.aiText}>
                                    {scanResult.recyclable
                                        ? "Recyclable material"
                                        : "Special handling needed"}
                                </Text>
                            </View>
                            <View style={styles.divider} />
                        </>
                    ) : (
                        <>
                            <View style={styles.aiItem}>
                                <Ionicons
                                    name="sparkles-outline"
                                    size={20}
                                    color="#A8D5C2"
                                />
                                <Text style={styles.aiText}>
                                    Scan an item to see analysis
                                </Text>
                            </View>
                            <View style={styles.divider} />
                        </>
                    )}
                    <View style={styles.aiItem}>
                        <Ionicons name="hardware-chip" size={20} color="#A8D5C2" />
                        <Text style={styles.aiText}>
                            Backend-ready for camera, AI and maps
                        </Text>
                    </View>
                </View>
            </View>

            {scanResult ? (
                <View style={styles.instructionsSection}>
                    <Text style={styles.sectionTitle}>Sorting Tips</Text>
                    {scanResult.instructions?.map((instruction, index) => (
                        <View
                            key={`${instruction}-${index}`}
                            style={styles.instructionCard}
                        >
                            <View style={styles.instructionIcon}>
                                <Ionicons
                                    name="checkmark"
                                    size={16}
                                    color="#A8D5C2"
                                />
                            </View>
                            <Text style={styles.instructionText}>
                                {instruction}
                            </Text>
                        </View>
                    ))}
                </View>
            ) : null}

            {scanResult ? (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.buttonPrimary}
                        onPress={() => router.push("/modal")}
                    >
                        <Ionicons name="help-circle" size={20} color="#fff" />
                        <Text style={styles.buttonText}>How to sort</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonPrimary}
                        onPress={handleWhereToSend}
                        disabled={isLoadingLocations}
                    >
                        <Ionicons name="location" size={20} color="#fff" />
                        <Text style={styles.buttonText}>
                            {isLoadingLocations
                                ? "Loading locations..."
                                : "Where to send"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={() => router.push("/modal")}
                    >
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color="#A8D5C2"
                        />
                        <Text style={styles.buttonTextSecondary}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FFFE",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 12,
    },

    backButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#A8D5C2",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },

    imageContainer: {
        height: 360,
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        position: "relative",
    },

    camera: {
        width: "100%",
        height: "100%",
    },

    overlayFrame: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },

    overlayCenter: {
        width: "72%",
        height: "52%",
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        backgroundColor: "rgba(255,255,255,0.04)",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 18,
    },

    overlayHint: {
        color: "rgba(255,255,255,0.88)",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },

    corner: {
        position: "absolute",
        width: 34,
        height: 34,
        borderColor: "#FFFFFF",
    },

    cornerTopLeft: {
        top: "24%",
        left: "14%",
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderTopLeftRadius: 16,
    },

    cornerTopRight: {
        top: "24%",
        right: "14%",
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderTopRightRadius: 16,
    },

    cornerBottomLeft: {
        bottom: "24%",
        left: "14%",
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderBottomLeftRadius: 16,
    },

    cornerBottomRight: {
        bottom: "24%",
        right: "14%",
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderBottomRightRadius: 16,
    },

    cameraFallback: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 10,
        backgroundColor: "#F1F5F4",
    },

    cameraFallbackTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },

    cameraFallbackText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        lineHeight: 20,
    },

    previewBadge: {
        position: "absolute",
        top: 16,
        right: 16,
        backgroundColor: "rgba(0,0,0,0.45)",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    previewBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },

    errorBanner: {
        position: "absolute",
        left: 16,
        right: 16,
        top: 56,
        backgroundColor: "rgba(180, 60, 60, 0.9)",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    errorBannerText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },

    captureBadge: {
        position: "absolute",
        left: 16,
        top: 16,
        backgroundColor: "rgba(0,0,0,0.45)",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    captureBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },

    captureButtonWrap: {
        position: "absolute",
        bottom: 22,
    },

    captureButton: {
        width: 78,
        height: 78,
        borderRadius: 39,
        justifyContent: "center",
        alignItems: "center",
    },

    captureButtonOuterRing: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: "rgba(255,255,255,0.18)",
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.42)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },

    captureButtonInner: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#fff",
        borderWidth: 4,
        borderColor: "rgba(245,255,254,0.65)",
    },

    captureFlashOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#FFFFFF",
    },

    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },

    loadingText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },

    resultContainer: {
        marginHorizontal: 16,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 24,
        backgroundColor: "#A8D5C2",
        borderRadius: 18,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },

    resultLabel: {
        fontSize: 12,
        color: "rgba(255,255,255,0.7)",
        marginBottom: 8,
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    resultText: {
        fontSize: 40,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },

    categoryText: {
        fontSize: 14,
        fontWeight: "600",
        color: "rgba(255,255,255,0.85)",
        marginBottom: 16,
    },

    confidenceBar: {
        width: "100%",
        height: 6,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: 8,
    },

    confidenceLevel: {
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 3,
    },

    confidenceText: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        fontWeight: "500",
    },

    aiSection: {
        marginHorizontal: 16,
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 12,
    },

    aiCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        gap: 12,
    },

    aiItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    aiText: {
        flex: 1,
        fontSize: 13,
        color: "#666",
        fontWeight: "500",
    },

    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#E0E0E0",
    },

    instructionsSection: {
        marginHorizontal: 16,
        marginBottom: 20,
    },

    instructionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        gap: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    instructionIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F2FBF7",
        justifyContent: "center",
        alignItems: "center",
    },

    instructionText: {
        flex: 1,
        color: "#333",
        fontSize: 14,
        fontWeight: "500",
    },

    buttonsContainer: {
        marginHorizontal: 16,
        gap: 10,
        marginBottom: 20,
    },

    buttonPrimary: {
        backgroundColor: "#A8D5C2",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        elevation: 2,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    buttonSecondary: {
        borderWidth: 2,
        borderColor: "#A8D5C2",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    buttonText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#fff",
    },

    buttonTextSecondary: {
        fontSize: 15,
        fontWeight: "700",
        color: "#A8D5C2",
    },
});
