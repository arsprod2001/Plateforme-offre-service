import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import Service from '../../components/service';

/*-------------Icon de recherche---------------------*/
const IconRecherche = require("../../assets/search.png");
/*-------------Icon de filtre---------------------*/
const IconFiltre = require("../../assets/setting.png");


const TabSearchService = [
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
  {
    ImageService: require("../../assets/mecanic.jpg"),
    profileFournisseur: require("../../assets/profileRec.jpg"),
    NomProfilFournisseur: "Farmata",
    IconVerified: require("../../assets/verified.png"),
    NomService: "Electricité",
    PrixService: "600MRU",
    localisation: "Arafat"
  },
];



const Search = () => {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View className = 'mt-2'>
            {/* ------------------en tete------------------*/}
            <View className="bg-primary h-[190px] rounded-b-3xl">
              <View className="ml-3 mr-3">

                {/* ------------Input recherche---------- */}
                <View className="justify-center items-center mt-4">
                  <View className="flex-row bg-white rounded-md p-1 w-5/6">
                    <Image source={IconRecherche} className="w-8 h-8" />
                    <TextInput
                      placeholder="Recherche"
                      className="text-xl ml-2"
                    />
                  </View>
                </View>



                {/* ------------Filtrage---------- */}
                <View className="justify-center items-center mt-4">
                  <TouchableOpacity
                    className="flex-row bg-white rounded-full p-1 w-5/6 justify-center items-center"
                    onPress={()=>{}}
                  >
                    <Text className="text-primary text-2xl">Filtrage</Text>
                    <Image source={IconFiltre} className="w-8 h-8" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className = 'items-center mt-4 mb-3'>
                    <View className = " bg-white rounded-xl">
                       <Text className = 'pl-[100px] pr-[100px] pt-3 pb-3 text-primary text-[20px] font-bold'>Rechercher</Text>
                    </View>
               </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        data={[]}
        renderItem={null}
        keyExtractor={() => "dummy-key"}
        ListFooterComponent={
          <View className=" mt-5 ml-3 mr-3">
            <Text className = 'text-3xl font-bold text-primary'>Search Resultat</Text>
            <FlatList
                data={TabSearchService}
                renderItem={({ item }) => (
                  <Service
                    image={item.ImageService}
                    profile={item.profileFournisseur}
                    nom={item.NomProfilFournisseur}
                    icon={item.IconVerified}
                    servie={item.NomService}
                    prix={item.PrixService}
                    localisation={item.localisation}
                  />
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
              />
            
          </View>
        }
      />
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default Search