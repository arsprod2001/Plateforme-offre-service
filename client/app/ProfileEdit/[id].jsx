import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { router, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/input";
import Bouton from "../../components/bouton";
import { AuthContext } from "../AuthContext";
import { supabase } from "../supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons"; 



const profileEdit = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [Nom, setNom] = useState(user.Nom);
  const [Prenom, setPrenom] = useState(user.Prenom);
  const [Email, setEmail] = useState(user.Email);
  const [Telephone, setTelephone] = useState(user.Telephone);
  const [Adresse, setAdresse] = useState(user.Adresse);
  const [ImageProfileUrl, SetImageProfileUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/(auth)/sign-in"); // Redirige si l'utilisateur n'est pas connecté
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  if (loading) return null;

  const Enregistrer = async () => {
    let imageUrl = ImageProfileUrl;
    console.log(selectedImage);
    if (selectedImage) {
      const uri = selectedImage;
      const fileExt = uri.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      // Téléchargement du fichier dans le stockage Supabase
      let { data, error } = await supabase.storage
        .from("mjeb")
        .upload(filePath, uri);

      if (error) {
        alert("Erreur de téléchargement de l'image : " + error.message);
        return;
      }

      const { data: url } = await supabase.storage
        .from("mjeb")
        .getPublicUrl(filePath);

      imageUrl = url.publicUrl;
      console.log(imageUrl);
    }

    try {
      // Envoi des données au serveur
      const serverResponse = await axios.post(
        `${import.meta.env.URL}/api/ProfileEdit/${user.utilisateurId}`,
        {
          Nom,
          Prenom,
          Telephone,
          Adresse,
          ImageProfileUrl: imageUrl, 
        }
      );

      if (serverResponse.data.message === "Update Réussi") {
        alert("Mise à jour réussie avec succès");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      alert(`Erreur lors de l'envoi des données: ${error.message}`);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission requise pour accéder à la galerie !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-primary h-[120] rounded-b-[60]">
          <View className="ml-3 mr-3 flex-row items-center mt-5">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("../../assets/arrow1.png")}
                className="w-6 h-6 mt-1"
              />
            </TouchableOpacity>
            <Text className="text-2xl ml-3 font-bold text-white">
              Editer Profile
            </Text>
          </View>
        </View>

        {selectedImage ? (
          <View>
            <Image
              source={{ uri: selectedImage }}
              className=" w-32 h-32 rounded-full ml-[130] -mt-[50] bg-white"
            />
            <TouchableOpacity onPress={removeImage}>
              <Icon
                name="close-circle"
                size={40}
                color="red"
                className="ml-[210] -mt-[110]"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <View className=" bg-white w-32 h-32 rounded-full ml-[130] -mt-[50]">
              <Image
                source={require("../../assets/upload.png")}
                className=" w-[50] h-[50] mt-[30] ml-[30]"
              />
            </View>
          </TouchableOpacity>
        )}

        <Input
          Titre={"Nom"}
          placeholder={"Nom"}
          valeur={Nom}
          onChange={(e) => setNom(e)}
        />
        <Input
          Titre={"Prenom"}
          placeholder={"Prenom"}
          valeur={Prenom}
          onChange={(e) => setPrenom(e)}
        />
        <Input Titre={"Email"} placeholder={"Email"} valeur={Email} />
        <Input
          Titre={"Telephone"}
          placeholder={"Telephone"}
          valeur={Telephone}
          onChange={(e) => setTelephone(e)}
        />
        <Input
          Titre={"Adresse"}
          placeholder={"Adresse"}
          valeur={Adresse}
          onChange={(e) => setAdresse(e)}
        />

        <Bouton
          titre={"Enregistrer"}
          couleur={"bg-primary"}
          onPress={Enregistrer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default profileEdit;
