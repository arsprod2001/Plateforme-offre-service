import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Service from "../../components/service";
import Bouton from "../../components/bouton";
import Input from "../../components/input";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const ServiceEdition = () => {
  const { id } = useLocalSearchParams();
  const [photos, setPhotos] = useState([
    { id: "1", uri: require("../../assets/promo2.jpg") },
    { id: "2", uri: require("../../assets/promo3.jpg") },
    { id: "3", uri: require("../../assets/promo4.jpg") },
    { id: "4", uri: require("../../assets/promo4.jpg") },
    { id: "5", uri: require("../../assets/promo4.jpg") },
    { id: "6", uri: require("../../assets/promo4.jpg") },
  ]);

  const [selectedValue, setSelectedValue] = useState("Electricité");
  const [modalVisible, setModalVisible] = useState(false);
  const options = ["Electricité", "Plomberie", "Coiffure", "Enseignement"];

  const handleSelect = (value) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={item.uri} style={styles.photo} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Icon name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const [service, setService] = useState({});
  const [Nom, setNom] = useState("");
  const [Description, setDescription] = useState("");
  const [Prix, setPrix] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${import.meta.env.URL}/api/ServiceEdit/${id}`);
        setService(response.data[0]);
      } catch (error) {
        console.log("Erreur lors du chargement des service", error);
      }
    };
    fetchService();
  }, [id]);

  useEffect(() => {
    if (service) {
      setNom(service.Nom || "");
      setDescription(service.Description || "");
      setPrix(service.Prix || "");
    }
  }, [service]);

  const Enregistrer = async () => {
    try {
      const response = await axios.post(`${import.meta.env.URL}/api/ServiceEdit/${id}`, {
        Nom,
        Description,
        Prix,
      });

      if (response.data.message === "Update Réussi") {
        alert("Mise à jour réussie avec succès");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      if (error.response) {
        alert(`Erreur serveur : ${error.response.data.message || "Problème inattendu"}`);
      } else if (error.request) {
        alert("Erreur de connexion : le serveur n'a pas répondu");
      } else {
        alert(`Erreur : ${error.message}`);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <FlatList
            data={[]}
            renderItem={null}
            keyExtractor={() => "dummy-key"}
            ListHeaderComponent={
              <View>
                <View className="bg-primary h-[80] rounded-b-3xl">
                  <View className="ml-3 mr-3 mt-4 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                      <Image
                        source={require("../../assets/arrow1.png")}
                        className="w-6 h-6"
                      />
                    </TouchableOpacity>
                    <Text className="font-bold text-center text-white text-2xl mb-2 ml-3">
                      Gestion de Service
                    </Text>
                  </View>
                </View>
                <Input
                  Titre={"Nom du Service"}
                  placeholder={"Nom du Service"}
                  valeur={Nom}
                  onChange={(e) => setNom(e)}
                />
                <View className="ml-6 mr-6 mt-2">
                  <Text className="text-primary text-[20px]">
                    Televerser des Images
                  </Text>
                  <View className="bg-slate-200 w-[340] h-[150] rounded-2xl">
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/televerser.png")}
                        className="w-16 h-16 ml-36 mt-11"
                      />
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={photos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                  />

                  <View>
                    <Text className="text-primary text-[20px]">Description</Text>
                    <View className="bg-slate-200 w-[340px] h-[200px] rounded-[10px]">
                      <TextInput
                        className="w-[340px] h-[200px] text-[20px] pl-3"
                        placeholder={"Description"}
                        multiline
                        value={Description}
                        onChangeText={(e) => setDescription(e)}
                      />
                    </View>
                  </View>
                </View>
                <Input
                  Titre={"Prix"}
                  valeur={Prix}
                  onChange={(e) => setPrix(e)}
                />

                <View className="ml-6 mr-6 mt-4">
                  <Text className="text-primary text-[20px]">
                    Categorie: {selectedValue || "None"}
                  </Text>

                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="mt-2"
                  >
                    <View className="bg-primary rounded-xl">
                      <Text className="pl-[20px] pr-[20px] pt-3 pb-3 text-white text-[20px] font-bold">
                        Selection Categorie
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <Modal
                    transparent
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choisir un Categorie</Text>
                        <FlatList
                          data={options}
                          keyExtractor={(item) => item}
                          renderItem={({ item }) => (
                            <Pressable
                              style={styles.option}
                              onPress={() => handleSelect(item)}
                            >
                              <Text style={styles.optionText}>{item}</Text>
                            </Pressable>
                          )}
                        />
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}
                          style={styles.closeButton}
                        >
                          <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>

                <Bouton titre={"Enregistrer"} couleur={"bg-primary"} onPress={Enregistrer} />
                <Bouton titre={"Supprimer"} couleur={"bg-rouge"} />
              </View>
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    position: "relative",
    margin: 5,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ServiceEdition;
