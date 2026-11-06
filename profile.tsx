import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Card */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/(tabs)")}
                >
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                <Image
                    source={require("../assets/images/robot.png")}
                    style={styles.avatar}
                />

                <View style={styles.info}>
                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#999"
                        value={city}
                        onChangeText={setCity}
                        style={styles.input}
                    />
                </View>
            </View>

            {/* Stats Card */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Ionicons name="flame" size={24} color="#A8D5C2" />
                    <View>
                        <Text style={styles.statLabel}>Points</Text>
                        <Text style={styles.statValue}>1544</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                    <Ionicons name="trash" size={24} color="#A8D5C2" />
                    <View>
                        <Text style={styles.statLabel}>Items Scanned</Text>
                        <Text style={styles.statValue}>53</Text>
                    </View>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                <Text style={styles.sectionTitle}>Actions</Text>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/modal")}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={styles.menuIconBg}>
                            <Ionicons name="trophy" size={20} color="#A8D5C2" />
                        </View>
                        <Text style={styles.menuItemText}>Achievements</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/history")}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={styles.menuIconBg}>
                            <Ionicons
                                name="stats-chart"
                                size={20}
                                color="#A8D5C2"
                            />
                        </View>
                        <Text style={styles.menuItemText}>Scan History</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/modal")}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={styles.menuIconBg}>
                            <Ionicons
                                name="settings"
                                size={20}
                                color="#A8D5C2"
                            />
                        </View>
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/modal")}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={styles.menuIconBg}>
                            <Ionicons
                                name="help-circle"
                                size={20}
                                color="#A8D5C2"
                            />
                        </View>
                        <Text style={styles.menuItemText}>Help & Support</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
            </View>

            {/* Spacer */}
            <View style={{ height: 80 }} />
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
        paddingTop: 20,
    },

    backButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },

    profileCard: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },

    info: {
        gap: 10,
    },

    input: {
        backgroundColor: "#F5FFFE",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 12,
        borderRadius: 10,
        color: "#1A1A1A",
        fontSize: 14,
    },

    statsCard: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: "#A8D5C2",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        elevation: 2,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    statItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    statLabel: {
        fontSize: 12,
        color: "#fff",
        opacity: 0.8,
    },

    statValue: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },

    divider: {
        width: 1,
        height: 40,
        backgroundColor: "rgba(255,255,255,0.3)",
    },

    menuContainer: {
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 12,
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 8,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    menuIconBg: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
    },

    menuItemText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1A1A1A",
    },
});
