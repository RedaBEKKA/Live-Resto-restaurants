
import { ActivityIndicator, View } from "react-native"

import React, { useContext, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper"
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from "./src/MainTabScreen"
import { DrawerContent } from "./src/DrawerContent"
import SupportScreen from "./src/SupportScreen"
import SettingsScreen from "./src/SettingsScreen"
import ExploreScreen from "./src/ExploreScreen"
import RootStackScreen from "./src/RootStackScreen"
import { AuthContext, DataContext, CommandContext } from "./components/context"
import CommandeEcrTScreen from "./src/CommandeTScreen";
import CommandeEcrScreen from "./src/CommandeScreen";
import HoraireScreen from "./src/HoraireScreen";
import FermetureScreen from "./src/FermetureScreen";
import AllCmd from "./components/toutLesCommande";
import HoraireSetting from "./components/settignHoraire"
import HomeScreen from './src/HomeScreen'

const Drawer = createDrawerNavigator()
//7708be4e-5fd2-447b-8fe6-3846b76bbd24






const App = () => {


  const myHeaders = new Headers();
  const token = '8576b257-8e65-4d1b-95c2-47afba421c21'
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [visible,setVisible]=React.useState(false);
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [donne, setDonne] = React.useState([]);


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
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

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

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  //  useEffect(() => {
  //   fetch('https://dev500.live-resto.fr/apiv2e/orders',{
  //     method: 'GET',
  //     headers: myHeaders,
  //   })//10029
  //   .then((res)=>res.json())
  //   .then(dataCmd=>{
  //console.log(dataCmd)
  //setCmd(dataCmd.orders.toConfirm)
  //console.log(dataCmd)
  //console.log(dataCmd)
  // data.orders.toConfirm.map((i,key)=>{
  //alert(data.orders.toConfirm[key].delivery.full_name)
  // setDeliv(data.orders.toConfirm[key].delivery.delivery_price)
  // })
  // data.orders.toConfirm.map((i)=>{
  //   alert(data.orders.toConfirm[i].delivery.phone);
  //   alert(data.orders.toConfirm[0].delivery.phone);
  //     setData(data)
  //     setDeliv(i.delivery)
  //  // 
  // })
  //   })
  //   .catch(err=>console.log(err))
  // }, [])
  // setDeliv(data.orders.toConfirm[key].delivery.delivery_price)
  // })
  //    data.orders.toConfirm.map((i)=>{
  //    alert(data.orders.toConfirm[i].delivery.phone);
  //    alert(data.orders.toConfirm[0].delivery.phone);
  //     setData(data.orders.toConfirm[i])
  //     setDeliv(i.delivery) 
  //  // 
  // })
  //   })
  //   .catch(err=>console.log(err))
  //     .finally(   
  //       setLoading(false)   
  //       )
  // }, [])

  const authContext = React.useMemo(() => ({
    signIn: async (login, password) => {
      console.log(login, password)
      if (login == 'lalune' && password == "1234") {

        await fetch('https://dev500.live-resto.fr/apiv2e/establishments/authenticate', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'login': login,
            'password': password
          })
        }).then(res => res.json())
          .then((resData) => {
            setDonne(resData)

            console.log(donne)

          }
            //console.log(donne);
            //setMessage(resData.establishment.token)  
            //console.log(data.login,data.password,resData);
            //(resData.establishment.token) 
          )

        setUserToken('fgkj');
        setIsLoading(false);

      } else {


      }




    },
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

    signOut: async () => {
      setUserToken(null);
      setIsLoading(false);
      //   try {
      //     await AsyncStorage.removeItem('userToken');
      //   } catch(e) {
      //     console.log(e);
      //   }
      //   dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },
    toggleOnOff: () => {
      setVisible(visible => !visible);
    },

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
          <NavigationContainer theme={theme}>
            {userToken !== null ? (
              <Drawer.Navigator drawerContent={props =>
                <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={MainTabScreen} />
                <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                <Drawer.Screen name="ExploreScreen" component={ExploreScreen} />
                <Drawer.Screen name="CommandeEcrTScreen" component={CommandeEcrTScreen} />
                <Drawer.Screen name="CommandeEcrScreen" component={CommandeEcrScreen} />
                <Drawer.Screen name="HoraireScreen" component={HoraireScreen} />
                <Drawer.Screen name="FermetureScreen" component={FermetureScreen} />
                <Drawer.Screen name="AllCmd" component={AllCmd} />
                <Drawer.Screen name="HoraireSetting" component={HoraireSetting} />
              </Drawer.Navigator>)
              :
              <RootStackScreen />
            }
          </NavigationContainer>
        </DataContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>

  );
};

export default App;