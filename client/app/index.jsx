import { View, Text } from 'react-native'
import { Link } from "expo-router";
import "../global.css";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className = "text-2xl text-center pl-2 pr-2">Bienvenue sur l'application d'offre de service en ligne</Text>
      <Link href={"/(auth)/sign-in"} 
        className=' text-blue-500 font-bold text-xl'> 
      Se connecter
      </Link>
    </View>
  )
}

export default App