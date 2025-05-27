import { View, Text, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/input';
import Bouton from '../../components/bouton';
import { Link } from "expo-router";
import axios from 'axios';
import { useRouter } from 'expo-router';

const SignUp = () => {
  const [Prenom, setPrenom] = useState('');
  const [Nom, setNom] = useState('');
  const [Email, setEmail] = useState('');
  const [Telephone, setTelephone] = useState('');
  const [Motdepasse, setMotdepasse] = useState('');
  const [ConfirmationMotDePasse, setConfirmationMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [TypeUtilisateur, setTypeUtilisateur] = useState(''); 
  const router = useRouter();

  const handleRoleSelection = (role) => {
    setTypeUtilisateur(role);
    setShowForm(true); // Affiche le formulaire après sélection du rôle
  };

  // Remplacez 'localhost' par l'IP de votre machine
  const submit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.URL}/api/sign-up`, {
        Nom,
        Prenom,
        Email,
        Telephone,
        Motdepasse,
        TypeUtilisateur: TypeUtilisateur,
      });
      setMessage(response.data.message);
      router.push('sign-in'); 
    } catch (error) {
      console.log(error); 
      setMessage('Erreur lors de l’inscription');
    }
  };

  return (
    <View className='mb-[50px]'>
      <FlatList 
        ListHeaderComponent={
          <View>
            {!showForm ? ( 
              <View className="items-center mt-[100px]">
                <Text className='text-primary text-2xl font-bold'>Choisissez le type d'utilisateur</Text>
                <Bouton 
                  titre={'Fournisseur'} 
                  onPress={() => handleRoleSelection('Fournisseur')} 
                  couleur={'bg-blue-500'}
                />
                <Bouton 
                  titre={'Chercheur'} 
                  onPress={() => handleRoleSelection('Chercheur')} 
                  couleur={'bg-green-500'}
                />
              </View>
            ) : ( 
              <View>
                <View className='items-center mt-[100px]'>
                  <Image 
                    source={require("../../assets/register.png")} 
                    className='w-[220px] h-[220px]' 
                  />
                  <Text className='text-primary text-4xl mt-[10px] font-bold'>Création de compte</Text>
                </View>

                <Input 
                  Titre={'Prenom'}
                  placeholder={'Prenom'}
                  valeur={Prenom}
                  onChange={(text) => setPrenom(text)}
                  motDepasse={false}
                />
                <Input 
                  Titre={'Nom'}
                  placeholder={'Nom'}
                  valeur={Nom}
                  onChange={(text) => setNom(text)}
                  motDepasse={false}
                />
                <Input 
                  Titre={'Email'}
                  placeholder={'Adresse Email'}
                  valeur={Email}
                  onChange={(text) => setEmail(text)}
                  motDepasse={false}
                />
                <Input 
                  Titre={'Numéro'}
                  placeholder={'Numéro Telephone'}
                  valeur={Telephone}
                  onChange={(text) => setTelephone(text)}
                  motDepasse={false}
                />
                <Input 
                  Titre={'Mot de Passe'}
                  placeholder={'Mot de Passe'}
                  valeur={Motdepasse}
                  onChange={(text) => setMotdepasse(text)}
                  motDepasse={true}
                />
                <Input 
                  Titre={'Confirmation de Mot de Passe'}
                  placeholder={'Confirmation de Mot de Passe'}
                  valeur={ConfirmationMotDePasse}
                  onChange={(text) => setConfirmationMotDePasse(text)}
                  motDepasse={true}
                />
                <Bouton 
                  titre={'Créer Compte'}
                  onPress={submit}
                  couleur={'bg-primary'}
                />
                <View className='items-center mt-[5px]'>
                  <Text className='text-[20px]'>
                    Déjà un compte ? <Link href={'/sign-in'} className='text-primary font-bold'>Connexion</Link>
                  </Text>
                </View>
                {message ? <Text>{message}</Text> : null}
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

export default SignUp;
