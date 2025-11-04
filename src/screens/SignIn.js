import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { mhAuth } from "../firebase/firebase";

export default function SignIn({ navigation }) {
  const [mhEmail, setMhEmail] = useState("");
  const [mhPassword, setMhPassword] = useState("");

  const mhHandleSignIn = async () => {
    if (!mhEmail || !mhPassword) {
      Alert.alert("Please fill in both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(mhAuth, mhEmail.trim(), mhPassword);
      // onAuthStateChanged in AuthContext will handle navigation automatically
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={mhEmail}
        onChangeText={setMhEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={mhPassword}
        onChangeText={setMhPassword}
      />
      <Button title="Login" onPress={mhHandleSignIn} />
      <Text style={styles.link} onPress={() => navigation.navigate("ForgotPassword")}>
        Forgot password?
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
        Don’t have an account? Sign Up
      </Text>
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
  link: { color: "#007bff", textAlign: "center", marginTop: 10 },
});
