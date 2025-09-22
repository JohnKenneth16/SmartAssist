import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function History() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  const loadHistory = async () => {
    try {
      const q = query(
        collection(db, "searchHistory"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setHistory(data);
    } catch (err) {
      console.log("❌ Firestore error:", err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // 🔹 Delete from Firestore
  const deleteHistory = async (id) => {
    try {
      await deleteDoc(doc(db, "searchHistory", id));
      setHistory(history.filter((item) => item.id !== id)); // update UI instantly
      console.log("🗑️ History deleted:", id);
    } catch (err) {
      console.log("❌ Delete error:", err);
    }
  };

  return (
    <View style={styles.container}>
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
              <View style={{ flex: 1 }}>
                <Text style={styles.question}>❓ {item.question}</Text>
                <Text style={styles.answer}>💡 {item.answer}</Text>
              </View>

              {/* 🗑️ Delete button */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteHistory(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
              </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
  },
  question: { color: "#00eaff", fontSize: 16, fontWeight: "600" },
  answer: { color: "#e5e7eb", fontSize: 14, marginTop: 4 },
  deleteBtn: {
    marginLeft: 10,
    padding: 5,
  },
});
