import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';


import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from "./SettingsScreen"
import ProfileScreen from './ProfileScreen';
import { View } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#aac840',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Paramétres',
          tabBarColor: '#087',
          tabBarIcon: ({ color }) => (
            <Icon name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#eee',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Acceuil',
            headerLeft: () => (
              <View>
                  <Icon.Button name="ios-menu" color="#000" size={29} backgroundColor="#eee" onPress={() => navigation.toggleDrawer()}></Icon.Button>
              </View>     
          ),
            headerRight:()=>(
            <View style={{flexDirection:'row',marginRight:10}}>
                  <Icon.Button name="ios-search" size={27} color="#333" backgroundColor="#eee"></Icon.Button>
                  <TouchableOpacity style={{paddingHorizontal:10,marginTop:10}} onPress={()=>{navigation.navigate('Profile')}}>
                      <Avatar.Image 
                          source={{
                            uri:"https://media-exp1.licdn.com/dms/image/C4E03AQGuEgvJ413ZNg/profile-displayphoto-shrink_800_800/0/1599644811136?e=1625702400&v=beta&t=NbRy7HBlwn3l59FRtZU292HnDvU4PtPcEjtMKGcBkhI"
                          }}
                          size={36}
                      />
                  </TouchableOpacity>
                
            </View>
            )
            }} />
          </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#aac840',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        headerLeft: () => (
          <View style={{marginLeft:10}}>
               <Icon.Button name="ios-menu" size={25} backgroundColor="#aac840" onPress={() => navigation.openDrawer()}></Icon.Button>
          </View>
           
        ),
      
        }} />
</DetailsStack.Navigator>
);
  