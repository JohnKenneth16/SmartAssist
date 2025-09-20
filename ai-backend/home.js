import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
      <Text style={styles.title}>SmartAssist</Text>

      {/* Input for the user’s question */}
      <TextInput
        style={styles.input}
        placeholder="Type your question..."
        value={question}
        onChangeText={setQuestion}
      />

      {/* Button to ask AI */}
      <TouchableOpacity style={styles.button} onPress={askAI}>
        <Text style={styles.buttonText}>Ask AI</Text>
      </TouchableOpacity>

      {/* Display AI Answer */}
      <ScrollView style={styles.answerBox}>
        <Text style={styles.answer}>{answer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  answerBox: { flex: 1, backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8 },
  answer: { fontSize: 16, color: "#333" },
});
