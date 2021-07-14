import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'
import TimerLine from './../components/timerLine';
import DoubleClick from 'rn-double-click';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { IconButton, Colors } from 'react-native-paper';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    ScrolViw,

    SafeAreaView

} from 'react-native';

const HomeScreen = ({ navigation, route }) => {
    const donne = useContext(DataContext)
    const myHeaders = new Headers();
    const token = donne.establishment.token
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    //context
    const openData = useContext(ShowDataOpen)

    const { toggleOpen } = React.useContext(AuthContext)
    //  states
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [isEnabled, setIsEnabled] = useState(false);
    // information clients state
    const [dataCmmd, setDataCmd] = useState(['']);
    const [etat, setEtat] = useState([]);
    const [dataStatus, setDataStatus] = React.useState([]);
    const [isComfime, setIsComfime] = useState(false)
    const [ordersMap, setOrder] = React.useState([]);
    const [result, setResult] = React.useState('')
    const [count , setCount] = useState(0)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    useEffect( async() => {

        await commandeListe()
 
     }, [count, count == 0])

     
    // Methodes
    const commandeListe = async () => {
        try {
            await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
                method: 'GET',
                headers: myHeaders,
            })
                .then((res) => res.json())
                .then(dataCmd => {
                    setDataCmd(dataCmd.orders.others)
                    setEtat(dataCmd.orders.others)
                    console.log('commandeListe ', etat)
                    
                    etat.map((i) => {
                        console.log('etat.kitchenstate_id from home //////// ', i.kitchenstate_id)
                    })
                })

        } catch (error) {
            console.log(error)
        }
    }


   

    const Comamnde = async () => {
        await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
            method: 'GET',
            headers: myHeaders,
        })//10029
            .then((res) => res.json())
            .then(dataCmd => {
                setDataCmd(dataCmd.orders.toConfirm)
                console.log(dataCmd.orders.toConfirm)

            })
    }

    const valider = async (id) => {

        try {
            await fetch('https://dev500.live-resto.fr/apiv2e/orders/update', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    "orderId": id,
                    "action": "kitchenstate_id",
                    "kitchenstate_id": 30

                })
            })
                .then(res => res.json())
                .then((response) => {
                    console.log('Token ||||', token)
                    console.log('item.id|||', id)
                    console.log('response||||', response)
                    setResult(response.result)

                })
        } catch (error) {
            console.log(error)
        }
    }

    


    const ContainerOrders = ({ item, id }) => {

        return (

            <View>
                <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
                    <TouchableOpacity style={styles.confirmer}
                        onPress={() => {
                            setCount(count +1)
                            console.log(count)
                            valider(id) //send to cuisine 30 kitchen state id = 40||30
                            navigation.navigate("InfoScreen", { item, token: token ,count })
                             {
                                result && 
                                console.log('id ffffff', id, item.kitchenstate_id)
                                setIsComfime(true)                                
 
                            }

                        }
                        }
                    >
                        <Text style={[styles.titleH3, { fontSize: 18, textAlign: 'center' }]}>

                            <View>
                                {isComfime && item.kitchenstate_id == 40 ?
                                    <Icon name="md-checkmark-circle-outline" color={'#fff'} size={30} style={{ marginTop: 3 }} />
                                    :
                                    <Icon name="md-arrow-forward" color={'#fff'} size={30} style={{ marginTop: 3 }} />}

                            </View>

                        </Text>
                    </TouchableOpacity>

                    <View style={{ width: 110, height: 30, position: 'absolute', zIndex: 2, right: -10, top: -14, backgroundColor: '#087', justifyContent: 'center', borderRadius: 10 }}>
                        <Text style={[styles.titleH3, { fontSize: 20, textAlign: 'center' }]}> #{item.id}</Text>
                    </View>

                    <View style={[styles.containerCommande,]}>
                        <View style={[styles.containerItem, { margin: 10 }]}>
                            <View>
                                <Text style={[styles.titleH4s, { marginTop: 3 }]}> Date  : {item.for_when}</Text>
                                <Text style={[styles.titleH4s, { marginTop: 3 }]}> Prix Totale  : {item.total} Eur</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                                    <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                                    <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10, }}> Aucun livreur n'a encore été trouver</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }

    return (

        <View style={styles.container}>

            <View style={{ backgroundColor: '#000' }}>
                <View style={{}}>
                    <View style={styles.containerTow}>
                        <Text style={styles.titleH1s}> {donne.establishment.title}</Text>
                        <TouchableOpacity style={[{ justifyContent: 'center', alignItems: 'center', padding: 10 }]} onPress={() => {

                            Comamnde()

                        }}>
                            <View>
                                <Icon name="md-restaurant" color={'#087'} size={40} />

                            </View>
                        </TouchableOpacity>

                    </View>

                    {/** btn mode avion */}
                    <View style={styles.containerOne} >
                        {!openData.btn ? (
                            <>
                                <View style={styles.containerOccupe}>
                                    <View style={[styles.Occupe, {}]} >
                                        <View style={styles.preferences}>
                                            <Text style={styles.titleH1}>Mode Occupé</Text>

                                            <Switch
                                                trackColor={{ false: "#ccc", true: "#000" }}
                                                thumbColor={isEnabled ? "#087" : "#000"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                            />

                                        </View>
                                    </View>
                                </View>

                                <View style={styles.containerTimer}>
                                    {isEnabled ? (<TimerLine />

                                    ) : null}
                                </View>
                            </>) : null
                        }
                    </View>


                    {openData.visible ?



                        <FlatList
                            style={{ backgroundColor: '#000' }}
                            data={etat}
                            keyExtractor={item => item.id}
                            renderItem={({ item, id }) => {
                                return (
                                    <ContainerOrders item={item} id={item.id} />
                                )
                            }} />


                        : null}
                </View>
            </View>



            <View>
                {openData.btn ? (

                    <View style={styles.containerTowT}>
                        <View style={styles.containerV}>
                            <Icon name="md-warning" color={'#087'} size={32} style={{ marginVertical: 10 }} />
                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}> Aucune Commande </Text>
                        </View>

                        <Text style={{ color: '#ccc', fontSize: 16 }}> Les Commandes S'affficheront Ici . </Text>

                    </View>

                ) : null}
            </View>


            <View>
                {openData.btn ? (
                    <View style={styles.containerMsg}>
                        <View style={[styles.containerM, { marginHorizontal: 5 }]} >
                            <Icon name="md-information-circle" color={'#087'} size={45} style={{ marginTop: 8, marginLeft: -25 }} />
                            <View>
                                <Text style={[styles.titleH3, { fontWeight: 'bold', }]}>{openData.msg}</Text>
                                <Text style={[styles.titleH3, { fontSize: 17, marginVertical: 3, color: '#ccc' }]}>{openData.heur} </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.btn, { marginVertical: 10, borderRadius: 25 }]} onPress={() => { toggleOpen() }}>
                            <View>
                                <Text style={[styles.titleH3, { fontSize: 23, textAlign: 'center', fontWeight: 'bold', }]}> Ouvrir Maintenent </Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                ) : null

                }

            </View>
            <ModelContainer
                transparent
                visible={visible}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                                source={require('./../assets/x.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('./../assets/sucees.png')}
                        style={{ height: 150, width: 160, marginVertical: 10 }}
                    />
                </View>
                <Text mode={true} style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                    {msg}
                </Text>
            </ModelContainer>
            <ModelContainer
                transparent
                visible={ferme}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setFerme(false)}>
                            <Image
                                source={require('./../assets/x.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('./../assets/x.png')}
                        style={{ height: 150, width: 150, marginVertical: 10 }}
                    />
                </View>
                <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                    {msg}

                </Text>
            </ModelContainer>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: 'center',

        backgroundColor: '#000',

    },
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '600',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: '#fff',
        backgroundColor: '#9CA3AF',
        borderRadius: 26,
        marginTop: 15,
        width: '88%',
        alignSelf: 'center',

    },

    titleH1: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 20,

    },
    titleH1s: {
        fontSize: 30,
        color: "#087",
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,


    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    containerTimer: {
        marginTop: 0,

    },
    containerMsg: {

        position: "absolute",
        bottom: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 15

    },

    containerM: {
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        borderColor: '#fff',
        marginBottom: 5,
        padding: 10,
        width: '100%'


    },

    titleH3: {
        fontSize: 20,
        color: "#fff",


    },
    titleH4: {
        fontSize: 16,
        color: "#000",
        fontWeight: 'bold'


    },
    icon: {
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 11,
    },
    containerCommande: {
        backgroundColor: '#000',
        padding: 10,
        margin: 1,
        justifyContent: 'space-between',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#087',
    },
    titleH4s: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700"


    },

    btn2: {
        width: 85,
        height: 40,
        backgroundColor: '#087',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 10,
        alignSelf: 'center',


    },
    containerItem: {
        paddingTop: 3,
        marginLeft: 8
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    }
    , containerRow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10
    },
    containerTow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center'
    },
    btn3: {
        width: 95,
        height: 45,
        backgroundColor: '#087',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 12,
        alignSelf: 'center',
        padding: 5,
        borderWidth: 0.5,
        borderColor: '#eee',


    },
    confirmer: {
        width: 55,
        height: 35,
        position: 'absolute',
        zIndex: 2,
        left: 35,
        bottom: -15,
        backgroundColor: '#087',
        justifyContent: 'center',
        borderRadius: 5,


    },
    containerTowT: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 150
    },
    containerV: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },


});
export default HomeScreen;





















