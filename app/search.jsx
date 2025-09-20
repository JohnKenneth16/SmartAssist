import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function Search() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSearch = async (text) => {
    setQuery(text);

    if (!text.trim()) return;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`, // 🔑 Replace with your real key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      setAnswer(data.choices[0].message.content.trim());
    } catch (error) {
      console.error(error);
      setAnswer("⚠️ Error connecting to AI service.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        value={query}
        onChangeText={handleSearch}
      />
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10 },
  answer: { marginTop: 20, fontSize: 16, fontWeight: "500" },
});
