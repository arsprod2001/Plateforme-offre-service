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
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Service from "../../components/service";
import Bouton from "../../components/bouton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const TabSponsoService = [
  {
    ImageService: require("../../assets/mecanic.jpg"),
    NomService: "Mecanique",
    DateDebut: "12/08/24",
    DateFin: "15/08/23",
    Montant: 300,
    Statut: "Accepté",
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    NomService: "Mecanique",
    DateDebut: "12/08/24",
    DateFin: "15/08/23",
    Montant: 300,
    Statut: "Accepté",
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    NomService: "Mecanique",
    DateDebut: "12/08/24",
    DateFin: "15/08/23",
    Montant: 300,
    Statut: "Accepté",
  },
];

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const [service, setService] = useState([]);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    const fetchService = async () => {
      try {
        if (!user || !user.utilisateurId) return; 

        const response = await axios.get(
          `${import.meta.env.URL}/api/tabs/dashboard`,
          {
            params: { IdUtilisateur: user.utilisateurId }, 
          }
        );
        setService(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des services", error);
      }
    };

    loadUser();
    fetchService();
  }, [user]); 

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy-key"}
          ListHeaderComponent={
            <View>
              {/* ------------------en tete------------------*/}
              <View className="bg-primary h-[80] rounded-b-3xl">
                <View className="ml-3 mr-3 mt-4">
                  <Text className="font-bold text-center text-white text-2xl mb-2">
                    DASHBOARD
                  </Text>
                </View>
              </View>

              <View className="ml-3 mr-3 mt-2">
                <Text className="text-4xl font-bold text-primary">
                  Statistique
                </Text>
                <Text className="text-primary text-2xl">
                  Satisfaction Client
                </Text>

                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <Image
                      source={require("../../assets/satisfait.png")}
                      className="w-11 h-11"
                    />
                    <View>
                      <Text className="text-xl font-bold">Moyenne</Text>
                      <View className="flex-row items-center">
                        <Text className="text-[20px] text-primary">4.5</Text>
                        <Image
                          source={require("../../assets/etoile.png")}
                          className=" w-5 h-5"
                        />
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Image
                      source={require("../../assets/positif.png")}
                      className="w-11 h-11"
                    />
                    <View>
                      <Text className="text-xl font-bold">Positive</Text>
                      <View className="flex-row items-center">
                        <Text className="text-[20px] text-primary">95%</Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Image
                      source={require("../../assets/negatif.png")}
                      className="w-11 h-11"
                    />
                    <View>
                      <Text className="text-xl font-bold">Negatif</Text>
                      <View className="flex-row items-center">
                        <Text className="text-[20px] text-primary">5%</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text className="text-primary text-2xl">
                  Satisfaction Client
                </Text>
                <View className="flex-row justify-between">
                  <View className="bg-primary w-[175] h-[100] rounded-xl">
                    <Text className="text-white text-xl">
                      Total Service Publié
                    </Text>
                    <Text className="text-4xl text-center text-white">
                      5000
                    </Text>
                  </View>
                  <View className="bg-primary w-[175] h-[100] rounded-xl">
                    <Text className="text-white text-xl">
                      Total Service Spons
                    </Text>
                    <Text className="text-4xl text-center text-white">5</Text>
                  </View>
                </View>

                <Text className="text-4xl font-bold text-primary">
                  Gestion de Service
                </Text>

                <FlatList
                  data={service.slice(0, 2)}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>

                          router.push({
                            pathname: "/serviceEdit/[id]",
                            params: { id: item.ServiceId},
                          })
                        }
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

                      <TouchableOpacity
                        className="bg-rouge rounded-2xl mr-4 mt-2"
                        onPress={() =>
                          router.push(`/promotionEdit/${item.ServiceId}`)
                        }
                      >
                        <Text className="text-center text-white text-xl font-bold">
                          Promouvoir
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />

                <TouchableOpacity
                  onPress={() => router.push("/AllServiceUser/[id]")}
                >
                  <Text className="text-xl text-center text-primary font-bold mt-3">
                    Voir Plus
                  </Text>
                </TouchableOpacity>

                <Bouton
                  titre={"Publier "}
                  couleur={"bg-primary"}
                  onPress={() => router.push("/PublicationService/publisher")}
                />

                <Text className="text-4xl font-bold text-primary">
                  Service en Promotion
                </Text>

                {/* 

                <FlatList
                  data=}
                  renderItem={({ item }) => (
                    <View>

                      <Service
                        image={item.ImageService}
                        profile={item.profileFournisseur}
                        nom={item.NomProfilFournisseur}
                        icon={item.IconVerified}
                        servie={item.NomService}
                        prix={item.PrixService}
                        localisation={item.localisation}
                        pourcentage={item.pourcentage}
                        couleur={"bg-red-600"}
                      />
                    </View>
                  )}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
                */}

                <TouchableOpacity>
                  <Text className="text-xl text-center text-primary font-bold mt-3">
                    Voir Plus
                  </Text>
                </TouchableOpacity>

                <Text className="text-4xl font-bold text-primary">
                  Service Sponsorisé
                </Text>

                <FlatList
                  data={TabSponsoService}
                  renderItem={({ item }) => (
                    <View className="mb-3">
                      <View className="bg-primary w-full h-28 rounded-xl">
                        <View className="flex-row items-center">
                          <Image
                            source={item.ImageService}
                            className="w-36 h-28 rounded-xl"
                          />
                          <View className="ml-2">
                            <Text className="text-xl text-white">
                              Service : {item.NomService}
                            </Text>
                            <Text className="text-xl text-white">
                              Date Debut : {item.DateDebut}
                            </Text>
                            <Text className="text-xl text-white">
                              Date Fin : {item.DateFin}
                            </Text>
                            <Text className="text-xl text-white">
                              Statut : {item.Statut}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />

                <TouchableOpacity>
                  <Text className="text-xl text-center text-primary font-bold mt-3">
                    Voir Plus
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
