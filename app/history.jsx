import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function History() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  // Load history when this screen opens
  useEffect(() => {
    const loadHistory = async () => {
      try {
        // Show saved data instantly if available
        const saved = await AsyncStorage.getItem("searchHistory");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (err) {
        console.log("Error loading history:", err);
      }
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push("/home")}
      >
        <Ionicons name="arrow-back-outline" size={22} color="#00eaff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🕒 Search History</Text>

      <ScrollView style={styles.historyBox}>
        {history.length === 0 ? (
          <Text style={styles.noHistory}>No history yet.</Text>
        ) : (
          history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <Text style={styles.question}>❓ {item.question}</Text>
              <Text style={styles.answer}>💡 {item.answer}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0f1f", padding: 20 },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  backText: { color: "#00eaff", marginLeft: 6, fontWeight: "600" },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00eaff",
    textAlign: "center",
    marginVertical: 20,
  },

  historyBox: { flex: 1 },
  noHistory: { color: "#aaa", textAlign: "center", marginTop: 20 },

  historyItem: {
    backgroundColor: "#1f2937",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  question: { color: "#00eaff", fontSize: 16, fontWeight: "600" },
  answer: { color: "#e5e7eb", fontSize: 14, marginTop: 4 },
});
