import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { mhAuth, mhFirestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp({ navigation }) {
  const [mhName, setMhName] = useState("");
  const [mhEmail, setMhEmail] = useState("");
  const [mhPassword, setMhPassword] = useState("");

  const mhHandleSignUp = async () => {
    if (!mhName || !mhEmail || !mhPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        mhAuth,
        mhEmail.trim(),
        mhPassword
      );
      await updateProfile(userCred.user, { displayName: mhName });
      await setDoc(doc(mhFirestore, "mh_users", userCred.user.uid), {
        uid: userCred.user.uid,
        name: mhName,
        email: mhEmail,
        createdAt: new Date().toISOString(),
      });
      Alert.alert("Account created!", "You can now log in.");
      navigation.replace("SignIn");
    } catch (err) {
      Alert.alert("Sign up failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Full name"
        style={styles.input}
        value={mhName}
        onChangeText={setMhName}
      />
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
      <Button title="Sign Up" onPress={mhHandleSignUp} />
      <Text style={styles.link} onPress={() => navigation.navigate("SignIn")}>
        Already have an account? Sign In
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
