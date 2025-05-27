import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Service from "../../components/service";
import Bouton from "../../components/bouton";
import Input from "../../components/input";
import DateTimePicker from "@react-native-community/datetimepicker";

const PromotionEdit = () => {
  const [dateDebut, setDateDebut] = useState(new Date());
  const [showDateDebut, setShowDateDebut] = useState(true);
  const [dateFin, setDateFin] = useState(new Date());
  const [showDateFin, setShowDateFin] = useState(true);
  const [price, setPrice] = useState(0);

  const [formType, setFormType] = useState(null);

  const [selectedBank, setSelectedBank] = useState(null); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    transactionId: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderForm = () => {
    return (
      <View>
        <Text className="text-primary text-[20px] ml-6 mr-3 mt-4">
          Formulaire de Paiment
        </Text>
        <Input Titre={"Nom"} placeholder={"Nom"} edition={true} />
        <Input Titre={"Prenom"} placeholder={"Prénom"} edition={true} />
        <Input
          Titre={"Numéro Telephone"}
          placeholder={"Telephone"}
          edition={true}
        />
        <Input
          Titre={"TransactionId"}
          placeholder={"Transaction Id"}
          edition={true}
        />

        <View className="ml-6 mr-6 mt-2">
          <Text className="text-primary text-[20px]">
            Capture d'ecran transaction
          </Text>
          <View className=" bg-slate-200 w-[340] h-[220] rounded-2xl">
            <TouchableOpacity>
              <Image
                source={require("../../assets/upload.png")}
                className="w-[120] h-[120] mt-11 ml-[95px]"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const calculateDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const days = calculateDays(dateDebut, dateFin);
    let calculatedPrice = 0;

    if (days >= 1 && days <= 6) {
      calculatedPrice = days * 200; 
    } else if (days === 7) {
      calculatedPrice = 1000; 
    }

    setPrice(calculatedPrice);
  }, [dateDebut, dateFin]);

  const onChangeDateDebut = (event, selectedDate) => {
    const currentDate = selectedDate || dateDebut;
    setShowDateDebut(Platform.OS === "ios");
    setDateDebut(currentDate);
  };

  const onChangeDateFin = (event, selectedDate) => {
    const currentDate = selectedDate || dateFin;
    setShowDateFin(Platform.OS === "ios");

    const maxEndDate = new Date(dateDebut);
    maxEndDate.setDate(maxEndDate.getDate() + 7);
    if (currentDate > maxEndDate) {
      alert(
        "La date de fin ne peut pas dépasser une semaine après la date de début."
      );
      setDateFin(maxEndDate);
    } else {
      setDateFin(currentDate);
    }
  };

  const bankLogos = {
    Bankily: require("../../assets/bankily-logo.png"),
    Masrvi: require("../../assets/masrvi-logo.png"),
    Bimbank: require("../../assets/bimbank-logo.png"),
    Click: require("../../assets/click-logo.png"),
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={
            <View className="bg-primary h-[80] rounded-b-3xl">
              <View className="ml-3 mr-3 mt-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                  <Image
                    source={require("../../assets/arrow1.png")}
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
                <Text className="font-bold text-center text-white text-2xl mb-2 ml-3">
                  Gestion de Promotion
                </Text>
              </View>
            </View>
          }
          ListFooterComponent={
            <View>
              <Bouton
                titre={"Sponsorisation"}
                couleur={"bg-primary"}
                onPress={() => setFormType("sponsorisation")}
              />
              <Bouton
                titre={"Reduction"}
                couleur={"bg-primary"}
                onPress={() => setFormType("reduction")}
              />

              {formType === "sponsorisation" && (
                <View>
                  <FlatList
                    data={[]}
                    renderItem={null}
                    keyExtractor={() => "dummy-key"}
                    ListHeaderComponent={
                      <View>
                        <Input
                          Titre={"Nom du Service"}
                          placeholder={"Nom du Service"}
                          valeur={"Electricité"}
                          edition={false}
                        />
                        <View className="ml-6 mr-6 mt-2">
                          <Text className="text-primary text-[20px]">
                            Image Thumbnail
                          </Text>
                          <View className=" bg-slate-200 w-[340] h-[220] rounded-2xl">
                            <TouchableOpacity>
                              <Image
                                source={require("../../assets/promo2.jpg")}
                                className="w-[340] h-[220] rounded-2xl"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View className="ml-6 mr-3 mt-4">
                          <Text className="text-primary text-[20px]">
                            Date de Promotion
                          </Text>
                          <View className="flex-row items-center justify-between">
                            <View>
                              {showDateDebut && (
                                <DateTimePicker
                                  value={dateDebut}
                                  mode="date"
                                  display="default"
                                  onChange={onChangeDateDebut}
                                />
                              )}
                            </View>

                            <View>
                              {showDateFin && (
                                <DateTimePicker
                                  value={dateFin}
                                  mode="date"
                                  display="default"
                                  onChange={onChangeDateFin}
                                />
                              )}
                            </View>
                          </View>
                          <Text className="text-primary text-[20px]">Prix</Text>
                          <Text className="text-center text-primary text-[40px]">
                            {price} MRU
                          </Text>

                          <Text className="text-primary text-[20px]">
                            Paiement
                          </Text>

                          <View>
                            {selectedBank ? (
                              <TouchableOpacity
                                onPress={() => setSelectedBank(null)} 
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  padding: 10,
                                }}
                              >
                                <Image
                                  source={bankLogos[selectedBank]}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 10,
                                  }}
                                />
                                <Text className="text-xl">{selectedBank}</Text>
                              </TouchableOpacity>
                            ) : (
                              <View
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  justifyContent: "space-between",
                                }}
                              >
                                {["Bankily", "Masrvi", "Bimbank", "Click"].map(
                                  (bank) => (
                                    <TouchableOpacity
                                      key={bank}
                                      onPress={() => setSelectedBank(bank)} 
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        width: "48%",
                                        marginBottom: 10, 
                                      }}
                                    >
                                      <Image
                                        source={bankLogos[bank]}
                                        style={{
                                          width: 30,
                                          height: 30,
                                          marginRight: 10,
                                        }}
                                      />
                                      <Text className="text-xl">{bank}</Text>
                                    </TouchableOpacity>
                                  )
                                )}
                              </View>
                            )}
                          </View>
                        </View>
                        {selectedBank && renderForm()}

                        <Bouton titre={"Promouvoir"} couleur={"bg-primary"} />
                      </View>
                    }
                  />
                </View>
              )}

              {formType === "reduction" && (
                <View>
                  <FlatList
                    data={[]}
                    renderItem={null}
                    keyExtractor={() => "dummy-key"}
                    ListHeaderComponent={
                      <View>
                        <Input
                          Titre={"Nom du Service"}
                          placeholder={"Nom du Service"}
                          valeur={"Electricité"}
                          edition={false}
                        />
                        <View className="ml-6 mr-6 mt-2">
                          <Text className="text-primary text-[20px]">
                            Image Thumbnail
                          </Text>
                          <View className=" bg-slate-200 w-[340] h-[220] rounded-2xl">
                            <TouchableOpacity>
                              <Image
                                source={require("../../assets/promo2.jpg")}
                                className="w-[340] h-[220] rounded-2xl"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View className="ml-6 mr-3 mt-4">
                          <Text className="text-primary text-[20px]">
                            Date de Promotion
                          </Text>
                          <View className="flex-row items-center justify-between">
                            <View>
                              {showDateDebut && (
                                <DateTimePicker
                                  value={dateDebut}
                                  mode="date"
                                  display="default"
                                  onChange={onChangeDateDebut}
                                />
                              )}
                            </View>

                            <View>
                              {showDateFin && (
                                <DateTimePicker
                                  value={dateFin}
                                  mode="date"
                                  display="default"
                                  onChange={onChangeDateFin}
                                />
                              )}
                            </View>
                          </View>
                        </View>
                        <Input
                          Titre={"Pourcentage"}
                          placeholder={"Pourcentage de reduction"}
                          edition={true}
                        />

                        <Bouton titre={"Promouvoir"} couleur={"bg-primary"} />
                      </View>
                    }
                  />
                </View>
              )}
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

export default PromotionEdit;
