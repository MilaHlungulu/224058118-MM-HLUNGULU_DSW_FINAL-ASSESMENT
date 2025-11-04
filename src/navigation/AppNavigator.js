import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

// (We’ll create these screens later)
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import Explore from "../screens/Explore";
import HotelDetails from "../screens/HotelDetails";
import Booking from "../screens/Booking";
import Reviews from "../screens/Reviews";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { mhUser, mhLoading } = useContext(AuthContext);
  const [mhShowOnboarding, setMhShowOnboarding] = useState(null);

  useEffect(() => {
    (async () => {
      const flag = await AsyncStorage.getItem("mh_onboarded");
      setMhShowOnboarding(flag !== "true");
    })();
  }, []);

  if (mhShowOnboarding === null || mhLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {mhShowOnboarding && (
          <>
            <Stack.Screen name="Onboarding1" component={Onboarding1} />
            <Stack.Screen name="Onboarding2" component={Onboarding2} />
            <Stack.Screen name="Onboarding3" component={Onboarding3} />
          </>
        )}
        {!mhUser ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="HotelDetails" component={HotelDetails} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="Reviews" component={Reviews} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
