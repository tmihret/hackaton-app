import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { expoPushToken, notification } = usePushNotifications();

  // Log the token in the console
  console.log("Expo Push Token:", expoPushToken);

  return (
    <>
      {/* Optional UI to display token on screen */}
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenText}>
          Expo Push Token:
        </Text>
        <Text selectable style={styles.tokenValue}>
          {expoPushToken?.toString() ?? 'Fetching...'}
        </Text>
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Map',
            tabBarIcon: ({ color }) => <AntDesign name="enviroment" size={24} color="white" />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color="white" />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tokenContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 999,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tokenText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tokenValue: {
    fontSize: 12,
    color: '#333',
  },
});