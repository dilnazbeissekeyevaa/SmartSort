import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeAfterSignupScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome back! 👋</Text>
                <Text style={styles.subGreeting}>
                    Ready to make a difference today?
                </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Scans</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Points</Text>
                </View>
            </View>

            {/* Main Scan Button */}
            <View style={styles.centerContent}>
                <View style={styles.scanButtonWrapper}>
                    <View style={styles.scanButtonBg} />
                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={() => router.push("/scan")}
                    >
                        <Ionicons name="camera" size={64} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.scanText}>Tap to Scan</Text>
                <Text style={styles.scanSubText}>
                    Identify waste and learn how to recycle
                </Text>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>

                <TouchableOpacity style={styles.actionCard}>
                    <View style={styles.actionIcon}>
                        <Ionicons name="leaf" size={24} color="#4CAF50" />
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Leaderboard</Text>
                        <Text style={styles.actionDesc}>See global impact</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard}>
                    <View style={styles.actionIcon}>
                        <Ionicons name="location" size={24} color="#FF6B6B" />
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Nearby Bins</Text>
                        <Text style={styles.actionDesc}>
                            Find drop-off points
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard}>
                    <View style={styles.actionIcon}>
                        <Ionicons name="trophy" size={24} color="#FFD700" />
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Badges</Text>
                        <Text style={styles.actionDesc}>
                            Unlock achievements
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/home")}
                >
                    <Ionicons name="home" size={24} color="#A8D5C2" />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/explore")}
                >
                    <Ionicons name="compass" size={24} color="#999" />
                    <Text style={[styles.navLabel, { color: "#999" }]}>
                        Explore
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/scan")}
                >
                    <Ionicons name="scan" size={24} color="#999" />
                    <Text style={[styles.navLabel, { color: "#999" }]}>
                        Scan
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/profile")}
                >
                    <Ionicons name="person" size={24} color="#999" />
                    <Text style={[styles.navLabel, { color: "#999" }]}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FFFE",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 20,
    },

    greeting: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 8,
    },

    subGreeting: {
        fontSize: 15,
        color: "#666",
    },

    statsContainer: {
        marginHorizontal: 20,
        marginBottom: 30,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: "row",
    },

    statBox: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
    },

    statNumber: {
        fontSize: 32,
        fontWeight: "700",
        color: "#A8D5C2",
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 12,
        color: "#999",
        fontWeight: "600",
    },

    divider: {
        width: 1,
        backgroundColor: "#E0E0E0",
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },

    scanButtonWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    scanButtonBg: {
        position: "absolute",
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: "#A8D5C2",
        opacity: 0.1,
    },

    scanButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#A8D5C2",
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },

    scanText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 8,
    },

    scanSubText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 30,
    },

    quickActionsContainer: {
        paddingHorizontal: 20,
        marginBottom: 100,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 12,
    },

    actionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 10,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    actionIcon: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    actionContent: {
        flex: 1,
    },

    actionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 2,
    },

    actionDesc: {
        fontSize: 12,
        color: "#999",
    },

    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    navItem: {
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    navLabel: {
        fontSize: 11,
        color: "#A8D5C2",
        fontWeight: "600",
    },
});
