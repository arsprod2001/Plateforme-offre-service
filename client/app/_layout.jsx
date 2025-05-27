import { Text, View } from 'react-native'
import { Stack } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import "../global.css";
import { AuthProvider } from './AuthContext'; 
const RootLayout = () => {

    const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    checkUser();
  }, []);

  return (
    <AuthProvider value={{ user, setUser }}>
    <Stack>
        <Stack.Screen 
            name='index'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen 
            name='(tabs)'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen 
            name='(tabs2)'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen 
            name='(auth)'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
        <Stack.Screen name="Categorie" options={{ headerShown: false }} />
        <Stack.Screen name="promotion/promo" options={{ headerShown: false }} />
        <Stack.Screen name="serviceDesc/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="profileDesc/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="message/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="ProfileEdit/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="serviceEdit/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="AllServiceUser/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="promotionEdit/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="PublicationService/publisher" options={{ headerShown: false }} />

    </Stack>
    </AuthProvider>
  )
}

export default RootLayout
