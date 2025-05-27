import { View, Text } from 'react-native'
import { Stack } from "expo-router";
const ProfileLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
            name='index'
            options={{headerShown : false}}
        />
    </Stack>
  )
}

export default ProfileLayout