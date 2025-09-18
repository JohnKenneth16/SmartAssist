// app/home.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

const quotes = [
  "📘 Knowledge is power!",
  "🚀 Small progress each day adds up to big results.",
  "🎯 Stay focused, the future is yours!",
  "🔥 Hard work beats talent when talent doesn’t work hard.",
];

const features = [
  { id: "1", title: "Ask AI", description: "Get instant answers for homework & tasks." },
  { id: "2", title: "Task Generator", description: "Auto-create study plans & assignment outlines." },
  { id: "3", title: "Daily Motivation", description: "A new inspiring quote every day." },
  { id: "4", title: "Leaderboard", description: "Earn points and see your rank among friends." },
  { id: "5", title: "Invite Friends", description: "Share SmartAssist with classmates easily." },
];

export default function Home() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  const handleAskAI = () => {
    if (!question.trim()) {
      Alert.alert("Error", "Please enter a question first!");
      return;
    }
    // Later: connect this to AI API
    Alert.alert("AI Answer", `Here’s an answer for: "${question}"`);
    setQuestion("");
  };

  const renderFeature = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>SmartAssist</Text>
        <TouchableOpacity style={styles.sidebarBtn}>
          <Text style={styles.sidebarBtnText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarBtn}>
          <Text style={styles.sidebarBtnText}>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarBtn}>
          <Text style={styles.sidebarBtnText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarBtn} onPress={handleLogout}>
          <Text style={[styles.sidebarBtnText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <Text style={styles.heading}>Welcome, {auth.currentUser?.email}</Text>
        <Text style={styles.motivation}>{randomQuote}</Text>

        {/* Ask AI */}
        <TextInput
          style={styles.input}
          placeholder="Ask a homework question..."
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.askButton} onPress={handleAskAI}>
          <Text style={styles.askButtonText}>Ask AI</Text>
        </TouchableOpacity>

        {/* Features Grid */}
        <Text style={styles.subHeading}>Unique Features</Text>
        <FlatList
          data={features}
          renderItem={renderFeature}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#1e1e1e" },
  sidebar: { width: 120, backgroundColor: "#2b2b2b", padding: 10 },
  sidebarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sidebarBtn: { marginVertical: 8 },
  sidebarBtnText: { color: "#ccc", fontSize: 14 },
  main: { flex: 1, padding: 15 },
  heading: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  motivation: { color: "#00ffcc", fontSize: 14, marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  askButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  askButtonText: { color: "#fff", fontWeight: "bold" },
  subHeading: { color: "#fff", fontSize: 18, marginBottom: 10 },
  card: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    width: "48%",
  },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  cardDesc: { color: "#aaa", fontSize: 13 },
});
