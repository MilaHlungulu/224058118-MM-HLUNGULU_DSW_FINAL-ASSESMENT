import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { mhAuth, mhFirestore } from "../firebase/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function Profile() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const q = query(collection(mhFirestore, "mh_bookings"), where("userId", "==", mhAuth.currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {mhAuth.currentUser?.displayName || "Guest"}</Text>
      <Text>Email: {mhAuth.currentUser?.email}</Text>

      <Button title="Log Out" onPress={() => signOut(mhAuth)} />

      <Text style={styles.subtitle}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingBox}>
            <Text>{item.hotelName}</Text>
            <Text>
              {new Date(item.checkIn).toLocaleDateString()} - {new Date(item.checkOut).toLocaleDateString()}
            </Text>
            <Text>Total: R{item.total}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  subtitle: { marginTop: 20, fontWeight: "bold" },
  bookingBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
});

