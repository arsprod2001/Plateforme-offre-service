import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Input = ({Titre, placeholder, valeur, onChange, motDepasse, edition, }) => {
  return (
    <View className="ml-6 mr-3 mt-4">
      <Text className = "text-primary text-[20px]">{Titre}</Text>  
      <View className = 'bg-slate-200 w-[340px] h-[50px] rounded-[10px]'>
        <TextInput className = "w-[340px] h-[50px] text-[20px] pl-3"
            placeholder={placeholder}
            value={valeur}
            onChangeText={onChange}
            secureTextEntry={motDepasse}
            editable={edition}
        />
      </View>
    </View>
  )
}

export default Input