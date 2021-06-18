import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image} from 'react-native';
import HTML from "react-native-render-html"
import { ListItem } from 'react-native-elements'
import { Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

const AllCmd = () => {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.containerTitle}>
              <Icon name="settings" color={'#fff'} size={36} />
                <View  style={styles.container1}>
                  <Text style={styles.titleH1}>Toutes les commandes</Text>
                      <Text style={styles.titleH3}>Gérez tout les Paramètres dans cette page</Text>
                </View>
              </View>
              
              
              <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={require('../assets/cmd1.png')}
                    resizeMode="cover"
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Afficher toutes les commandes</Text>
                  
                  <Text style={styles.cardDetails}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde.
                  </Text>
                        <Button style={{marginTop:8}} icon="play" color="#5dbca3" mode="contained" onPress={() => console.log('Pressed')}>
                          Commencer
                        </Button>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={require('../assets/cmd4.png')}
                    resizeMode="cover"
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Afficher toutes les commandes en attents</Text>
                  
                  <Text style={styles.cardDetails}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde.
                  </Text>
                        <Button style={{marginTop:8}} icon="play" color="#5dbca3" mode="contained" onPress={() => console.log('Pressed')}>
                          Commencer
                        </Button>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={require('../assets/cmd3.png')}
                    resizeMode="cover"
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Afficher toutes les commandes annuler</Text>
                  
                  <Text style={styles.cardDetails}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde.
                  </Text>
                        <Button style={{marginTop:8}} icon="play" color="#5dbca3" mode="contained" onPress={() => console.log('Pressed')}>
                          Commencer
                        </Button>
                </View>
              </View>
      

              <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={require('../assets/success1.png')}
                    resizeMode="cover"
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Afficher les commandes dilivré</Text>
                  
                  <Text style={styles.cardDetails}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde.
                  </Text>
                  <Button style={{marginTop:8}} icon="play" color="#5dbca3" mode="contained" onPress={() => console.log('Pressed')}>
                  Commencer
                </Button>
                </View>
              </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
     
    },
    card: {
      height: 120,
      marginVertical: 10,
      flexDirection: 'row',
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      marginTop:25,
      elevation: 5,
    },
    cardImgWrapper: {
      flex: 1,
      padding:1,
      
    },
    cardImg: {
      height: '90%',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 8,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      padding:15,
    },
    cardInfo: {
      flex: 2,
      padding: 15,
      borderColor: '#ccc',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: '#fff',
    },
    cardTitle: {
      fontWeight: 'bold',
    },
    cardDetails: {
      fontSize: 12,
      color: '#444',
    },
    containerTitle:{
      backgroundColor:'#087',
      width:"100%",
      paddingVertical:10,
      paddingHorizontal:23,
      
      alignItems:'center',
      flexDirection:'row-reverse',
      justifyContent:'space-between'
  
  
  },
  container1:{
    marginVertical:20,
  },
  titleH1:{
    fontSize:28,
    color:"#fff",
    fontWeight:'bold',
    marginLeft:5,
  
  },
  titleH3:{
    fontSize:13,
    color:"#fff", 
    marginLeft:10,
  },
  titleH4:{
    fontSize:20,
    color:"#000",
    textAlign:'center',
    fontWeight:'bold',
    
  },
  });
export default AllCmd;