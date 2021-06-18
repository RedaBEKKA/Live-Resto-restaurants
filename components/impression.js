import React, { useState, useContext ,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';

import ModeleOpen from './model'
import ModeleClosed from './modelClosed';
import ModelContainer from './ModelContainer';
import CountDownTime from './countDown';
import TimerLine from './timerLine';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    TextInput
    } from 'react-native';


const Impression = ( props ) => {
const [Switched,setSwitch] = useState(false)
const [visible,setVisible] = useState(false)
const [ferme,setFerme] = useState(false)
const [btn ,setBtn] = useState(true)
const [msg ,setMsg] = useState('Votre restaurant est fermé')
const [heur ,setHeur] = useState ("N'oublier pas d'ouvrir a 11:00")
const [order, setOrder] = useState (' Orders Comes when Restaurant Is Open')
const [isEnabled, setIsEnabled] = useState(false);
const [debut, setDebut] = useState('10:00');
const [fin, setFin] = useState('20:00');



const toggleSwitch = () => setIsEnabled(previousState => !previousState);



const setTime = ()=>{
    setVisible(true)
}

return (
    <View style={styles.container}>
        <View>
            <View style={styles.containerTitle}>
                <View><Icon name="print" color={'#fff'} size={36} /></View>
                    <View><Text style={styles.titleH1}> Impression des tickets </Text></View>
                    </View>
        
            <View style={styles.containerTow}> 
                <View style={styles.containerH}>
                    <Text style={styles.titleH3}>Choisissez Le Nombre De Tickets Que Vous Voulez Imprimer ! </Text>
                </View>  
                <View style={styles.containerRow}>
                    <View style={{width:320 ,height:50}}>
                        <Text style={styles.titleH4s}>Quand Jaccepte Une Nouvelle Commande</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Icon name="ios-add-circle" color={'#078'} size={36} />
                        </TouchableOpacity>
                    </View>
                </View>   
                <View style={styles.containerRow}>
                    <View style={{width:320 ,height:50}}>
                        <Text style={styles.titleH4s}>Quand Je Refuse Une Nouvelle Commande</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Icon name="ios-add-circle" color={'#078'} size={36} />
                        </TouchableOpacity>
                        
                    </View>
                </View>   
            </View>
            <TouchableOpacity style={styles.btnScondary} 
                        onPress={ () => {setBtn(false)}}

                        >
                        <View style={styles.containerH}  >
                            <Text style={styles.btnTitles}> Imprimer </Text>
                        </View>   
    
                    </TouchableOpacity>
        </View>
     
      <ModelContainer
                transparent 
                visible={visible}
            >
                
            <View style={{alignItems: 'center'}}>
            <Text  style={styles.titleH5}>
                        Enter Your Time Here   
                </Text>
                
            </View>
            <View style={{flexDirection:'row'}}>
            <TextInput
                    style={{height: 40, width: 100,backgroundColor:'#9CA3AF', margin: 20}}
                    onChangeText={text =>setDebut(text)}
                    value={debut}
                />
                <TextInput
                style={{height: 40, width: 100,backgroundColor:'#9CA3AF', margin: 20}}
                onChangeText={text =>setFin(text)}
                value={fin}
            />
            </View>
                <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                    <Text  style={styles.titleH3}>
                      Ajouter 
                    </Text>
                </TouchableOpacity>
            
                
    </ModelContainer>
        
        

        { btn ? ( 
            <View style={styles.containerMsg}>
                <View style={styles.containerM} >
                        
                            <Icon name="md-information-circle" color={'#087'} size={32} style={{marginTop:9 }} />
                        
                        <View>
                            <Text style={styles.titleH3s}>{msg}</Text>
                            <Text style={styles.titleH2}>{heur} </Text>
                        </View>
                        
                </View>
                
                    <TouchableOpacity style={styles.btn} 
                        onPress={ () => {setBtn(false)}}

                        >
                        <View style={styles.containerH}  >
                            <Text style={styles.btnTitle}> Open Maintenent</Text>
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
    titleH1:{
        fontSize:26,
        color:"#fff",
        fontWeight:'bold',
        marginLeft:1,

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
        backgroundColor:'#ccc',
        alignSelf:'center',
        justifyContent:'center',
        marginVertical:10,
    },
    containerTimer:{
        marginTop:20,

    },
    containerMsg:{
        padding:10,
        backgroundColor:'#000'
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
        height:100,
        alignItems:'center',
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:23,
        
    },
    titleH3:{
        fontSize:24,
        color:"#000",
        padding:5,
        fontWeight:'700'    
    },
    titleH3s:{
        fontSize:24,
        color:"#fff",
        padding:5,
        fontWeight:'700' 
    },
    titleH2:{
        fontSize:18,
        color:"#ccc",
        textAlign:'center',  
    },
    titleH4:{
        fontSize:18,
        color:"#fff",
        fontWeight:'bold',
        
    },
    titleH4s:{
        fontSize:19,
        color:"#000",
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
   
    btnTitle:{
        fontSize:20,
        color:"#fff",
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center'

    },
    btnTitles:{
        fontSize:20,
        color:"#087",
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center'

    },
    containerTow:{
        
        backgroundColor:'#fff',
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

    },
    
      time: {
        fontSize: 25,
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
      },
      btn:{
          width:'90%',
          height:50,
          backgroundColor:'#087',
          alignSelf:'center',
          justifyContent:'center',
          
    
      },
      containerRow:{
          flexDirection:'row',
          width:'100%',
          height:60,
          justifyContent:"space-between",
          padding:10,
          alignItems:'center',
          marginVertical:10
      },
      containerH: {
        alignItems: "center",
        justifyContent: "center",
        
      },
});
export default Impression;
