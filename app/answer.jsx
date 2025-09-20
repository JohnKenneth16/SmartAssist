import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function AnswerScreen() {
  // ✅ Get the params safely
  const { question, answer } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TutorBot’s Answer</Text>

      {/* Show the question if available */}
      {question ? <Text style={styles.question}>❓ {question}</Text> : null}

      {/* Show AI Answer */}
      <ScrollView style={styles.answerBox}>
        <Text style={styles.answer}>{answer || "⚠️ No answer received."}</Text>
      </ScrollView>

      {/* Back button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/ask")}>
        <Text style={styles.buttonText}>🔙 Ask Another Question</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  question: { fontSize: 18, marginBottom: 15, fontStyle: "italic" },
  answerBox: { flex: 1, backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8 },
  answer: { fontSize: 16, color: "#333" },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
