import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding3({ navigation }) {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("mh_onboarded", "true");
    navigation.replace("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgPlaceholder}>
        <Text style={styles.placeholderText}>⭐ Reviews Image</Text>
      </View>
      <Text style={styles.title}>Enjoy Your Stay</Text>
      <Text style={styles.text}>
        Manage your bookings, check reviews, and travel with ease.
      </Text>
      <Button title="Get Started" onPress={finishOnboarding} />
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