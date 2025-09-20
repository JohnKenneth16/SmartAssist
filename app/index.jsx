import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("⚠️ Missing fields", "Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      Alert.alert("✅ Success", "Account created successfully!");
      router.replace("/home");
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Sign Up Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Image Panel */}
      <View style={styles.leftPanel}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/800/1200" }} // Replace with your real image
          style={styles.image}
        >
          <Text style={styles.caption}>
            Capturing Moments,{"\n"}Creating Memories
          </Text>
        </ImageBackground>
      </View>

      {/* Right Form Panel */}
      <ScrollView contentContainerStyle={styles.rightPanel}>
        <Text style={styles.title}>Create an account</Text>

        <Text style={styles.subtitle}>
          Already have an account? <Link href="/login">Log in</Link>
        </Text>

        {/* Name Fields */}
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="First name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Email & Password */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Terms */}
        <View style={styles.checkboxRow}>
          <Text style={styles.terms}>
            ✅ I agree to the <Text style={{ color: "#7f5af0" }}>Terms & Conditions</Text>
          </Text>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createBtn} onPress={handleSignUp}>
          <Text style={styles.createText}>Create account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#1a1a2e" },

  // Left panel
  leftPanel: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, justifyContent: "flex-end", padding: 20 },
  caption: { color: "#fff", fontSize: 18, fontWeight: "600" },

  // Right panel
  rightPanel: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "#2d2d44",
    padding: 40,
    justifyContent: "center",
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { color: "#bbb", marginBottom: 20 },

  input: {
    backgroundColor: "#3b3b5c",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputRow: { flexDirection: "row", marginBottom: 15 },

  checkboxRow: { marginBottom: 20 },
  terms: { color: "#ccc" },

  createBtn: {
    backgroundColor: "#7f5af0",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  createText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  orText: { color: "#aaa", textAlign: "center", marginBottom: 15 },

  socialRow: { flexDirection: "row", justifyContent: "center" },
  socialBtn: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: "center",
  },
});

export default SignUp;
