import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { mhAuth } from "../firebase/firebase";

export default function ForgotPassword({ navigation }) {
  const [mhEmail, setMhEmail] = useState("");

  const mhHandleReset = async () => {
    if (!mhEmail) {
      Alert.alert("Enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(mhAuth, mhEmail.trim());
      Alert.alert("Email sent", "Check your inbox for reset instructions.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        keyboardType="email-address"
        value={mhEmail}
        onChangeText={setMhEmail}
      />
      <Button title="Send Reset Email" onPress={mhHandleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
