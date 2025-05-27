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
  import React, { useState } from "react";
  import { Link, router } from "expo-router";
  import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
  import Service from "../../components/service";
  import Bouton from "../../components/bouton";
  import Input from "../../components/input";
  import Icon from "react-native-vector-icons/Ionicons"; 
  import { Picker } from "@react-native-picker/picker";
  
  const Publier = () => {
    const [photos, setPhotos] = useState([
     
    ]);
  
    const [description, setDescription] = useState(" ");
  
    const [selectedValue, setSelectedValue] = useState(" ");
    const [modalVisible, setModalVisible] = useState(false); 
    const options = ["Electricté", "Plomberie", "Coiffure", "Enseignement"]; 
  
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
                        Publication
                      </Text>
                    </View>
                  </View>
                  <Input
                    Titre={"Nom du Service"}
                    placeholder={"Nom du Service"}
                    valeur={" "}
                  />
                  <View className="ml-6 mr-6 mt-2">
                    <Text className="text-primary text-[20px]">
                      Televerser thumbnail
                    </Text>
                    <View className=" bg-slate-200 w-[340] h-[150] rounded-2xl">
                      <TouchableOpacity>
                        <Image
                          source={require("../../assets/televerser.png")}
                          className="w-16 h-16 ml-36 mt-11"
                        />
                      </TouchableOpacity>
                    </View>

                    <Text className="text-primary text-[20px]">
                      Televerser des Images
                    </Text>
                    <View className=" bg-slate-200 w-[340] h-[150] rounded-2xl">
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
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      className="mt-3"
                    />
  
                    <View>
                      <Text className="text-primary text-[20px]">
                        Description
                      </Text>
                      <View className="bg-slate-200 w-[340px] h-[200px] rounded-[10px]">
                        <TextInput
                          className="w-[340px] h-[200px] text-[20px] pl-3"
                          placeholder={"Description"}
                          multiline
                          value={description}
                          onChangeText={(text) => setDescription(text)}
                        />
                      </View>
                    </View>
                  </View>
                  <Input Titre={"Prix"} valeur={""} />
  
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
                      transparent={true}
                      animationType="slide"
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <Text style={styles.modalTitle}>
                            Choisir un Categorie
                          </Text>
  
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
  
                  <Bouton titre={"Publier"} couleur={"bg-primary"} />
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
      backgroundColor: "white",
      width: 300,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
    },
    option: {
      padding: 10,
      width: "100%",
      alignItems: "center",
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
    },
    optionText: {
      fontSize: 16,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: "#FF3E4D",
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });
  
  export default Publier;
  