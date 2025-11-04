import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, Modal, StyleSheet } from "react-native";
import { addDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { mhFirestore, mhAuth } from "../firebase/firebase";

export default function Reviews({ hotelId }) {
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const fetchReviews = async () => {
    const q = query(
      collection(mhFirestore, "mh_reviews"),
      where("hotelId", "==", hotelId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async () => {
    if (!mhAuth.currentUser) {
      Alert.alert("Please sign in to leave a review");
      return;
    }
    if (!newReview.trim()) {
      Alert.alert("Enter review text");
      return;
    }

    await addDoc(collection(mhFirestore, "mh_reviews"), {
      hotelId,
      userId: mhAuth.currentUser.uid,
      text: newReview,
      rating,
      createdAt: new Date().toISOString(),
    });
    setNewReview("");
    setModalVisible(false);
    fetchReviews();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      {reviews.length === 0 ? (
        <Text>No reviews yet.</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewBox}>
              <Text>⭐ {item.rating}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
      )}

      <Button title="Add Review" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Add Review</Text>
          <TextInput
            placeholder="Write your review..."
            style={styles.input}
            value={newReview}
            onChangeText={setNewReview}
          />
          <Button title="Submit" onPress={submitReview} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  reviewBox: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
  },
});
