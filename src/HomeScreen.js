import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'
import TimerLine from './../components/timerLine';
import DoubleClick from 'rn-double-click'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    ScrollView,
    FileList,

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
    const [idCmdOrder, setIdCmdOrder] = useState('');
    const [dataStatus, setDataStatus] = React.useState([]);
    const [ordersMap, setOrder] = React.useState([]);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // functions
    useEffect(() => {
        fetch('https://dev500.live-resto.fr/apiv2e/orders', {
            method: 'GET',
            headers: myHeaders,
        })
            .then((res) => res.json())
            .then(dataCmd => {
                setDataCmd(dataCmd.orders.others)
                console.log('data cmmd', dataCmmd)
                setEtat(dataCmd.orders.others)
                console.log('etat ', etat)
            })

    }, [])

    getOrdersStat = async () => {
        await fetch('https://dev500.live-resto.fr/apiv2e/orders/details', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "orderId": idCmdOrder
            })
        })
            .then(res => res.json())
            .then((dataStatus) => {
                console.log(
                    " ///////////////////////////////////////////////////////////////////////////////// msg orders ///////////")
                setDataStatus(dataStatus)
                console.log(dataStatus,
                    " //////////////////////////////////////////////////////////////////////////////////////////////////////// msg orders ///////////")
                setOrder(dataStatus.order.products)
                ordersMap.map(i => {
                    console.log(i.title)
                })

            })
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

    return (

        

        
        <View style={styles.container}>
            <View>
            <ScrollView style={{backgroundColor:'#000'}}>
                <View style={styles.containerTow}>
                    <Text style={styles.titleH1s}> {donne.establishment.title}</Text>
                    <TouchableOpacity style={[{ justifyContent: 'center', alignItems: 'center', padding: 10 }]} onPress={() => Comamnde()}>
                        <View>
                            <Icon name="ios-refresh-circle" color={'#087'} size={40} />

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
                                {isEnabled ? (<TimerLine />) : null}
                            </View>
                        </>) : null
                    }
                </View>
                {openData.visible ?
                    <View>
                        <ScrollView>
                            {etat.map((item) => {
                                return (

                                    <View style={{ marginHorizontal: 15, marginVertical: 20 }} key={item.id}>
                                        <TouchableOpacity style={styles.confirmer}
                                            onPress={() => {
                                                setIdCmdOrder(item.id)
                                                console.log(idCmdOrder, '8888888888888888888888')
                                                navigation.navigate("InfoScreen", { item, ordersMap, dataID: idCmdOrder ,token :token})
                                                getOrdersStat()
                                            }
                                            }
                                        >
                                            <View>
                                                <Text style={[styles.titleH3, { fontSize: 18 }]}>details</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={{ width: 110, height: 30, position: 'absolute', zIndex: 2, right: -10, top: -14, backgroundColor: '#087', justifyContent: 'center', borderRadius: 10 }}>
                                            <Text style={[styles.titleH3, { fontSize: 20 }]}> #{item.id}</Text>
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

                                )
                            })

                            }
                        </ScrollView>
                    

                    

                    </View>
                        
                    : null}
                    </ScrollView>
            </View>
            <View>
                {openData.btn ? (
                    <View style={styles.containerMsg}>
                        <View style={styles.containerM} >
                            <Icon name="md-information-circle" color={'#087'} size={32} style={{ marginTop: 11 }} />
                            <View>
                                <Text style={styles.titleH3}>{openData.msg}</Text>
                                <Text style={styles.titleH3}>{openData.heur} </Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={() => { toggleOpen() }}>
                            <View>
                                <Text style={styles.titleH3}> Get Orders </Text>
                            </View>
                        </TouchableOpacity>


                    </View>) : null

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
        padding: 10,
        backgroundColor: '#000',
        position: 'relative',


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
        fontSize: 28,
        color: "#087",
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 16,


    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    containerTimer: {
        marginTop: 20,

    },
    containerMsg: {
        padding: 10,
        position: "absolute",
        bottom: 15,
        alignSelf: 'center',
    },

    containerM: {
        padding: 20,
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },

    containerBtn: {

    },
    titleH3: {
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
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
        justifyContent: 'space-between',
        width: '98%',
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
        width: 95,
        height: 30,
        position: 'absolute',
        zIndex: 2,
        left: 35,
        bottom: -15,
        backgroundColor: '#087',
        justifyContent: 'center',
        borderRadius: 10
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