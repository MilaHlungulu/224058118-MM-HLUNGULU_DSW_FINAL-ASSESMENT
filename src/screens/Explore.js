import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import HotelCard from "../components/HotelCard";

const mhHotels = [
  {
    id: "1",
    name: "Sunrise Hotel",
    location: "Cape Town",
    rating: 4.5,
    price: 120,
  },
  {
    id: "2",
    name: "Oceanview Lodge",
    location: "Durban",
    rating: 4.2,
    price: 95,
  },
  {
    id: "3",
    name: "City Center Inn",
    location: "Johannesburg",
    rating: 4.0,
    price: 80,
  },
];

export default function Explore({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mhHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onPress={() => navigation.navigate("HotelDetails", { hotel: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});