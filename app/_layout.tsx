import { Slot, Stack } from 'expo-router';
import React from 'react';
import '../global.css'; 
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
        <Slot/>
    </AuthProvider>
    
  );
}