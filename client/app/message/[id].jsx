import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const socket = io(`${import.meta.env.URL}`);

const Message = () => {
  const { id, prenom, ImageProfile } = useLocalSearchParams();
  const [message, setMessage] = useState([]); 
  const [newMessage, setNewMessage] = useState(""); 
  const [senderId, setSenderId] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const flatListRef = useRef(null); 

  // Chargement de l'utilisateur à partir du stockage
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setSenderId(parsedUser.utilisateurId); 
      } else {
        router.push("/(auth)/sign-in"); 
      }
    };

    loadUser();

    // Rejoindre la salle de chat de l’utilisateur
    if (senderId) {
      socket.emit("join", senderId);

      // Charger les messages existants
      axios
        .get(`${import.meta.env.URL}/messages?SenderId=${senderId}&ReceiverId=${id}`)
        .then((response) => {
          setMessage(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des messages:", error);
        });

      // Écouter les nouveaux messages entrants
      socket.on("receiveMessage", (message) => {
        if (message.SenderId === senderId || message.ReceiverId === senderId) {
          // Ajouter le message à l'état local
          setMessage((prevMessages) => [...prevMessages, message]);
        }
      });
    }

    // Nettoyage des écouteurs de socket lors du démontage du composant
    return () => {
      socket.off("receiveMessage");
    };
  }, [senderId, id, message]);

  // Fonction pour envoyer un message
  const sendMessage = () => {
    if (newMessage.trim() === "") return; 

    const messageData = {
      SenderId: senderId,
      ReceiverId: id,
      Message: newMessage,
      Date: new Date().toISOString(),
    };

    // Envoyer le message au serveur via socket
    socket.emit("sendMessage", messageData);

    // Ajouter immédiatement le message à la liste des messages (affichage instantané)
    setMessage((prevMessages) => [...prevMessages, messageData]);

    // Réinitialiser le champ de message
    setNewMessage("");

    // Faire défiler la liste vers le bas
    flatListRef.current.scrollToEnd({ animated: true });
  };

  // Rendu d'un message dans la liste
  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.SenderId === senderId;
    return (
      <View
        style={{
          alignSelf: isCurrentUser ? "flex-end" : "flex-start",
          backgroundColor: isCurrentUser ? "#DCF8C6" : "#ECECEC",
          borderRadius: 8,
          padding: 10,
          marginVertical: 5,
          maxWidth: "80%",
        }}
      >
        <Text>{item.Message}</Text>
        <Text style={{ fontSize: 10, color: "#888", textAlign: "right" }}>
          {new Date(item.Date).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          {/* Header Section */}
          <View style={{ backgroundColor: "#007BFF", height: 100, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
            <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <Image source={require("../../assets/arrow1.png")} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <Image
                source={{ uri: ImageProfile }}
                style={{ width: 48, height: 48, borderRadius: 24, marginLeft: 10 }}
              />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
                {prenom}
              </Text>
            </View>
          </View>

          <FlatList
            ref={flatListRef}
            data={message}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMessageItem}
            style={{ flex: 1, padding: 10 }}
            extraData={message} 
          />
          <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "#F1F1F1",
                borderRadius: 20,
                padding: 10,
                marginRight: 10,
              }}
              placeholder="Écrire votre message"
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Image source={require("../../assets/send.png")} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Message;
