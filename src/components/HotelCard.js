import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HotelCard({ hotel, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>🏨</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.details}>
          {hotel.location} • ⭐ {hotel.rating}
        </Text>
        <Text style={styles.price}>R{hotel.price} / night</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    color: "#666",
  },
  info: { padding: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { color: "#666", marginTop: 4 },
  price: { marginTop: 6, color: "#000", fontWeight: "bold" },
});
