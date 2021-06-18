import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image} from 'react-native';
import { ListItem } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';



const SettingsScreen = (props) => {
 
      const list = [
        {
          title: "Information sur l'entreprise",
          icon: 'chevron-right'
        },
        {
          title: 'Horraires exceptioenels',
          icon: 'chevron-right'
        },
       
      ]

    return (
      <ScrollView style={styles.container}>
              <View style={styles.containerTitle}>
              <Icon name="settings" color={'#fff'} size={36} />
                <View  style={styles.container1}>
                  <Text style={styles.titleH1}>Paramètres</Text>
                      <Text style={styles.titleH3}>Gérez tout les Paramètres dans cette page</Text>
                </View>
              </View>

              <ListItem style={{marginTop:20 ,marginLeft:10}}  onPress={()=>{props.navigation.navigate('AllCmd')}} bottomDivider >
                  <Icon name="ios-clipboard" color={'#087'} size={34} />
                  <Text style={styles.titleH4}>Paramètre Tout les commandes </Text>
                </ListItem>
                
         
            

              <ListItem style={{marginTop:20 ,marginLeft:10}}  onPress={()=>{props.navigation.navigate('HoraireSetting')}} bottomDivider >
                  <Icon name="alarm" color={'#087'} size={34}/>
                  <Text style={styles.titleH4}>Paramètre les Horaire du travaille</Text>
                </ListItem>
                <ListItem style={{marginTop:20 ,marginLeft:10}}  onPress={()=>{props.navigation.navigate('ExploreScreen')}} bottomDivider >
                  <Icon name="print" color={'#087'} size={34}/>
                  <Text style={styles.titleH4}>Impréssion ticket de commande</Text>
                </ListItem>
                <ListItem style={{marginTop:20 ,marginLeft:10}}  onPress={()=>{props.navigation.navigate('ExploreScreen')}} bottomDivider >
                  <Icon name="md-information-circle" color={'#087'} size={34}/>
                  <Text style={styles.titleH4}>Instruction  !</Text>
                </ListItem>

                <View style={{marginTop:50}}>
                {
                  list.map((item, i) => (
                    <ListItem key={i} bottomDivider >
                      <FontAwesome  name={item.icon} />
                      <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  ))

                }
                
              </View>
        
      </ScrollView>
    );
};

export default SettingsScreen;

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
    height: '100%',
    width: '100%',
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
  fontSize:30,
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
