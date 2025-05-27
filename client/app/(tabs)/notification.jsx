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
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const TabNotification = [
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
  {
    IconNotification: require("../../assets/promotion.png"),
    DescriptionNotification:
      "Profitez d'une reduction de 20% sur toutes les services de nettoyage",
    DateHeure: "Lundi, 14:18",
  },
];

const Notifications = ({ Icon, Description, DateHeure }) => {
  return (
    <View className="ml-3 mr-3 mt-4 bg">
      <TouchableOpacity>
        <View className="flex-row bg-Ccolor items-center p-3 rounded-xl">
          <Image source={Icon} className=" h-10 w-10 mr-2" />
          <View>
            <Text>{Description}</Text>
            <Text>{DateHeure}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Notification = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={
            <View>
              {/* ------------------en tete------------------*/}
              <View className="ml-3 mr-3 mt-4">
                {/* ------------Input recherche---------- */}
                <Text className="font-bold text-center text-primary text-2xl mb-2">
                  Notification
                </Text>
              </View>
            </View>
          }
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy-key"}
          ListFooterComponent={
            <FlatList
              data={TabNotification}
              renderItem={({ item }) => (
                <Notifications
                  Icon={item.IconNotification}
                  Description={item.DescriptionNotification}
                  DateHeure={item.DateHeure}
                />
              )}
            />
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Notification;
