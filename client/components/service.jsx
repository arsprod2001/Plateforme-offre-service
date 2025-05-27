import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Service = ({image, profile, nom, icon, servie, prix, localisation, pourcentage, couleur}) => {
  return (
    <View>
      <Text className={`${couleur} text-white rounded-xl absolute pr-2 pl-2 ml-3 mt-7 z-20`}>
          {pourcentage}
        </Text>
      <View className = 'bg-primary w-44 rounded-xl h-[186px] mr-4 mt-5'>
        <Text className="bg-primary text-white rounded-xl absolute z-10 pr-3 pl-3 m-2 font-bold left-[75]">
          {prix}
        </Text>
        <Image source={{uri : image}} className="w-44 h-32 rounded-t-xl" />
        <Text className = 'font-bold text-white text-[24px] ml-[5px]'>{servie}</Text>
        <View className = "flex-row items-center gap-3">
            <View className="flex-row items-center ">
                <Image source={{uri : profile}} className="w-6 h-6 rounded-full" />
                <View className="flex-row items-center">
                    <Text className="font-bold text-white text-[14px]">
                   {nom}
                    </Text>
                    <Image source={{uri : icon}} className="w-5 h-5 border-white" />
                </View>
            </View>
            <View className = 'flex-row items-center'>
                <Image source={require("../assets/Localisation.png")} className="w-5 h-5 rounded-full" />
                <Text className = 'text-white text-[12px]'>{localisation}</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default Service