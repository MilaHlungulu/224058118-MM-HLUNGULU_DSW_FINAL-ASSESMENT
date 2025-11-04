import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import Reviews from "./Reviews";

export default function HotelDetails({ route, navigation }) {
  const { hotel } = route.params;
  const [mhWeather, setMhWeather] = useState(null);
  const [mhLoadingWeather, setMhLoadingWeather] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setMhLoadingWeather(true);
        const key = "YOUR_OPENWEATHER_API_KEY";
        const city = encodeURIComponent(hotel.location);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
        );
        const data = await res.json();
        if (data?.main) setMhWeather(data);
      } catch (err) {
        console.log(err);
      } finally {
        setMhLoadingWeather(false);
      }
    })();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.imgPlaceholder}>
        <Text style={styles.placeholderText}>🏨 Hotel Image</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text>
          {hotel.location} • ⭐ {hotel.rating}
        </Text>
        <Text style={styles.price}>R{hotel.price} / night</Text>

        <Text style={styles.weatherTitle}>Current Weather</Text>
        {mhLoadingWeather ? (
          <Text>Loading...</Text>
        ) : mhWeather ? (
          <Text>
            {mhWeather.weather[0].description} • {mhWeather.main.temp}°C
          </Text>
        ) : (
          <Text>No weather data available</Text>
        )}

        <Button
          title="Book Now"
          onPress={() => navigation.navigate("Booking", { hotel })}
        />
      </View>

      <Reviews hotelId={hotel.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
  },
  content: { padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  price: { fontWeight: "bold", marginVertical: 10 },
  weatherTitle: { marginTop: 10, fontWeight: "bold" },
});