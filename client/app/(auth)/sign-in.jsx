import { View, Text, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/input';
import Bouton from '../../components/bouton';
import { Link } from "expo-router";
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [Telephone, setTelephone] = useState('');
  const [Motdepasse, setMotdepasse] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const submit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.URL}/api/sign-in`, {
        Telephone,
        Motdepasse
      });
      
      if (response.data.message === 'Login successful') {
        setMessage(response.data.message);
        
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));  
        
        if (response.data.user.TypeUtilisateur === 'Chercheur') {
          router.push('/(tabs)/(home)');  
        } else {
          router.push('/(tabs2)/(home)'); 
        }
      } else {
        setMessage('Identifiants incorrects');
      }
    } catch (error) {
      setMessage('Erreur lors de la connexion');
    }
  };


  return (
    <View>
      <View className='items-center mt-[100px]'>
        <View>
          <Image source={require("../../assets/account.png")} 
            className='w-[220px] h-[220px]'
          />
          <Text className='text-primary text-5xl mt-[10px] font-bold'>Connexion</Text>
        </View>
      </View>
      
      <Input 
        Titre={'Numéro Telephone'}
        placeholder={'Numéro Telephone'}
        valeur={Telephone}
        onChange={(e) => setTelephone(e)}
        motDepasse={false}
      />

      <Input 
        Titre={'Mot de Passe'}
        placeholder={'Password'}
        valeur={Motdepasse}
        onChange={(e) => setMotdepasse(e)}
        motDepasse={true}
      />

      <Bouton 
        titre={'Connexion'}
        onPress={submit}
        couleur={'bg-primary'}
      />

      <Link href={''} className='text-center mt-2 text-[20px]'>Mot de passe oublié ?</Link>

      <View className='items-center mt-[5px]'>
        <Text className='text-[20px]'>Pas de compte ? <Link href={'/sign-up'} className='text-primary font-bold'>Creer</Link></Text>
      </View>

      <Text>{message}</Text>
    </View>
  );
};

export default SignIn;
