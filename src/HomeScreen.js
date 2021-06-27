import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, CommandContext, ShowDataOpen } from './../components/context'
import TimerLine from './../components/timerLine';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    ScrollView
} from 'react-native';




const HomeScreen = ({ navigation, route }) => {

    const myHeaders = new Headers();
    const token = '8576b257-8e65-4d1b-95c2-47afba421c21'
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);



    //context
    const donne = useContext(DataContext)
    const openData = useContext(ShowDataOpen)
    const { signIn, toggleOpen, toggleOff } = React.useContext(AuthContext)





    //  states
    const [Switched, setSwitch] = useState(false)

    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(true)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')


    // const [openData, setOpenData] = React.useState({

    //     visible: false,
    //     ferme: true,
    //     btn: true,
    //     heur: "N'oublier pas d'ouvrir a 12:00",
    //     msg:'Votre restaurant est fermé',
    // });

    const [isEnabled, setIsEnabled] = useState(false);
    const [allow, setAllow] = useState(false);
    // information clients state
    const [dataCmd, setDataCmd] = useState(['']);
    const [idClient, setIdClient] = useState(['']);
    const [nomClient, setNomClient] = useState(['']);
    const [phone, setPhone] = useState(['']);
    const [numCommande, setSumCommande] = useState(['']);
    const [nombreCmmande, setNombreCmmande] = useState(['']);
    const [nomProduit, setNomProduit] = useState(['']);
    const [heurPrepartion, setHeurPrepartion] = useState(['']);
    const [prix, setPrix] = useState(['']);
    const [fraisLaivraison, setFraisLaivraison] = useState(['']);
    const [totale, setTotale] = useState(['']);
    const [etat, setEtat] = useState([]);
    const [status, setStatus] = useState(false);
    const [nameStatus, setNametatus] = useState('Non Valider');
    const [idCmd, setIdCmd] = useState(null);
    const Validation = status ? '#0f0' : '#f00'

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    // functions 

    useEffect(() => {
        fetch('https://dev500.live-resto.fr/apiv2e/orders', {
            method: 'GET',
            headers: myHeaders,
        })//10029
            .then((res) => res.json())
            .then(dataCmd => {
                //console.log(dataCmd)
                setDataCmd(dataCmd.orders.toConfirm)
                console.log(dataCmd.orders.toConfirm)
                console.log(dataCmd)

                setEtat(dataCmd.orders.toConfirm)
                dataCmd.orders.toConfirm.map((i, key) => {
                    setNomClient(dataCmd.orders.toConfirm[i, key].delivery.full_name)
                    setIdClient(dataCmd.orders.toConfirm[i, key].customer_id)
                    setPhone(dataCmd.orders.toConfirm[i, key].delivery.phone)
                    setSumCommande(dataCmd.orders.toConfirm[i, key].origin_id)
                    setPrix(dataCmd.orders.toConfirm[i, key].delivery_lat)
                    setFraisLaivraison(dataCmd.orders.toConfirm[i, key].delivery_price)
                    setTotale(dataCmd.orders.toConfirm[i, key].total)
                    setHeurPrepartion(dataCmd.orders.toConfirm[i, key].for_when)
                    setNombreCmmande(dataCmd.orders.toConfirm[i, key].loyalty)
                    setNomProduit(dataCmd.orders.toConfirm[i, key].id)

                })






                // setCommande(dataCmd.orders.toConfirm[key].delivery.delivery_price)
                //})


                // data.orders.toConfirm.map((i)=>{
                //   alert(data.orders.toConfirm[i].delivery.phone);
                //   alert(data.orders.toConfirm[0].delivery.phone);
                //     setData(data)
                //     setDeliv(i.delivery)

                //  // 


            })
        //.catch(err=>console.log(err))


    }, [])
    // const toggleOpen = () => {

    //     setOpenData({
    //         ...openData,
    //         visible: true,
    //         ferme: false,
    //         btn: false,
    //         heur: 'fermé a 21:00',
    //         msg:'Live Resto est ouvert',

    //     })
    // }
    // const toggleOff = () => 
    // setOpenData({
    //     ...openData,
    //     visible: false,
    //     ferme: true,
    //     btn: true,
    //     heur: "N'oublier pas d'ouvrir a 12:00",
    //     msg:'Votre restaurant est fermé',

    // }

    // );
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
    const setAllow2 = (id) => {

        setAllow(true)
    }

    return (
        <View style={styles.container}>

            <View>
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
                    <View >
                        {etat.map((key) => {
                            console.log(key.id, '1')
                            return (
                                <ScrollView style={{ marginBottom: 0, }}
                                
                                key={key.id}>
                                    <View style={{ margin: 25 }}
                                        
                                    >
                                        <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'transparent', position: 'absolute', zIndex: 1, left: -15, top: -15 }}
                                            onPress={() => { navigation.navigate("InfoScreen", key) }} >
                                            <View>
                                                <Icon name="md-information-circle" color={'#087'} size={35} />
                                            </View>
                                        </TouchableOpacity>



                                        <TouchableOpacity style={{
                                            width: 95,
                                            height: 30,
                                            position: 'absolute',
                                            zIndex: 2,
                                            right: 15,
                                            bottom: -10,
                                            backgroundColor: '#087',
                                            justifyContent: 'center',
                                            borderRadius: 10
                                        }}
                                            onPress={() => {
                                                setIdCmd(key.id)
                                                console.log(idCmd ,' id confirmer' )

                                                navigation.navigate("EtatCommande", { key, data: idCmd })
                                                console.log(idCmd, "console log idCmd")
                                                
                                            }} bottomDivider


                                        >
                                            <View>
                                                <Text style={[styles.titleH3, { fontSize: 18 }]}>Confirmer</Text>
                                            </View>
                                        </TouchableOpacity>



                                        <View style={{ width: 110, height: 30, position: 'absolute', zIndex: 2, right: -10, top: -14, backgroundColor: '#087', justifyContent: 'center', borderRadius: 10 }}>
                                            <Text style={[styles.titleH3, { fontSize: 20 }]}> #{key.id}</Text>
                                        </View>



                                        <View style={[styles.containerCommande,]}>
                                            <View style={[styles.containerItem, { margin: 10 }]}>
                                                <View>
                                                    <View>

                                                        {/* <Text style={[styles.titleH4s, {}]}> Status : <Text style={[styles.titleH4s, { color: Validation }]}> {nameStatus} </Text>  </Text> */}

                                                    </View>

                                                    {/* <Text style={[styles.titleH4s, { marginTop: 3 }]}> Nom Client : {key.delivery.full_name} </Text> */}
                                                </View>
                                                <View>
                                                    <Text style={[styles.titleH4s, { marginTop: 3 }]}> Date  : {key.for_when}</Text>
                                                    <Text style={[styles.titleH4s, { marginTop: 3 }]}> Prix Totale  : {key.total} Eur</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: 3 }}>
                                                        <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                                                        <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}> Aucun livreur n'a encore été trouver</Text>

                                                    </View>


                                                </View>

                                            </View>

                                        </View>

                                    </View>

                                </ScrollView>





                            )
                        })

                        }
                    </View>
                    : null}


            </View>

            {/*  data commande*/}



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

            <ModelContainer style={{ width: '100%', padding: 10 }}
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
                    {etat.map((key, id) => {
                        return (
                            <>
                                <View item={key.id}>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Numéro Commande :  </Text></View>
                                        <View><Text>{key.origin_id}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Nom client :  </Text></View>
                                        <View><Text>{key.delivery.full_name}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Nombre commades :  </Text></View>
                                        <View><Text>{key.loyalty}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Nom Produit :  </Text></View>
                                        <View><Text>{key.id}</Text></View>
                                    </View>
                                    <View style={styles.containerRow}>
                                        <View><Text style={styles.titleH4}> Heure Prepartion : </Text></View>
                                        <View><Text>{key.for_when}</Text></View>
                                    </View>
                                    <View style={{ margin: 8 }}>
                                        <View style={styles.containerRow}>
                                            <View><Text style={styles.titleH4}> Prix : </Text></View>
                                            <View><Text style={styles.titleH4}>{key.delivery_lat} Eur</Text></View>
                                        </View>
                                        <View style={styles.containerRow}>
                                            <View><Text style={styles.titleH4}> Frais Livraison : </Text></View>
                                            <View><Text style={styles.titleH4}>{key.delivery_price} Eur</Text></View>
                                        </View>
                                        <View style={[styles.containerRow, { margin: 1 }]}>
                                            <View><Text style={styles.titleH4}> Totale : </Text></View>
                                            <View><Text style={styles.titleH4}>{key.total} Eur</Text></View>
                                        </View>
                                    </View>



                                </View>
                            </>

                        )
                    })

                    }

                </View>


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
});
export default HomeScreen;












{/* <View style={[styles.containerCommande,{borderColor:'#f00'}]}>
                      <View style={styles.containerItem}>
                          <View>
                              <Text style={styles.titleH4s}> id : {idClient} </Text>
                              <Text style={styles.titleH4s}> nom client : ahmed  </Text>
                          </View>
                          <View>
                              <Text style={styles.titleH4s}> numTel : 0778454786</Text>
                              <Text style={styles.titleH4s}> status : <Text style={[styles.titleH4s,{color:'#f00'}]}>non validé </Text></Text>
                          </View>
                          
                      </View>
                      <View>
                          <TouchableOpacity style={styles.btn2}>
                              <View>
                                  <Text style={styles.titleH3}>Voir </Text>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btn2}>
                              <View>
                                  <Text style={styles.titleH3}> Validé</Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                  </View> */}




