import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const { width } = Dimensions.get("window");


const ServiceDescription = () => {
  const { id } = useLocalSearchParams();
  const [service, setService] = useState([]);
  const [media, setMedia] = useState([]);

  const [imageSelectionnee, setImageSelectionnee] = useState(null); 

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.URL}/api/serviceDesc/${id}`
        );
        setService(response.data[0]);
      } catch (error) {
        console.log("Erreur lors du chargement du service");
      }
    };

    const fetchMedia = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.URL}/api/media/${id}`
        );
        setMedia(response.data);
        if (media.length > 0) {
          setImageSelectionnee(media[0].url);
        }
      } catch (error) {
        console.log("Erreur lors du chargement des media");
      }
    };

    
    fetchMedia();
    fetchService();
  }, [id]);


  const onMiniaturePress = (image) => {
    setImageSelectionnee(image.URL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <View className="ml-3 mr-3 flex-row items-center mb-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("../../assets/arrow.png")}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageSection}>
            <Image source={{uri: imageSelectionnee}} style={styles.imagePrincipale} />
          </View>

          <FlatList
            data={media}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.MediaId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onMiniaturePress(item)}>
                <Image
                  source={{uri: item.URL}}
                  style={[
                    styles.miniature,
                    item.URL === imageSelectionnee
                      ? styles.miniatureSelectionnee
                      : null, 
                  ]}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listeMiniatures}
          />
          <View className="ml-3 mr-3 mt-4">
            <View>
              <Text className="text-3xl text-primary font-bold">
                {service.Nom}
              </Text>
              <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/profileDesc/[id]",
                      params: {id: service.utilisateurId},
                    });
                  }}
                >
                <View className="flex-row items-center">
                <Image
                    source={{ uri: service.ImageProfileUrl }}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                 
                  <View>
                    <View className="flex-row items-center">
                      <Text className="font-bold text-black text-base">
                        {service.Prenom}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Image
                        source={require("../../assets/etoile.png")}
                        className="w-3 h-5"
                      />
                      <Image
                        source={require("../../assets/etoile.png")}
                        className="w-3 h-5"
                      />
                      <Image
                        source={require("../../assets/etoile.png")}
                        className="w-3 h-5"
                      />
                      <Image
                        source={require("../../assets/etoile.png")}
                        className="w-3 h-5"
                      />
                      <Image
                        source={require("../../assets/etoile.png")}
                        className="w-3 h-5"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/localisation1.png")}
                  className="w-5 h-5"
                />
                <Text className="text-[17px]">{service.Adresse}</Text>
              </View>

              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/price.png")}
                  className="w-5 h-5"
                />
                <Text className="text-[17px]">{service.Prix} MRU</Text>
              </View>

              <View className="border-t-[1px] border-primary mt-4">
                <Text className="text-2xl font-bold text-primary mt-2">
                  A propos du Service
                </Text>
                <Text className="text-xl">
                  {service.Description}
                  </Text>
                <View></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row items-center justify-center gap-6">
        <TouchableOpacity
          className="items-center mt-4"
          onPress={() => router.push({
            pathname: "/message/[id]",
            params: {id: service.utilisateurId, prenom: service.Prenom, ImageProfile: service.ImageProfileUrl}
          })}
        >
          <View className=" bg-black rounded-xl">
            <Text className="pl-[30px] pr-[30px] pt-3 pb-3 text-white text-[20px] font-bold">
              Message
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="items-center mt-4">
          <View className=" bg-primary rounded-xl">
            <Text className="pl-[30px] pr-[30px] pt-3 pb-3 text-white text-[20px] font-bold">
              Appeler
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  imageSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePrincipale: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
  },
  listeMiniatures: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  miniature: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  miniatureSelectionnee: {
    borderColor: "#40abfd", 
  },
});

export default ServiceDescription;
