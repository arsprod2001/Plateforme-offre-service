import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
  } from "react-native";
  import { router, useLocalSearchParams } from "expo-router";
  import React, { useEffect, useState } from "react";
import axios from "axios";
  
  const Categorie = ({ IconCategorie, NomCatgorie }) => (
    <View>
      <TouchableOpacity className="mr-4">
        <View className="mt-3 h-20 w-20 justify-center items-center">
          <View className="bg-Ccolor mt-2 h-20 w-20 justify-center items-center rounded-xl">
            <Image source={{uri: IconCategorie}} className="w-14 h-14" />
          </View>
          <Text className="mb-6">{NomCatgorie}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  
  /*------------------TabCategorie----------------------*/
  const TabCategorie = [
    {
      iconCategorie: require("../../assets/repairing.png"),
      nomCategorie: "Plombier",
    },
    {
      iconCategorie: require("../../assets/reparation.png"),
      nomCategorie: "Réparation",
    },
    {
      iconCategorie: require("../../assets/mop.png"),
      nomCategorie: "Nettoyage",
    },
    {
      iconCategorie: require("../../assets/flash.png"),
      nomCategorie: "Electricité",
    },
  ];
  
  const ProfileDescription = () => {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState([]);
    const [service, setService] = useState([]);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.URL}/api/profileDesc/${id}`
          );
          setUser(response.data[0]);
        } catch (error) {
          console.log("Erreur lors du chargement du service");
        }
      };
  
      const fetchService = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.URL}/api/ServiceUser/${id}`
          );
          setService(response.data);
        } catch (error) {
          console.log("Erreur lors du chargement des media");
        }
      };
  
      fetchUser();
      fetchService();
    }, [id]);


    return (
      <SafeAreaView>
        <ScrollView>
          <View className="bg-primary h-[140] rounded-b-[60]">
            <View className="ml-3 mr-3 flex-row items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../assets/arrow1.png")}
                  className="w-6 h-6 mt-1"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1 items-center mt-5">
              <Image
                source={{uri: user.ImageProfileUrl}}
                className="w-[160] h-[160] rounded-full"
              />
              <View className="flex-row items-center">
                <Text className="text-2xl text-primary font-bold mr-2">
                  {user.Prenom} {user.Nom}
                </Text>
                <Image
                  source={require("../../assets/verified1.png")}
                  className="w-5 h-5 border-white"
                />
              </View>
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/Localisation.png")}
                  className="w-6 h-6"
                />
                <Text className="text-xl">{user.Adresse}</Text>
              </View>
            </View>
          </View>
  
          <View className="ml-3 mr-3 mt-[140]">
            <Text className="text-2xl font-bold text-primary"> A Propos</Text>
            <Text className="text-xl">
              {user.DescriptionProfile}
            </Text>
            <Text className="text-2xl font-bold text-primary">
              Service Offert
            </Text>
            <FlatList
              data={service}
              renderItem={({ item }) => (
                <Categorie
                  IconCategorie={item.IconCategorie}
                  NomCatgorie={item.Nom}
                />
              )}
              horizontal={false}
              ItemSeparatorComponent={() => <View className="w-3" />}
              showsHorizontalScrollIndicator={false}
              numColumns={4}
              scrollEnabled={false}  
            />
            <Text className="text-2xl font-bold text-primary">
              Notation
            </Text>
          </View>
          <View className="flex-row items-center justify-center gap-6 mt-4 mb-8">
          <TouchableOpacity className="items-center mt-4" onPress={()=>router.push("/message/[id]")}>
            <View className=" bg-black rounded-xl">
              <Text className="pl-[30px] pr-[30px] pt-3 pb-3 text-white text-[20px] font-bold">
                Message
              </Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity className="items-center mt-4">
            <View className=" bg-primary rounded-xl">
              <Text className="pl-[30px] pr-[30px] pt-3 pb-3 text-white text-[20px] font-bold">
                Appeler
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ProfileDescription;
  