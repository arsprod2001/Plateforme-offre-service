 import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import Service from "../../components/service";
import axios from "axios";


const CategorieService = () => {
  const { id, NomCategorie } = useLocalSearchParams();
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchCategorieService = async () => {
      try {
        const response = await axios.get(`${import.meta.env.URL}/api/Categorie/${id}`);
        setService(response.data);
      } catch (error){
        console.log("Erreur lors du chargement du categorie du service");
      }
    }
    fetchCategorieService();
  }, [id]);

  return (
    <SafeAreaView>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View className="ml-3 mr-3 flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("../../assets/arrow.png")}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <Text className="text-2xl ml-3 font-bold text-primary">
              {NomCategorie}
            </Text>
          </View>
        }

        ListFooterComponent={
            <View className=" mt-5 ml-3 mr-3">
              <FlatList
                  data={service}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/serviceDesc/[id]",
                          params: { id: item.ServiceId },
                        });
                      }}
                    >
                    <Service
                      image={item.Thumbnail}
                      profile={item.ImageProfileUrl}
                      nom={item.Prenom}
                      servie={item.NomService}
                      prix={item.Prix}
                      localisation={item.Adresse}
                    />
                    </TouchableOpacity>
                  )}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
              
            </View>
          }
        />
    </SafeAreaView>
  );
};

export default CategorieService;
