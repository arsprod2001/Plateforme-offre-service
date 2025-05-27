import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import Service from "../../components/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const AllService = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState([]);

  // Fonction pour charger l'utilisateur à partir de AsyncStorage
  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/(auth)/sign-in");
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l’utilisateur", error);
    }
  };

  // Fonction pour récupérer les services de l'utilisateur
  const fetchService = async () => {
    if (!user || !user.utilisateurId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.URL}/api/AllServiceUser/${user.utilisateurId}`
      );
      setService(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    fetchService();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={service}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        ListHeaderComponent={
          <View>
            <View className="ml-3 mr-3 flex-row items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={require("../../assets/arrow.png")}
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <Text className="text-2xl ml-3 font-bold text-primary">
                Service
              </Text>
            </View>
            <View className=" mt-5 ml-3 mr-3">
              <FlatList
                data={service}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => router.push('/serviceEdit/[id]')}
                    >
                      <Image
                        source={require("../../assets/edition.png")}
                        className="w-10 h-10 absolute z-20 top-20 left-[60]"
                      />
                      <Service
                        image={item.thumbnail}
                        profile={item.ImageProfileUrl}
                        nom={item.Prenom}
                        icon={item.IconVerified}
                        servie={item.ServiceNom}
                        prix={item.Prix}
                        localisation={item.Adresse}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-rouge rounded-2xl mr-4 mt-2">
                      <Text className="text-center text-white text-xl font-bold">
                        Promouvoir
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={2}
                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AllService;
