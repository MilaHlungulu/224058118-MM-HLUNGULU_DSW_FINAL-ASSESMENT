import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imgPlaceholder}>
        <Text style={styles.placeholderText}>📅 Booking Image</Text>
      </View>
      <Text style={styles.title}>Book Easily & Securely</Text>
      <Text style={styles.text}>
        Confirm your stay with just a few taps and instant confirmation.
      </Text>
      <Button title="Next" onPress={() => navigation.replace("Onboarding3")} />
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