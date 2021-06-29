import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';
import { AuthContext, DataContext, CommandContext, ShowDataOpen, DataStatusContext } from './context'


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

const setTime = () => {
    setVisible(true)
}





const InfoScreen = ({ navigation: { goBack }, route }) => {
    const [Switched, setSwitch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(false)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
    const [isEnabled, setIsEnabled] = useState(false);
    const [debut, setDebut] = useState('10:00');
    const [fin, setFin] = useState('20:00');
    const key = route.params
    const dataStatus = useContext(DataStatusContext)
    return (
        <View style={styles.container}>

            <View>
                <View style={styles.containerTitle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Icon name="arrow-undo-outline" color={'#fff'} size={35} />
                        </TouchableOpacity>
                        <Text style={[styles.titleH1, { fontSize: 24 }]}>  Commande N : {key.id} </Text>
                        <Icon name="ios-information-circle-outline" color={'#fff'} size={35} />

                    </View>
                    <View style={[{ width: "100%" }]}>
                        <Text style={[styles.titleH3, { fontSize: 21, color: '#fff' }]}> Récupération : {key.for_when} </Text>
                    </View>

                </View>
                



                <View style={[{ marginTop: 30, marginHorizontal: 8 }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 3 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                            <Icon name="md-person" color={'#078'} size={30} style={{ margin: 3 }} />
                            <Text style={{ fontSize: 22, color: "#000", fontWeight: 'bold', marginTop: 5 }}>{key.delivery.full_name}</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                                    <Icon name="ios-call" color={'#078'} size={30} style={{ marginHorizontal: 10 }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 3 }}>Appler le Client</Text>
                                        <Text style={[styles.titleH4s, { marginBottom: 7 }]}>{key.delivery.phone}</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {/* <View style={[{ flexDirection: 'column', marginTop: 10, borderRadius: 2 ,width:'90%',alignSelf:'center' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                        <Icon name="ios-add-circle-outline" color={'#078'} size={30} style={{ margin: 10 }} />
                        <Text style={styles.titleH4s}>Nouvelle Commande</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                                <Icon name="ios-create-outline" color={'#078'} size={30} style={{ margin: 10 }} />
                                <Text style={styles.titleH4s}>Pas de Couverts</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
                
                
                
                <View style={{zIndex:3}}>


                    <View style={{ width: '95%', borderWidth: 1, borderColor: '#078', justifyContent: 'center', alignSelf: 'center', marginTop: 40, borderRadius: 15 }}>
                        <View style={{ marginTop: 40 }}></View>

                        <View style={[styles.btnScondary,
                        {
                            backgroundColor: '#078',
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#078',
                            borderWidth: 1,
                            width: '85%',
                            position: "absolute",
                            top: -20,
                            zIndex: 1
                        }]}
                            onPress={() => { setBtn(false) }}

                        >
                            <View >
                                <Text style={[styles.btnTitles, { fontSize: 23, color: '#fff' }]}> Détails de la commande </Text>
                            </View>
                        </View>
                        <View style={{ height: 60, backgroundColor: '#eee', paddingHorizontal: 15, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  borderRadius: 5 ,width:'95%',alignSelf:'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Non disponible</Text>
                            <Text style={{fontSize:19,fontWeight:'bold',}}>{key.delivery_lat} Eur</Text>
                        </View>
                        <View style={{ marginHorizontal: 30, backgroundColor: '#ccc', padding: 10, borderRadius: 6 ,width:'90%',alignSelf:'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sous totale : </Text>
                                <Text style={{fontWeight:'bold'}}> {key.delivery_lat} Eur</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Remise : </Text>
                                <Text style={{fontWeight:'bold'}}> {key.delivery_price} Eur</Text>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Totale : </Text>
                                <Text style={{fontWeight:'bold' ,fontSize:18}}> {key.total} Eur</Text>

                            </View>


                        </View>

                        <View style={{ marginTop: 25 }}></View>



                    </View>

                </View>



                <TouchableOpacity style={[styles.btnScondary, { marginVertical: 10, backgroundColor: '#eee', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#078', borderWidth: 1 }]}
                    onPress={() => { setBtn(false) }}

                >
                    <View >
                        <Text style={[styles.btnTitles, { fontSize: 23 }]}> Imprimer </Text>
                    </View>

                </TouchableOpacity>
                




            </View>




            <ModelContainer
                transparent
                visible={visible}
            >

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.titleH5}>
                        Enter Your Time Here
                    </Text>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={{ height: 40, width: 100, backgroundColor: '#9CA3AF', margin: 20 }}
                        onChangeText={text => setDebut(text)}
                        value={debut}
                    />
                    <TextInput
                        style={{ height: 40, width: 100, backgroundColor: '#9CA3AF', margin: 20 }}
                        onChangeText={text => setFin(text)}
                        value={fin}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                    <Text style={styles.titleH3}>
                        Ajouter
                    </Text>
                </TouchableOpacity>


            </ModelContainer>





        </View>
    )
}
export default InfoScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",


    },
    titleH1: {
        fontSize: 26,
        color: "#fff",
        fontWeight: 'bold',
        marginLeft: 1,

    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    btnScondary: {
        width: '70%',
        height: 45,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    containerTimer: {
        marginTop: 20,

    },
    containerMsg: {
        padding: 10,
        backgroundColor: '#000'
    },

    containerM: {
        padding: 20,
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    containerV: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    containerTitle: {
        backgroundColor: '#087',
        width: "100%",
        height: 120,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    titleH3: {
        fontSize: 24,
        color: "#000",
        padding: 5,
        fontWeight: '700'
    },
    titleH3s: {
        fontSize: 24,
        color: "#fff",
        padding: 5,
        fontWeight: '700'
    },
    titleH2: {
        fontSize: 18,
        color: "#ccc",
        textAlign: 'center',
    },
    titleH4: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',

    },
    titleH4s: {
        fontSize: 19,
        color: "#000",
        fontWeight: 'bold',
    },
    titleH5: {
        fontSize: 23,
        color: "#000",
        textAlign: 'center',
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 11,
    },

    btnTitle: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'

    },
    btnTitles: {
        fontSize: 20,
        color: "#087",
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'

    },

    containerLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 310,
        margin: 10,
    },
    containerLineOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 310,
        margin: 10,
        color: '#087'

    },

    time: {
        fontSize: 25,
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center',


    },

    containerH: {
        alignItems: "center",
        justifyContent: "center",

    },
});

