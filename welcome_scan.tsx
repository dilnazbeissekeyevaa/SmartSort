import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function WelcomeScanScreen() {
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Image
                    source={require("../assets/images/robot.png")}
                    style={styles.image}
                />

                <Text style={styles.title}>Ready to Scan?</Text>

                <Text style={styles.subtitle}>
                    Position your item in front of the camera and we&apos;ll identify
                    the material type for you.
                </Text>

                <View style={styles.tipsContainer}>
                    <View style={styles.tipCard}>
                        <View style={styles.tipIconBg}>
                            <Ionicons name="sunny" size={24} color="#A8D5C2" />
                        </View>
                        <Text style={styles.tipText}>
                            Good lighting is important
                        </Text>
                    </View>

                    <View style={styles.tipCard}>
                        <View style={styles.tipIconBg}>
                            <Ionicons name="eye" size={24} color="#A8D5C2" />
                        </View>
                        <Text style={styles.tipText}>
                            Keep the item in focus
                        </Text>
                    </View>

                    <View style={styles.tipCard}>
                        <View style={styles.tipIconBg}>
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color="#A8D5C2"
                            />
                        </View>
                        <Text style={styles.tipText}>
                            Clear and clean surface
                        </Text>
                    </View>
                </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity
                style={styles.startButton}
                onPress={() => router.push("/scan")}
            >
                <Ionicons name="camera" size={20} color="#fff" />
                <Text style={styles.startButtonText}>Start Scanning</Text>
            </TouchableOpacity>

            <View style={{ height: 30 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FFFE",
        paddingHorizontal: 20,
    },

    header: {
        paddingVertical: 12,
        paddingTop: 12,
    },

    content: {
        alignItems: "center",
        marginVertical: 24,
    },

    image: {
        width: 220,
        height: 220,
        marginBottom: 32,
        resizeMode: "contain",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
        color: "#1A1A1A",
    },

    subtitle: {
        fontSize: 15,
        textAlign: "center",
        color: "#666",
        marginBottom: 32,
        lineHeight: 22,
    },

    tipsContainer: {
        width: "100%",
        gap: 12,
    },

    tipCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        gap: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    tipIconBg: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },

    tipText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
        flex: 1,
    },

    startButton: {
        backgroundColor: "#A8D5C2",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginVertical: 24,
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        elevation: 3,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    startButtonText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#fff",
    },
});
