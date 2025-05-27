import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import axios from "axios";

/*Composant Catgorie Icon*/
const Categories = ({ IconCategorie, NomCatgorie }) => (
  <View>
    <View className="mt-8 h-20 w-20 justify-center items-center ml-3">
      <View className="bg-Ccolor mt-2 h-20 w-20 justify-center items-center rounded-xl">
        <Image source={{ uri: IconCategorie }} className="w-14 h-14" />
      </View>
      <Text className="mb-6">{NomCatgorie}</Text>
    </View>
  </View>
);

const Categorie = () => {
  const [categorie, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.URL}/api/Categorie`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <SafeAreaView>
      <View className="ml-3 mr-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../../assets/arrow.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <Text className="text-2xl ml-3 font-bold text-primary">
          Tous les Categorie
        </Text>
      </View>

      <FlatList
        data={categorie}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => router.push({
              pathname : "/Categorie/[id]",
              params: {id: item.CategorieId, NomCategorie: item.Nom},
            })}>
              <Categories
                IconCategorie={item.IconCategorie}
                NomCatgorie={item.Nom}
              />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="w-3" />}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
      />
    </SafeAreaView>
  );
};

export default Categorie;
