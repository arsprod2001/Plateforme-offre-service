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
import { Link, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io("http://192.168.2.234:3000");

/*-------------Icon de recherche---------------------*/
const IconRecherche = require("../../../assets/search.png");
/*-------------Icon de filtre---------------------*/
const IconFiltre = require("../../../assets/setting.png");

const Message = ({ Profile, Nom, Verified, sms, heure }) => {
  return (
    <View>
        <View className="ml-3 mr-3 mt-4">
          <View className="flex-row items-center justify-between gap-[100px]">
            <View className="flex-row">
              <Image source={{uri : Profile}} className=" w-12 h-12 rounded-full" />
              <View>
                <View>
                  <View className="flex-row items-center">
                    <Text className="font-bold text-lg">{Nom}</Text>
                    <Image source={Verified} className="w-5 h-5" />
                  </View>
                  <Text
                    className=" w-36"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {sms}
                  </Text>
                </View>
              </View>
            </View>
            <View >
              <Text>{heure}</Text>
            </View>
          </View>
        </View>
    </View>
  );
};

const Chat = () => {
  const { user, setUser } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchUserMessage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.URL}/api/tabs/chat/${user.utilisateurId}`
        );
        setMessage(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des message", error);
      }
    };
    loadUser();
    fetchUserMessage();
  }, [message]);

  const formatTimeElapsed = (date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const diffInMs = now - messageDate;
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days}`; 
    } else if (hours > 0) {
      return `${hours}H`; 
    } else if (minutes > 0) {
      return `${minutes}mn`;
    } else {
      return "À l'instant"; 
    }
  };
  

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={
            <View>
              {/* ------------------en tete------------------*/}
              <View className="bg-primary h-32 rounded-b-3xl">
                <View className="ml-3 mr-3 mt-4">
                  {/* ------------Input recherche---------- */}
                  <Text className="font-bold text-center text-white text-2xl mb-2">
                    Message
                  </Text>
                  <View className="justify-center items-center">
                    <View className="flex-row bg-white rounded-md p-1 w-5/6">
                      <Image source={IconRecherche} className="w-8 h-8" />
                      <TextInput
                        placeholder="Recherche"
                        className="text-xl ml-2"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/*--------------------Message-------------------*/}
              <FlatList
                data={message}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="items-center mt-4"
                    onPress={() =>
                      router.push({
                        pathname: "/message/[id]",
                        params: {
                          id: item.utilisateurId,
                          prenom: item.Prenom,
                          ImageProfile: item.ImageProfileUrl,
                        },
                      })
                    }
                  >
                    <Message
                      Profile={item.ImageProfileUrl}
                      Nom={item.Prenom}
                      Verified={item.ImageVerified}
                      sms={item.Message}
                      heure={formatTimeElapsed(item.Date)}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          }
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy-key"}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Chat;
