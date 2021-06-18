import React, { useState, useContext ,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
    } from 'react-native';


const Fermeture = ( {navigation} ) => {
const [Switched,setSwitch] = useState(false)
const [visible,setVisible] = useState(false)
const [ferme,setFerme] = useState(true)
const [btn ,setBtn] = useState(true)
const [msg ,setMsg] = useState('Votre restaurant est fermé')
const [heur ,setHeur] = useState ("N'oublier pas d'ouvrir a 11:00")
const [order, setOrder] = useState (' Orders Comes when Restaurant Is Open')
const [isEnabled, setIsEnabled] = useState(false);
  
const toggleSwitch = () => setIsEnabled(previousState => !previousState);


return (
    <View style={styles.container}>
        <View>
            <View style={styles.containerTitle}>
                <View  style={styles.container1}>
                <Text style={styles.titleH1}>Fermeture Exeptionnelles</Text>
                    <Text style={styles.titleH3}>Pour ajouter modifier vos horaires de Fermeture Exeptionnelles , aller dans les paramertres de votre portail Restaurant 
                    </Text>
                </View>
            </View>
            <View style={styles.containerTow}>
                    <View style={styles.containerLineOne}>
                            <View style={styles.containerDay}>
                                <Text style={styles.titleH5}> Days</Text>
                            </View>
                            <View style={styles.containerhours}>
                                <Text style={styles.titleH5}> Debut  | Fin </Text>
                        </View>
                    </View>
                
                <View style={styles.containerLine}>              
                    <View style={styles.containerDay}>
                        <View>
                        <Image
                                source={require('../assets/calender.png')}
                                style={{height: 120, width: 120, margin:10 , alignSelf:'center'}}
                            />
                        </View>
                        <Text> Aucun jour de fermeture exceptionelles dans votre calendrier</Text>
                        <TouchableOpacity style={styles.btnScondary} 
                            
                            >
                            <View>
                                <Text style={styles.btnTitle}> ajouter une date</Text>
                            </View>   
        
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>

        <ModelContainer
            transparent 
            visible={visible}
        >
            <View style={{alignItems: 'flex-end'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Image
                        source={require('../assets/x.png')}
                        style={{height: 30, width: 30}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        <View style={{alignItems: 'center'}}>
            <Image
                source={require('../assets/sucees.png')}
                style={{height: 150, width: 160, marginVertical: 10}}
            />
        </View>
            <Text mode={true} style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
            {msg} 
            </Text>
        </ModelContainer>

        <ModelContainer
                transparent 
                visible={ferme}
            >
                <View style={{alignItems: 'flex-end'}}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setFerme(false)}>
                            <Image
                                source={require('../assets/x.png')}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            <View style={{alignItems: 'center'}}>
                <Image
                    source={require('../assets/x.png')}
                    style={{height: 150, width: 150, marginVertical: 10}}
                />
            </View>
                <Text  style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
                    {msg} 
                    
                </Text>
    </ModelContainer>

            

        { btn ? ( 
            <View style={styles.containerMsg}>
                <View style={styles.containerM} >
                        
                            <Icon name="md-information-circle" color={'#087'} size={32} style={{marginTop:9 }} />
                        
                        <View>
                            <Text style={styles.titleH4}>{msg}</Text>
                            <Text style={styles.titleH2}>{heur} </Text>
                        </View>
                        
                </View>
                
                    <TouchableOpacity style={styles.btn} 
                        onPress={ () => 
                        {   
                            setVisible(true)
                            setFerme(false)
                            setBtn(false)
                            setMsg(' Live Resto est ouvert')
                            setHeur('fermé a 21:00')
                            setOrder('Waiting For Orders .....')
                        }
                        }
                        name='false'
                        >
                        <View>
                            <Text style={styles.titleH4}> Open Maintenent</Text>
                        </View>   
    
                    </TouchableOpacity>
       
            </View> ) : null }
       
    </View>
) 
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:"space-between",
        

    },
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight:'600',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color:'#fff',
        backgroundColor:'#9CA3AF',
        borderRadius:26,
        marginTop:15,
        width:'88%',
        alignSelf:'center',
        
      },

    titleH1:{
        fontSize:27,
        color:"#fff",
        fontWeight:'bold',
        marginLeft:10,

    },
    btn:{
        width:'90%',
        height:50,
        backgroundColor:'#087',
        alignSelf:'center',
        justifyContent:'center'

    },
    btnScondary:{
        width:'80%',
        height:45,
        backgroundColor:'#000',
        alignSelf:'center',
        justifyContent:'center',
        marginVertical:10,
    },
    containerTimer:{
        marginTop:20,

    },
    containerMsg:{
        paddingVertical:15,
        backgroundColor:'#000',
        margin:10,

    },

    containerM:{
        padding:20,
        flexDirection:"row",
        justifyContent:'space-evenly' 
    },
    containerV:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
    },

    containerTitle:{
        backgroundColor:'#087',
        width:"100%",
        paddingVertical:10,
        paddingHorizontal:10,
        margin:0,
        justifyContent:'center',
        alignItems:'center'


    },
    titleH3:{
        fontSize:17,
        color:"#fff",
        marginLeft:13,
        
        
    },
    titleH2:{
        fontSize:17,
        color:"#fff",
        textAlign:'center',
        
    },
    titleH4:{
        fontSize:20,
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold',
        
    },
    titleH5:{
        fontSize:23,
        color:"#000",
        textAlign:'center',
        fontWeight:'bold',
    },
    icon:{
        fontSize:20,
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold',
        marginTop:11,
    },
    container1:{
        width:380,
        padding:10,
    },
    btnTitle:{
        fontSize:19,
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold',
    },
    containerTow:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000233',
        margin:10,
        

    },
    containerLine:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:310,
        margin:10,
    },
    containerLineOne:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:310,
        margin:10,
        color:'#087'

    }
});
export default Fermeture;
