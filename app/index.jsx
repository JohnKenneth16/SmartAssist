import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  

} from "react-native";
import { useState } from "react";
import { getAuth } from "firebase/auth";


const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Left Panel with Background Image */}
      <View style={styles.leftPanel}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/500/800" }} // replace with your desert image
          style={styles.image}
        >
          <Text style={styles.caption}>Capturing Moments,{"\n"}Creating Memories</Text>
        </ImageBackground>
      </View>

      {/* Right Panel with Form */}
      <ScrollView contentContainerStyle={styles.rightPanel}>
        <Text style={styles.title}>Create an account</Text>

        <Text style={styles.subtitle}>
          Already have an account? <Link href="/login">Log in</Link>
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.checkboxRow}>
          <Text style={styles.terms}>
            ✅ I agree to the <Text style={{ color: "#7f5af0" }}>Terms & Conditions</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createText}>Create account</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or register with</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text>🌐 Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text>🍏 Apple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#1a1a2e" },

  // Left Panel
  leftPanel: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, justifyContent: "flex-end", padding: 20 },
  caption: { color: "#fff", fontSize: 18, fontWeight: "600" },

  // Right Panel
  rightPanel: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "#2d2d44",
    padding: 30,
    justifyContent: "center",
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { color: "#bbb", marginBottom: 20 },

  input: {
    backgroundColor: "#3b3b5c",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  inputRow: { flexDirection: "row", marginBottom: 15 },

  checkboxRow: { marginBottom: 20 },
  terms: { color: "#ccc" },

  createBtn: {
    backgroundColor: "#7f5af0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  createText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  orText: { color: "#aaa", textAlign: "center", marginBottom: 10 },

  socialRow: { flexDirection: "row", justifyContent: "center", gap: 10 },
  socialBtn: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default Home;