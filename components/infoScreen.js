import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';

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


const InfoScreen = ({ navigation: { goBack }, route, navigation }) => {

    const { item, token } = route.params
    const [visible, setVisible] = useState(false)
    const [btn, setBtn] = useState(true)
    const [debut, setDebut] = useState('10:00');
    const [fin, setFin] = useState('20:00');
    const [ordersMap, setOrder] = React.useState([]);
    const [result, setResult] = React.useState('')



    const idData = async () => {
        try {
            await fetch('https://dev500.live-resto.fr/apiv2e/orders/details', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    "orderId": item.id
                })
            })
                .then(res => res.json())
                .then((dataStatus) => {

                    setOrder(dataStatus.order.products)
                    console.log(item.id)

                })

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(async () => {

        idData()

    }, [item.id, item.kitchenstate_id])



const num = item.delivery_lat.toFixed(2)


    return (
        <View style={styles.container}>

            <View style={styles.containerTitle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home", { item, token: token })}>
                        <Icon name="arrow-undo-outline" color={'#fff'} size={35} />
                    </TouchableOpacity>
                    <Text style={[styles.titleH1, { fontSize: 24 }]}>  Commande N : {item.id} </Text>
                    <Icon name="ios-information-circle-outline" color={'#fff'} size={35} />
                </View>
                <View style={[{ width: "100%" }]}>
                    <Text style={[styles.titleH3, { fontSize: 19, color: '#fff', width: '100%' }]}> Récupération : {item.for_when} </Text>
                </View>
            </View>

            <View style={{}}>
                <View style={[{ backgroundColor: '#eee', marginTop: 5, paddingVertical: 10, borderRadius: 5, margin: 5, borderWidth: 0.6, borderColor: '#078' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", height: 55, backgroundColor: '#eee', borderRadius: 5 }}>
                                <Icon name="md-person" color={'#078'} size={30} />
                                <Text style={{ fontSize: 20, color: "#000", fontWeight: 'bold', }}>{item.delivery.full_name}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ alignItems: "center", backgroundColor: '#eee', borderRadius: 5, height: 55 }}>
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', }}>Appler le Client</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Icon name="ios-call" color={'#078'} size={20} style={{ margin: 2 }} />
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 16, marginVertical: 2, }}>{item.delivery.phone}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ zIndex: 3 ,paddingVertical:25}}>
                    <View style={{ width: '95%', borderWidth: 1,paddingVertical:25, borderColor: '#078', justifyContent: 'center', alignSelf: 'center', marginTop: 0, borderRadius: 10 }}>



                        {ordersMap.map((i) => {
                            return (
                                <View kye={i => i.id}
                                    style={{ height: 45, backgroundColor: '#eee', paddingHorizontal: 15, marginBottom: 4, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 5, width: '95%', alignSelf: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}> {i._joinData.quantity} × </Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', }}> {i.title} </Text>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#078' }}>{i._joinData.price} </Text>
                                    </View>
                                </View>
                            )
                        })
                        }

                        

                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {/* <TouchableOpacity style={[styles.btnScondary, { width: "40%", marginVertical: 10, backgroundColor: '#eee', borderRadius: 12, justifyContent: "space-evenly", alignItems: 'center', borderColor: '#f00', borderWidth: 1 }]}
                        onPress={() => {

                            { navigation.navigate('Home') }
                        }}>
                        <View >
                            <Text style={[styles.btnTitles, { fontSize: 23, color: '#f00' }]}> Annuler </Text>
                        </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={[styles.btnScondary, { width: "40%", marginVertical: 10, backgroundColor: '#078', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#078', borderWidth: 1 }]}
                        onPress={() => {


                            //if (result ){
                            navigation.navigate("EtatCommande", { item, token: token, id: item.id })
                            // } else {
                            //     alert('erreur valider la commande ')
                            //  }
                        }}
                    >
                        <View  >
                            <Text style={[styles.btnTitles, { fontSize: 23, color: '#fff' }]}>
                                Valider
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

            </View>
            <View style={{position:'absolute',bottom:100,width:"97%",justifyContent:'space-between',paddingHorizontal:15,paddingVertical:10,alignSelf:'center',backgroundColor: '#ccc', borderRadius: 8,borderColor:'#000',borderWidth:0.5}}>
                            <View style={{  }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 16, }}>Sous totale : </Text>
                                    
                                    <Text style={{ fontWeight: 'bold' }}> {num} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 16, }}>Remise : </Text>
                                    <Text style={{ fontWeight: 'bold' }}> {item.delivery_price} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Totale : </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {item.total} € </Text>
                                </View>
                            </View>
                        </View>

            <TouchableOpacity style={[styles.btnScondary, { width: "70%", alignSelf: 'center', marginHorizontal: 10, backgroundColor: '#eee', borderRadius: 12, justifyContent: "space-evenly", alignItems: 'center', borderColor: '#078', borderWidth: 1, marginBottom: 15, position: 'absolute', bottom: 15 }]}
                onPress={() => {
                    setBtn(false)
                    navigation.navigate("infoImpression", { item, token: token, id: item.id })


                }}

            >
                <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                    <Text style={[styles.btnTitles, { fontSize: 23 }]}> Imprimer </Text>
                    <Icon name="ios-print-outline" color={'#078'} size={30} style={{ margin: 0 }} />
                </View>

            </TouchableOpacity>

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
        paddingHorizontal: 10,
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

