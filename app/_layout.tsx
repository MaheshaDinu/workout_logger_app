import { Stack } from 'expo-router';
import React from 'react';
import '../global.css'; 

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="addWorkout" options={{ title: 'Add New Workout', presentation: 'modal' }} />
      <Stack.Screen name="workout/[id]" options={{ title: 'Workout Details' }} />
    </Stack>
  );
}