
import { ActivityIndicator, View, Alert } from "react-native"

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper"
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from "./src/MainTabScreen"
import { DrawerContent } from "./src/DrawerContent"
import SupportScreen from "./src/SupportScreen"
import SettingsScreen from "./src/SettingsScreen"
import ExploreScreen from "./src/ExploreScreen"
import RootStackScreen from "./src/RootStackScreen"
import { AuthContext, DataContext, CommandContext, ShowDataOpen, DataStatusContext } from "./components/context"
import CommandeEcrTScreen from "./src/CommandeTScreen";
import CommandeEcrScreen from "./src/CommandeScreen";
import HoraireScreen from "./src/HoraireScreen";
import FermetureScreen from "./src/FermetureScreen";
import AllCmd from "./components/toutLesCommande";
import HoraireSetting from "./components/settignHoraire"
import HomeScreen from './src/HomeScreen'
import EtatCommande from './src/etatCmd'
import DetailsSetTime from './components/detailshorraire'
import InfoScreen from './components/infoScreen';
const Drawer = createDrawerNavigator()
//7708be4e-5fd2-447b-8fe6-3846b76bbd24

const App = () => {

  const myHeaders = new Headers();
  const token = '8576b257-8e65-4d1b-95c2-47afba421c21'
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [donne, setDonne] = React.useState([]);
  const [openData, setOpenData] = React.useState({

    visible: false,
    ferme: true,
    btn: true,
    heur: "N'oublier pas d'ouvrir a 12:00",
    msg: 'Votre restaurant est fermé',
  });

  const CustomDarkTheme = {
    ...DarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])




  const authContext = React.useMemo(() => ({
    signIn: async(login,password) => {
      if(login!='' && password != ""){
        console.log(login, password, 'nom et password')
          await fetch('https://dev500.live-resto.fr/apiv2e/establishments/authenticate',{
              method:'POST',
              headers:{
                  'accept':'application/json',
                  'Content-type':'application/json'
              },
              body:JSON.stringify({
                  'login':login,
                  'password':password
                })
              })
              .then(res=>{
                if (!res.ok) {
                      alert('failed')
                      throw new Error('Network response was not ok')
                    }
                   return res.json()
              }
                )

              .then(resData=>{
                  console.log( 'resData.establishment.title ||||||||||||| ',resData.establishment.id)
                  console.log( 'resData.establishment.token ||||||||||||| ',resData.establishment.token)
                  setDonne(resData)
                  setUserToken('fgkj')
              })
          }
      },


    signOut: async () => {
      setUserToken(null);
      setIsLoading(false);

    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },

    toggleOpen: () => {
      setOpenData({
        ...openData,
        visible: true,
        ferme: false,
        btn: false,
        heur: 'fermé a 21:00',
        msg: 'Live Resto est ouvert',

      })
    },
    toggleOff: () =>
      setOpenData({
        ...openData,
        visible: false,
        ferme: true,
        btn: true,
        heur: "N'oublier pas d'ouvrir a 12:00",
        msg: 'Votre restaurant est fermé',

      })

  }), []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <DataContext.Provider value={donne}>
          
            <ShowDataOpen.Provider value={openData}>
              <NavigationContainer theme={theme}>
                {userToken !== null ? (
                  <Drawer.Navigator drawerContent={props =>
                    <DrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={MainTabScreen} />
                    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                    <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                    <Drawer.Screen name="EtatCommande" component={EtatCommande} />
                    <Drawer.Screen name="ExploreScreen" component={ExploreScreen} />
                    <Drawer.Screen name="CommandeEcrTScreen" component={CommandeEcrTScreen} />
                    <Drawer.Screen name="CommandeEcrScreen" component={CommandeEcrScreen} />
                    <Drawer.Screen name="HoraireScreen" component={HoraireScreen} />
                    <Drawer.Screen name="FermetureScreen" component={FermetureScreen} />
                    <Drawer.Screen name="AllCmd" component={AllCmd} />
                    <Drawer.Screen name="HoraireSetting" component={HoraireSetting} />
                    <Drawer.Screen name="DetailsSetTime" component={DetailsSetTime} />
                    <Drawer.Screen name="InfoScreen" component={InfoScreen} />
                  </Drawer.Navigator>)
                  :
                  <RootStackScreen />
                }
              </NavigationContainer>
            </ShowDataOpen.Provider>
          
        </DataContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>

  );
};

export default App;