{/* <ModelContainer style={{ width: '100%', padding: 10 }}
                transparent
                visible={allow}
            >

                <View style={styles.containerRow1}>
                    <View><Text style={styles.titleH1}>Information du client</Text></View>

                    <View>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setAllow(false)}>
                                <Image
                                    source={require('./../assets/x.png')}
                                    style={{ height: 30, width: 30, marginTop: 1 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    {etat.map((item, id) => {
                        return (
                            <>
                                <View item={item.id}>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Numéro Commande :  </Text></View>
                                        <View><Text>{item.origin_id}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Nom client :  </Text></View>
                                        <View><Text>{item.delivery.full_name}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Nombre commades :  </Text></View>
                                        <View><Text>{item.loyalty}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Nom Produit :  </Text></View>
                                        <View><Text>{item.id}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Heure Prepartion : </Text></View>
                                        <View><Text>{item.for_when}</Text></View>
                                    </View>
                                    <View style={{ margin: 8 }}>
                                        <View style={styles.containerRow}>
                                            <View><Text style={styles.titleH4}> Prix : </Text></View>
                                            <View><Text style={styles.titleH4}>{item.delivery_lat} Eur</Text></View>
                                        </View>
                                        <View style={styles.containerRow}>
                                            <View><Text style={styles.titleH4}> Frais Livraison : </Text></View>
                                            <View><Text style={styles.titleH4}>{item.delivery_price} Eur</Text></View>
                                        </View>
                                        <View style={[styles.containerRow, { margin: 1 }]}>
                                            <View><Text style={styles.titleH4}> Totale : </Text></View>
                                            <View><Text style={styles.titleH4}>{item.total} Eur</Text></View>
                                        </View>
                                    </View>



                                </View>
                            </>

                        )
                    })

                    }

                </View>


            </ModelContainer> */}



{/* <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'transparent', position: 'absolute', zIndex: 1, left: -15, top: -15 }}
                                            onPress={() => {
                                                setIdCmd(item.id)
                                                console.log(idCmd, ' id confirmer')
                                                navigation.navigate("EtatCommande", { item, data: idCmd })
                                            }
                                            }
                                        >
                                            <View>
                                                <Icon name="md-information-circle" color={'#087'} size={35} />
                                            </View>
                                        </TouchableOpacity> */}