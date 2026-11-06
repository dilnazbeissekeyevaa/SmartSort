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

const mockScanHistory = [
    {
        id: 1,
        date: "Today",
        items: [
            {
                id: "1",
                name: "Yogurt bottle",
                material: "Plastic",
                image: require("../assets/images/robot.png"),
            },
            {
                id: "2",
                name: "Coffee Cup",
                material: "Paper + plastic",
                image: require("../assets/images/robot.png"),
            },
        ],
    },
    {
        id: 2,
        date: "Feb 15, 2026",
        items: [
            {
                id: "3",
                name: "Cardboard",
                material: "Paper envelope",
                image: require("../assets/images/robot.png"),
            },
            {
                id: "4",
                name: "Chips bag",
                material: "Plastic + aluminum",
                image: require("../assets/images/robot.png"),
            },
            {
                id: "5",
                name: "Worn-out shoes",
                material: "Polyester + PU leather + foam",
                image: require("../assets/images/robot.png"),
            },
            {
                id: "6",
                name: "Baby bottle",
                material: "Glass + silicone + plastic",
                image: require("../assets/images/robot.png"),
            },
        ],
    },
];

export default function ScanHistoryScreen() {
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/profile")}
                >
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan History</Text>
                <View style={{ width: 36 }} />
            </View>

            {/* History Sections */}
            {mockScanHistory.map((section) => (
                <View key={section.id} style={styles.section}>
                    <Text style={styles.dateHeader}>{section.date}</Text>

                    {section.items.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.scanItem}>
                            <Image
                                source={item.image}
                                style={styles.itemImage}
                            />
                            <View style={styles.itemContent}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemMaterial}>
                                    {item.material}
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#CCC"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            {/* Empty State Message */}
            <View style={styles.spacer} />
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
        backgroundColor: "#A8D5C2",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    backButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },

    section: {
        marginTop: 20,
        marginHorizontal: 16,
    },

    dateHeader: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 12,
        marginLeft: 4,
    },

    scanItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 12,
        backgroundColor: "#F0F0F0",
        resizeMode: "cover",
    },

    itemContent: {
        flex: 1,
    },

    itemName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 4,
    },

    itemMaterial: {
        fontSize: 12,
        color: "#999",
    },

    spacer: {
        height: 40,
    },
});
