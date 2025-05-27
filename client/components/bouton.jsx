import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Bouton = ({titre, onPress, couleur}) => {
  return (
    <TouchableOpacity className = 'items-center mt-4'
        onPress={onPress}
    >
        <View className = {`${couleur} rounded-xl`}>
        <Text className = 'pl-[100px] pr-[100px] pt-3 pb-3 text-white text-[20px] font-bold'>{titre}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Bouton