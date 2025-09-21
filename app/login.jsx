// app/login.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter, Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular background frame */}
      <View style={styles.circle}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.forgot}>Forgot your password?</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Link href="/signup" style={styles.link}>
          Signup
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0f1f",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 8,
    borderColor: "#00eaff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1f2937",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00eaff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#0a0f1f",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#00eaff",
  },
  forgot: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#00eaff",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#0a0f1f",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 5,
    color: "#00eaff",
    fontWeight: "600",
  },
});
