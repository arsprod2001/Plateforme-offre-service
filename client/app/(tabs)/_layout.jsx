import { Text, View, Image } from 'react-native'
import { Tabs } from 'expo-router'

const IconAccueil = require('../../assets/home.png');
const IconChat = require('../../assets/chat.png');
const IconNotification = require('../../assets/notification.png');
const IconUser = require("../../assets/user.png");
const IconCreate = require("../../assets/plus.png");


const RootLayout = () => {

  return (
    <Tabs
      screenOptions={
        {
          headerShown: false
        }
      }
    >
      
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'ACCUEIL',
          tabBarIcon: ({color, size}) => (
            <Image source={IconAccueil} style={{ width: size, height: size, tintColor: color }} />
          ),
          headerShown: false
        }}
      />


      <Tabs.Screen
        name='(chat)'
        options={{
          title: 'CHAT',
          tabBarIcon: ({color, size}) => (
            <Image source={IconChat} style={{ width: size, height: size, tintColor: color }}/>
          ),
          headerShown: false,
          tabBarBadge: 6
        }}
      />

      <Tabs.Screen
        name='notification'
        options={{
          title: 'NOTIFICATION',
          tabBarIcon: ({color, size}) => (
            <Image source={IconNotification} style={{ width: size, height: size, tintColor: color }}/>
          ),
          headerShown: false,
          tabBarBadge: 6
        }}
      />

      <Tabs.Screen
        name='(profile)'
        options={{
          title: 'PROFILE',
          tabBarIcon: ({color, size}) => (
            <Image source={IconUser} style={{ width: size, height: size, tintColor: color }}/>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );

}

export default RootLayout
