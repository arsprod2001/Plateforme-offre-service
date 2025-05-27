import { View, Text } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'

const CategorieLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />

    </Stack>
  )
}

export default CategorieLayout