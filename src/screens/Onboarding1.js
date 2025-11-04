import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>
      {/* TEMPORARY FIX - Replace image with colored view */}
      <View style={styles.imgPlaceholder}>
        <Text style={styles.placeholderText}>🏨 Hotel Image</Text>
      </View>
      <Text style={styles.title}>Discover Hotels Near You</Text>
      <Text style={styles.text}>
        Explore top-rated hotels, guesthouses, and lodges easily from your phone.
      </Text>
      <Button title="Next" onPress={() => navigation.replace("Onboarding2")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  imgPlaceholder: {
    width: 250,
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
});