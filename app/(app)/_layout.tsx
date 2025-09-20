import { auth} from  '../../services/firebase'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
    const {  } = auth;
  return (
    <Stack>
        <Stack.Protected guard={}>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack.Protected>
        
    </Stack>
  )
}