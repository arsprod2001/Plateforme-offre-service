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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import { AuthContext } from "../../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IconEdit = require("../../../assets/ProfileEdit.png");
const IconDarkMode = require("../../../assets/night-mode.png");
const IconSupportAide = require("../../../assets/customer-service.png");
const IconDeconnexion = require("../../../assets/logout.png");

const IconClick = require("../../../assets/move.png");

const Profiles = ({ Icon, Nom, IconClick }) => {

  return (
    <View className="ml-3 mr-3 mt-4">
      <View>
        <View className="flex-row justify-between items-center border-b-1 border-slate-600">
          <View className="flex-row items-center">
            <Image source={Icon} className="w-8 h-8" />
            <Text className=" text-xl text-primary">{Nom}</Text>
          </View>
          <Image source={IconClick} className="w-8 h-8" />
        </View>
      </View>
    </View>
  );
};

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);


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
    loadUser();
  }, []);

  if (loading) return null;



  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          {/* ------------------en tete------------------*/}
          <View className="bg-primary h-44 rounded-b-3xl">
            <View className="ml-3 mr-3 mt-4">
              {/* ------------Input recherche---------- */}
              <Text className="font-bold text-center text-white text-2xl mb-2">
                Profile
              </Text>
            </View>
          </View>
          <Image
            source={{uri: user.ImageProfileUrl}}
            className=" w-44 h-44 rounded-full ml-24 -mt-24"
          />
          <View className="flex-row justify-center items-center">
            <Text className="font-bold text-primary text-2xl">{user.Prenom} {user.Nom}</Text>
            {/*        
            <Image
              source={require("../../../assets/verified1.png")}
              className="w-5 h-5"
            />
            */}    
          </View>
        </View>
        <TouchableOpacity onPress={()=>router.push('../ProfileEdit/[id]')}>
          <Profiles
            Icon={IconEdit}
            Nom={"Editer le profile"}
            IconClick={IconClick}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Profiles
            Icon={IconDarkMode}
            Nom={"Dark Mode"}
            IconClick={IconClick}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Profiles
            Icon={IconSupportAide}
            Nom={"Support D'aide"}
            IconClick={IconClick}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.push("/sign-in")}>
          <Profiles Icon={IconDeconnexion} Nom={"Deconnexion"} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
