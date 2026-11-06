import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignUpScreen() {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                        <Ionicons
                            name="chevron-back"
                            size={28}
                            color="#1A1A1A"
                        />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    Your eco journey{"\n"}starts here
                </Text>

                <Text style={styles.subtitle}>
                    Join thousands making a difference
                </Text>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Ionicons
                            name="mail"
                            size={20}
                            color="#A8D5C2"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="E-mail address"
                            placeholderTextColor="#999"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons
                            name="person"
                            size={20}
                            color="#A8D5C2"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#999"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons
                            name="lock-closed"
                            size={20}
                            color="#A8D5C2"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons
                            name="lock-closed"
                            size={20}
                            color="#A8D5C2"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Confirm password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => router.push("/home")}
                >
                    <Text style={styles.signUpButtonText}>Create Account</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.or}>or continue with</Text>
                    <View style={styles.line} />
                </View>

                {/* Socials */}
                <View style={styles.socials}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons
                            name="logo-facebook"
                            size={24}
                            color="#1877F2"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons
                            name="logo-google"
                            size={24}
                            color="#DB4437"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Sign in */}
                <Text style={styles.signin}>
                    Already have an account?{" "}
                    <Text style={styles.link}>Sign in</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F5FFFE",
        padding: 20,
        paddingVertical: 30,
    },

    header: {
        marginBottom: 30,
    },

    title: {
        fontSize: 32,
        textAlign: "left",
        fontWeight: "700",
        marginBottom: 12,
        color: "#1A1A1A",
        lineHeight: 40,
    },

    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 32,
    },

    form: {
        gap: 12,
        marginBottom: 24,
    },

    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },

    inputIcon: {
        marginRight: 12,
    },

    input: {
        flex: 1,
        paddingVertical: 14,
        color: "#1A1A1A",
        fontSize: 16,
    },

    signUpButton: {
        backgroundColor: "#A8D5C2",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 24,
        elevation: 3,
        shadowColor: "#A8D5C2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    signUpButtonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },

    line: {
        height: 1,
        backgroundColor: "#E0E0E0",
        flex: 1,
    },

    or: {
        marginHorizontal: 12,
        color: "#999",
        fontSize: 12,
    },

    socials: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        marginBottom: 24,
    },

    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },

    signin: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },

    link: {
        color: "#A8D5C2",
        fontWeight: "700",
    },
});
