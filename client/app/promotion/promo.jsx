import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import React, { useEffect, useState } from "react";
import Service from "../../components/service";
import axios from "axios";

const PromotionService = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.URL}/api/promotion`
        );
        setService(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des service en promo", error);
      }
    };

    fetchService();
  }, []);

  const today = new Date();

  // Filtrage et tri des promotions
  const filteredPromos = service
    .filter(item => {
      const dateFin = item.DateFin ? new Date(item.DateFin) : null;
      return dateFin && dateFin > today; // Exclure les promotions expirées
    })
    .sort((a, b) => {
      const dateDebutA = a.DateDebut ? new Date(a.DateDebut) : 0;
      const dateDebutB = b.DateDebut ? new Date(b.DateDebut) : 0;
      return dateDebutB - dateDebutA; 
    });

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
              Promotion
            </Text>
          </View>
        }
        ListFooterComponent={
          <View className=" mt-5 ml-3 mr-3">
            <FlatList
              data={filteredPromos}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/serviceDesc/[id]",
                      params: {id: item.ServiceId},
                    });
                  }}
                >
                  <Service
                    image={item.thumbnail}
                    profile={item.ImageProfileUrl}
                    nom={item.Prenom}
                    servie={item.Nom}
                    prix={item.Prix}
                    localisation={item.Adresse}
                    pourcentage={item.Pourcentage}
                    couleur={"bg-red-600"}
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

export default PromotionService;
