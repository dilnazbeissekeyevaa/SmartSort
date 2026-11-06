import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type LocationItem = {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
    distanceKm?: number;
};

function parseLocations(value: string | string[] | undefined) {
    const rawValue = Array.isArray(value) ? value[0] : value;

    if (!rawValue) {
        return [] as LocationItem[];
    }

    try {
        const parsed = JSON.parse(rawValue) as LocationItem[];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Failed to parse locations param:", error);
        return [];
    }
}

export default function LocationsScreen() {
    const { locations, material } = useLocalSearchParams<{
        locations?: string | string[];
        material?: string | string[];
    }>();
    const locationList = parseLocations(locations);
    const materialName = Array.isArray(material) ? material[0] : material;

    function openInMaps(location: LocationItem) {
        if (
            typeof location.latitude === "number" &&
            typeof location.longitude === "number"
        ) {
            void Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
            );
            return;
        }

        const encodedAddress = encodeURIComponent(location.address);
        void Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
        );
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Drop-off Locations</Text>
                <View style={{ width: 36 }} />
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Where to send</Text>
                <Text style={styles.sectionSubtitle}>
                    {materialName
                        ? `Nearby places that can accept ${materialName.toLowerCase()}.`
                        : "Nearby places that can accept this material."}
                </Text>

                <View style={styles.statusCard}>
                    <Ionicons name="map" size={18} color="#A8D5C2" />
                    <Text style={styles.statusText}>
                        Frontend is ready for backend map coordinates and live
                        location results.
                    </Text>
                </View>

                {locationList.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Ionicons
                            name="location-outline"
                            size={30}
                            color="#A8D5C2"
                        />
                        <Text style={styles.emptyTitle}>No locations found</Text>
                        <Text style={styles.emptyText}>
                            Try scanning again or check back later.
                        </Text>
                    </View>
                ) : (
                    locationList.map((location, index) => (
                        <View
                            key={`${location.name}-${location.address}-${index}`}
                            style={styles.locationCard}
                        >
                            <View style={styles.locationHeader}>
                                <Ionicons
                                    name="business"
                                    size={20}
                                    color="#A8D5C2"
                                />
                                <Text style={styles.locationName}>
                                    {location.name}
                                </Text>
                            </View>

                            <Text style={styles.locationAddress}>
                                {location.address}
                            </Text>

                            {typeof location.distanceKm === "number" ? (
                                <View style={styles.metaRow}>
                                    <Ionicons
                                        name="navigate"
                                        size={14}
                                        color="#7AAE98"
                                    />
                                    <Text style={styles.metaText}>
                                        {location.distanceKm.toFixed(1)} km away
                                    </Text>
                                </View>
                            ) : null}

                            <TouchableOpacity
                                style={styles.mapButton}
                                onPress={() => openInMaps(location)}
                            >
                                <Ionicons name="map" size={18} color="#fff" />
                                <Text style={styles.mapButtonText}>
                                    Open in Maps
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>
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

    content: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 6,
    },

    sectionSubtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
    },

    statusCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    statusText: {
        flex: 1,
        fontSize: 13,
        color: "#666",
        fontWeight: "500",
    },

    emptyCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 24,
        alignItems: "center",
        gap: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },

    emptyText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },

    locationCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    locationHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    locationName: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: "#1A1A1A",
    },

    locationAddress: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        marginBottom: 10,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 14,
    },

    metaText: {
        fontSize: 13,
        color: "#7AAE98",
        fontWeight: "600",
    },

    mapButton: {
        backgroundColor: "#A8D5C2",
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    mapButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
});
