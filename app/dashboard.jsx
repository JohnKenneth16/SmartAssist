// app/dashboard.jsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 SmartAssist Dashboard</Text>
      <Text style={styles.subtitle}>Here you can see your stats and progress.</Text>

      {/* Example cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Questions Asked</Text>
        <Text style={styles.cardValue}>128</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Correct Answers</Text>
        <Text style={styles.cardValue}>94%</Text>
      </View>

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/home")}>
        <Text style={styles.backBtnText}>⬅ Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#9fe7d6", marginBottom: 20 },
  card: {
    backgroundColor: "#2b2b2b",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 16, color: "#ccc" },
  cardValue: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  backBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backBtnText: { color: "#fff", fontWeight: "bold" },
});
