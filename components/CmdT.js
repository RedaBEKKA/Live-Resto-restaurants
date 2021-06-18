import React, { useState, useContext ,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';
import TimerLine from './timerLine';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image
    } from 'react-native';


const CmdT = ( {navigation} ) => {
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
        <View style={styles.containerTitle}>
        <View  style={styles.container1}>
        <Text style={styles.titleH1}>Commande Terminer</Text>
            <Text style={styles.titleH3}>Consulter l'hstorique des commandes de ces deux
                derniers jours et effectuer des operaations si besion
            </Text>

        </View>
            

        </View>

        <View style={styles.containerOne} >
            { !btn ? (
                <>
                    <View  style={styles.containerOccupe}>
                        <View style={[styles.Occupe, {}]} >
                                    <View style={styles.preferences}>
                                        <Text style={styles.titleH1}>Mode Occupé</Text>
                                        
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#000" }}
                                            thumbColor={isEnabled ? "#078" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                        
                                    </View>
                        </View> 
                    </View>

                    <View style={styles.containerTimer}>
                        {isEnabled ? (<TimerLine />) : null}
                    </View>
                </> ) :  null 
            }
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

        <View style={styles.containerTow}>
            <View style={styles.containerV}>
                <Icon name="ios-restaurant-outline" color={'#087'} size={32} style={{marginVertical:10 }} />
                <Text style={styles.titleH4}> aucune commande terminer</Text>
            </View>
            
            <Text style={styles.titleH2}> les commandes livrées ou recupérées s'affficheront ici . </Text>
            <TouchableOpacity style={styles.btnScondary} >
                <View >
                    <Text style={styles.btnTitle}> voir les commandes en cours </Text>
                </View>
            </TouchableOpacity>
        </View>

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
        alignContent:'center',
        padding:10,
        backgroundColor:'#000',

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
        fontSize:30,
        color:"#fff",
        fontWeight:'bold',
        marginLeft:20,

    },
    btn:{
        width:'90%',
        height:50,
        backgroundColor:'#087',
        alignSelf:'center',
        justifyContent:'center'

    },btnScondary:{
        width:'80%',
        height:45,
        backgroundColor:'#fff',
        alignSelf:'center',
        justifyContent:'center',
        marginVertical:10,
    },
    containerTimer:{
        marginTop:20,

    },
    containerMsg:{
        padding:10,
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
        width:"110%",
        paddingVertical:10,
        paddingHorizontal:10,
        margin:-8,
        justifyContent:'center',
        alignItems:'center'


    },
    titleH3:{
        fontSize:18,
        color:"#fff",
        
        
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
        color:"#087",
        textAlign:'center',
        fontWeight:'bold',
    },
    containerTow:{
        justifyContent:'center',
        alignItems:'center'
    }
});
export default CmdT;
