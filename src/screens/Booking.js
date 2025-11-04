import React, { useState } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { mhFirestore } from "../firebase/firebase";
import { mhAuth } from "../firebase/firebase";

export default function Booking({ route, navigation }) {
  const { hotel } = route.params;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const calcDays = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return Math.max(Math.ceil(diff / (1000 * 3600 * 24)), 1);
  };

  const handleConfirm = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert("Error", "Please enter both check-in and check-out dates");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    
    if (end <= start) {
      Alert.alert("Invalid dates", "Check-out must be after check-in");
      return;
    }

    const total = calcDays() * hotel.price;

    try {
      await addDoc(collection(mhFirestore, "mh_bookings"), {
        userId: mhAuth.currentUser.uid,
        hotelId: hotel.id,
        hotelName: hotel.name,
        checkIn: start.toISOString(),
        checkOut: end.toISOString(),
        total,
        createdAt: new Date().toISOString(),
      });
      Alert.alert("Booking Confirmed", `Total: R${total}`);
      navigation.navigate("MainTabs");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hotel.name}</Text>
      <Text>R{hotel.price} per night</Text>

      <Text style={styles.label}>Check-in Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={checkIn}
        onChangeText={setCheckIn}
        placeholder="2024-01-15"
      />

      <Text style={styles.label}>Check-out Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={checkOut}
        onChangeText={setCheckOut}
        placeholder="2024-01-20"
      />

      <Text style={styles.total}>
        Total: R{calcDays() * hotel.price} for {calcDays()} nights
      </Text>

      <Button title="Confirm Booking" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  label: { marginTop: 15, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  total: { marginVertical: 15, fontSize: 16, fontWeight: "bold" },
});