import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  const askAI = async () => {
    if (!question.trim()) {
      setAnswer("⚠️ Please type a question first.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "⚠️ No response from AI");
    } catch (err) {
      setAnswer("❌ Error: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>🤖 SmartAssist</Text>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        placeholderTextColor="#aaa"
        value={question}
        onChangeText={setQuestion}
      />

      {/* Ask AI Button */}
      <TouchableOpacity style={styles.button} onPress={askAI}>
        <Text style={styles.buttonText}>🔍 AI Search</Text>
      </TouchableOpacity>

      {/* AI Answer */}
      <ScrollView style={styles.answerBox}>
        <Text style={styles.answer}>{answer}</Text>
      </ScrollView>

      {/* Dashboard Button */}
      <TouchableOpacity
        style={styles.dashboardBtn}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.dashboardBtnText}>📊 Open Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0f1f", // Dark futuristic background
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#00eaff", // Neon blue
    letterSpacing: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: "#00eaff",
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: "#111827",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    shadowColor: "#00eaff",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  button: {
    backgroundColor: "#00eaff",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#00eaff",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },
  buttonText: {
    color: "#0a0f1f",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  answerBox: {
    flex: 1,
    backgroundColor: "#1f2937",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  answer: {
    fontSize: 16,
    color: "#e5e7eb",
    lineHeight: 22,
  },
  dashboardBtn: {
    backgroundColor: "#9333ea",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  dashboardBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
