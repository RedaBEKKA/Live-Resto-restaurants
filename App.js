
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
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [message, setMessage] = React.useState("");

  const [donne, setDonne] = React.useState([]);
  const [tokenResto, setTokenResto] = React.useState(null)
  const [statusDonne, setStatusDonne] = React.useState('failed')


  const [dataStatus, setDataStatus] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [nomClient, setNomClient] = React.useState(['']);
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

  useEffect(() => {
    fetch('https://dev500.live-resto.fr/apiv2e/orders/details', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "orderId": 55593
      })
    })
      .then(res => res.json())
      .then((dataStatus) => {
        console.log(dataStatus,
          " //////////////////////////////////////////////////////////////////////////////////////////////////////// msg orders ///////////")
        setDataStatus(dataStatus)
        console.log(dataStatus,
          " //////////////////////////////////////////////////////////////////////////////////////////////////////// msg orders ///////////")
        dataStatus.order.products.map(i => {
          console.log(i.title)
        })
        console.log("msg hellooo")
      })

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
                  //console.log(data.login,data.password,resData);
                  //setMessage(resData.establishment.token)


                  
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
          <DataStatusContext.Provider value={dataStatus}>
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
          </DataStatusContext.Provider>
        </DataContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>

  );
};

export default App;






        // console.log(resData, 'resultttttttttttttttt')
        // if (res.ok) {
        //   alert('success')
        //   // setDataStatus("success")
        //   // setDonne(resData)
        //   // console.log(donne, 'donner resto :')
        //   //console.log(donne.establishment.token, 'token resto :')
        //   //setTokenResto(donne.establishment.token)

        // } else {
        //   // setDataStatus("success")
        //   // setDonne(resData)
        //   // console.log(donne.establishment.token, 'token resto :')
        //   alert('failed')

        // }



      // }
      // else {
      //   alert('nom et mot de passe vide')
      // }


          //.then((res) => JSON.stringify(res))
          // .then(res => {
          //   // if (!res.ok) {
          //   //   alert('failed')
          //   //   throw new Error('Network response was not ok')
          //   // }
          //   res.json()
            


          // })
          // .then((resData) => {
          //   alert('success')
          //   console.log(resData.establishment, 'resData resto :')
          //   setDonne(resData)

          // })


          // .then((res) => JSON.stringify(res))
          // .then((resData) => {
          //   alert('success')
          //   console.log('resData :',resData )
          //   setDonne(resData)

          // })
          // .catch(res => {
          //   if (!res.ok) {
          //     alert('failed')
          //     throw new Error('Network response was not ok')
          //   } 
          // })


          // .then((resData) => {

          //   alert('success')
          //   console.log(resData, 'resData resto :')
          //   setDonne(resData)
          //   //console.log(donne, 'donner resto :')
          // }

          // )

          //setUserToken('fgkj');












// signIn: async (login, password) => {
      // if (login !== "" && password !== '') {

      //   console.log(login, password, 'nom et password')

      //   await fetch('https://dev500.live-resto.fr/apiv2e/establishments/authenticate', {
      //     method: 'POST',
      //     headers: {
      //       'accept': 'application/json',
      //       'Content-type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       'login': login,
      //       'password': password
      //     })
      //   })































































































 // const userToken = String(foundUser[0].userToken);
    // const userName = foundUser[0].username;

    // try {
    //   await AsyncStorage.setItem('userToken', userToken);
    // } catch(e) {
    //   console.log(e);
    // }
    // // console.log('user token: ', userToken);
    // dispatch({ type: 'LOGIN', id: userName, token: userToken });
    // }  
    //   Comamnde : async () => {
    //     await fetch('https://dev500.live-resto.fr/apiv2e/orders',{
    //    method: 'GET',
    //    headers: myHeaders,
    //  })//10029
    //  .then((res)=>res.json())
    //  .then(dataCmd=>{
    //    setDataCmd(dataCmd.orders.toConfirm) 
    //    console.log(dataCmd.orders.toConfirm)

    //})  
    //} ,  


    //   try {
      //     await AsyncStorage.removeItem('userToken');
      //   } catch(e) {
      //     console.log(e);
      //   }
      //   dispatch({ type: 'LOGOUT' });

       //console.log(donne);
            //setMessage(resData.establishment.token)  
            //console.log(data.login,data.password,resData);
            //(resData.establishment.token) 




            // fetch('https://dev500.live-resto.fr/apiv2e/orders/details', {

  // method: 'POST',

  // body:JSON.stringify ({
  //   "orderId": 55593,
  //   headers: {myHeaders }})

  //   .then((res) => res.json())
  //   .then(dataStatus => {
  //     setDataStatus(dataStatus)
  //     console.log(dataStatus,'555555')
  //   })
  // })
  //   .catch(err => console.log(err))


  // const initialLoginState = {
  //   isLoading: true,
  //   login: null,
  //   userToken: null,
  // };

  // const loginReducer = (prevState, action) => {
  //   switch( action.type ) {
  //     case 'RETRIEVE_TOKEN': 
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGIN': 
  //       return {
  //         ...prevState,
  //         login: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGOUT': 
  //       return {
  //         ...prevState,
  //         login: null,
  //         userToken: null,
  //         isLoading: false,
  //       };
  //     case 'REGISTER': 
  //       return {
  //         ...prevState,
  //         login: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //   }
  // };
