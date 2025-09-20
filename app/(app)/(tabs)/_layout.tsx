
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';



export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000', // You can change colors later
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="list" color={color} />,
        }}
      />
       <Tabs.Screen
        name="workout"
        options={{
          title: 'New Workout',
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="user" color={color} />,
        }}
      />  
    </Tabs>
  );
}