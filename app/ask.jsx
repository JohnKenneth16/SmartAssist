import React, { useState } from "react";  
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function AskScreen() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      // ✅ Push to AnswerScreen with params
      router.push({
        pathname: "/answer",
        params: { 
          question, 
          answer: data.answer || "No answer received." 
        },
      });
    } catch (err) {
      router.push({
        pathname: "/answer",
        params: { 
          question, 
          answer: "❌ Error connecting to AI server." 
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask TutorBot</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question..."
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.button} onPress={askAI} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ask</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
