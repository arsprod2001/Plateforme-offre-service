import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Route } from "expo-router/build/Route";
import { useRouter, router } from "expo-router";
import Bouton from "../../../components/bouton";
import { AuthContext } from "../../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/*-------------Icon de recherche---------------------*/
const IconRecherche = require("../../../assets/search.png");
/*-------------Icon de filtre---------------------*/
const IconFiltre = require("../../../assets/setting.png");

/*Composant Catgorie Icon*/
const Categorie = ({ IconCategorie, NomCatgorie }) => (
  <View>
    <View className="mt-3 h-20 w-20 justify-center items-center">
      <View className="bg-Ccolor mt-2 h-20 w-20 justify-center items-center rounded-xl">
        <Image source={{ uri: IconCategorie }} className="w-14 h-14" />
      </View>
      <Text className="mb-6">{NomCatgorie}</Text>
    </View>
  </View>
);

/*Composant Promotion*/
const Promotion = ({ ImagePromo, NomPromo, pourcentage }) => (
  <View>
    <View>
      <Text className="bg-red-600 text-white rounded-xl absolute z-10 pr-2 pl-2 m-2">
        {pourcentage}%
      </Text>
      <Image source={{ uri: ImagePromo }} className="w-48 h-32 rounded-xl" />
    </View>
    <Text className="text-lg w-48" numberOfLines={1} ellipsizeMode="tail">
      {NomPromo}
    </Text>
  </View>
);

/* Composant Recommandation*/
const Recommandation = ({
  ImageRec,
  profileRec,
  NomProfilRec,
  IconVerified,
  TitreRec,
  PrixRec,
}) => (
  <View>
    <View className="border-solid border-2 border-primary rounded-t-3xl rounded-b-xl w-40 h-60 mr-8">
      <View>
        <Image source={{ uri: ImageRec }} className="w-40 h-40 rounded-t-3xl" />
        <View className="flex-row items-center bg-primary rounded-b-3xl w-40">
          <Image
            source={{ uri: profileRec }}
            className="w-10 h-10 rounded-full"
          />
          <View className="flex-row items-center">
            <Text className="font-bold text-white text-base">
              {NomProfilRec}
            </Text>
            <Image source={IconVerified} className="w-5 h-5 border-white" />
          </View>
        </View>
      </View>
      <View className="flex-row items-center mt-1">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-bold text-primary w-24"
        >
          {TitreRec}
        </Text>
        <Text className="bg-primary text-white p-1 rounded-lg">{PrixRec}</Text>
      </View>
    </View>
  </View>
);

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [promo, setPromo] = useState([]);
  const [recom, setRecom] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/(auth)/sign-in"); 
      }
      setLoading(false);
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.URL}/api/tabs/home`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    };

    const fetchPromo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.URL}/promo`);
        setPromo(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de promo", error);
      }
    };

    const fetchRecom = async () => {
      try {
        const response = await axios.get(`${import.meta.env.URL}/recom`);
        setRecom(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de recom", error);
      }
    };

    loadUser();
    fetchCategories();
    fetchPromo();
    fetchRecom();
  }, []);

  if (loading) return null;

  const today = new Date();

  // Filtrage et tri des promotions
  const filteredPromos = promo
    .filter((item) => {
      const dateFin = item.DateFin ? new Date(item.DateFin) : null;
      return dateFin && dateFin > today; 
    })
    .sort((a, b) => {
      const dateDebutA = a.DateDebut ? new Date(a.DateDebut) : 0;
      const dateDebutB = b.DateDebut ? new Date(b.DateDebut) : 0;
      return dateDebutB - dateDebutA; 
    });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              {/* ------------------en tete------------------*/}
              <View className="bg-primary h-[250] rounded-b-3xl">
                <View className="ml-3 mr-3">
                  {/* ------------alignement Bienvenue, Nom et le profile---------- */}
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-blanc text-4xl mb-0 pb-0">
                        Bienvenue
                      </Text>
                      <Text className="font-bold text-blanc text-2xl -top-2">
                        {user.Prenom}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        className="w-14 h-14 rounded-full"
                        source={{ uri: user.ImageProfileUrl }}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* ------------Input recherche---------- */}
                  <View className="justify-center items-center">
                    <View className="flex-row bg-white rounded-md p-1 w-5/6">
                      <Image source={IconRecherche} className="w-8 h-8" />
                      <TextInput
                        placeholder="Recherche"
                        className="text-xl ml-2"
                      />
                    </View>
                  </View>

                  {/* ------------Filtrage---------- */}
                  <View className="justify-center items-center mt-4">
                    <TouchableOpacity
                      className="flex-row bg-white rounded-full p-1 w-5/6 justify-center items-center"
                      onPress={() => setOpenModal(true)}
                    >
                      <Text className="text-primary text-2xl">Filtrage</Text>
                      <Image source={IconFiltre} className="w-8 h-8" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    className="items-center mt-4 mb-3"
                    onPress={() => router.push("/search/[query]")}
                  >
                    <View className=" bg-white rounded-xl">
                      <Text className="pl-[100px] pr-[100px] pt-3 pb-3 text-primary text-[20px] font-bold">
                        Rechercher
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy-key"}
          ListFooterComponent={
            <View>
              {/* ------------------Categorie------------------*/}
              <View className="mt-2 ml-3 mr-3">
                {/*Section Categorie et voir plus*/}
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-bold">Categorie</Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/Categorie");
                    }}
                  >
                    <Text className="text-xl text-primary">Voir plus</Text>
                  </TouchableOpacity>
                </View>

                {/*Categorie icon */}
                <FlatList
                  data={categories.slice(0, 4)}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: "/Categorie/[id]",
                            params: {
                              id: item.CategorieId,
                              NomCategorie: item.Nom,
                            },
                          })
                        }
                      >
                        <Categorie
                          IconCategorie={item.IconCategorie}
                          NomCatgorie={item.Nom}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {/*--------------Promotion-----------------*/}
              <View className="mt-2 ml-3 mr-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-bold">Promotion</Text>
                  <TouchableOpacity
                    onPress={() => router.push("/promotion/promo")}
                  >
                    <Text className="text-xl text-primary">Voir plus</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={filteredPromos.slice(0, 4)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/serviceDesc/[id]",
                          params: { id: item.ServiceId },
                        });
                      }}
                    >
                      <Promotion
                        ImagePromo={item.thumbnail}
                        NomPromo={item.Nom}
                        pourcentage={item.Pourcentage}
                      />
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {/*---------------Recommandation----------------*/}
              <View className="mt-2 ml-3 mr-3">
                <Text className="text-xl font-bold">Recommandation</Text>
                <FlatList
                  data={recom.slice(0, 4)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/serviceDesc/[id]",
                          params: { id: item.ServiceId },
                        });
                      }}
                    >
                      <Recommandation
                        ImageRec={item.thumbnail}
                        profileRec={item.ImageProfileUrl}
                        NomProfilRec={item.Prenom}
                        TitreRec={item.Nom}
                        PrixRec={item.Prix}
                      />
                    </TouchableOpacity>
                  )}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              {/*-------------------------Nouveau Service-------------------*/}

              {/*--------------------------Service Sponsorisé---------------*/}
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
