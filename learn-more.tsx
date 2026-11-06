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

export default function LearnMoreScreen() {
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
                <Text style={styles.headerTitle}>What You Can Scan</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Image
                    source={require("../assets/images/robot.png")}
                    style={styles.image}
                />

                <Text style={styles.title}>Scan & Recycle Smart</Text>

                <Text style={styles.subtitle}>
                    Eco AI helps you identify waste materials and find the best
                    way to recycle them in your area.
                </Text>
            </View>

            {/* Material Types */}
            <View style={styles.materialsSection}>
                <Text style={styles.sectionTitle}>Scannable Materials</Text>

                <View style={styles.materialCard}>
                    <View
                        style={[
                            styles.materialIcon,
                            { backgroundColor: "#FFE4D6" },
                        ]}
                    >
                        <Ionicons name="bag" size={24} color="#FF8A50" />
                    </View>
                    <View style={styles.materialInfo}>
                        <Text style={styles.materialName}>Plastic</Text>
                        <Text style={styles.materialDesc}>
                            Bottles, containers, packaging
                        </Text>
                    </View>
                </View>

                <View style={styles.materialCard}>
                    <View
                        style={[
                            styles.materialIcon,
                            { backgroundColor: "#E0F2F1" },
                        ]}
                    >
                        <Ionicons name="water" size={24} color="#009688" />
                    </View>
                    <View style={styles.materialInfo}>
                        <Text style={styles.materialName}>Glass</Text>
                        <Text style={styles.materialDesc}>
                            Bottles, jars, containers
                        </Text>
                    </View>
                </View>

                <View style={styles.materialCard}>
                    <View
                        style={[
                            styles.materialIcon,
                            { backgroundColor: "#FFF3E0" },
                        ]}
                    >
                        <Ionicons name="cube" size={24} color="#FF9800" />
                    </View>
                    <View style={styles.materialInfo}>
                        <Text style={styles.materialName}>Metal</Text>
                        <Text style={styles.materialDesc}>
                            Aluminum, steel, cans
                        </Text>
                    </View>
                </View>

                <Text style={styles.comingSoonText}>More is coming.</Text>
            </View>

            {/* Features */}
            <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Why Use Eco AI?</Text>

                <View style={styles.featureItem}>
                    <View style={styles.featureDot}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                    <Text style={styles.featureText}>
                        Instant material identification
                    </Text>
                </View>

                <View style={styles.featureItem}>
                    <View style={styles.featureDot}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                    <Text style={styles.featureText}>
                        Find recycling locations near you
                    </Text>
                </View>

                <View style={styles.featureItem}>
                    <View style={styles.featureDot}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                    <Text style={styles.featureText}>
                        Earn points and track your impact
                    </Text>
                </View>

                <View style={styles.featureItem}>
                    <View style={styles.featureDot}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                    <Text style={styles.featureText}>
                        Get sorting and recycling tips
                    </Text>
                </View>
            </View>

            {/* Call to Action */}
            <View style={styles.ctaSection}>
                <Text style={styles.ctaTitle}>Ready to make a difference?</Text>
                <Text style={styles.ctaSubtitle}>
                    Join our community and start recycling smarter today.
                </Text>

                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={() => router.push("/signup")}
                >
                    <Text style={styles.ctaButtonText}>Get Started</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

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

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },

    content: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    image: {
        width: 200,
        height: 200,
        marginBottom: 24,
        resizeMode: "contain",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
        color: "#1A1A1A",
    },

    subtitle: {
        fontSize: 15,
        textAlign: "center",
        color: "#666",
        lineHeight: 22,
    },

    materialsSection: {
        paddingHorizontal: 16,
        marginVertical: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 16,
    },

    materialCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        alignItems: "center",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    materialIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
        flexShrink: 0,
    },

    materialInfo: {
        flex: 1,
    },

    materialName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 4,
    },

    materialDesc: {
        fontSize: 12,
        color: "#999",
    },

    comingSoonText: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginTop: 6,
    },

    featuresSection: {
        paddingHorizontal: 16,
        marginVertical: 20,
    },

    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    featureDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#A8D5C2",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        flexShrink: 0,
    },

    featureText: {
        fontSize: 14,
        color: "#333",
        flex: 1,
    },

    ctaSection: {
        paddingHorizontal: 16,
        marginVertical: 20,
    },

    ctaTitle: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        color: "#1A1A1A",
        marginBottom: 8,
    },

    ctaSubtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
        lineHeight: 20,
    },

    ctaButton: {
        backgroundColor: "#A8D5C2",
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    ctaButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },

    secondaryButton: {
        borderWidth: 2,
        borderColor: "#A8D5C2",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    secondaryButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#A8D5C2",
    },
});
