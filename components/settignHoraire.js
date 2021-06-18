import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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


const HoraireSetting = ({ navigation }) => {
    const [Switched, setSwitch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(false)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
    const [isEnabled, setIsEnabled] = useState(false);



    const [horaireData, setHoraireData] = React.useState({

        day1: {
            id: 1,
            jour: 'dimanche',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        day2: {
            id: 2,
            jour: 'lundi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        day3: {
            id: 3,
            jour: 'mardi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        day4: {
            id: 4,
            jour: 'mercredi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        day5: {
            id: 5,
            jour: 'jeudi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        day6: {
            id: 6,
            jour: 'vendredi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },


    });




    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    const setTime = () => {
        setVisible(true)
    }

    return (
        <View style={styles.container}>
            <View>

                <View style={styles.containerTitle}>

                    <Text style={styles.titleH1}> Paramètre Horaires D'ouverture</Text>

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
                            <Text style={styles.titleH2}> {horaireData.day1.jour}</Text>
                        </View>
                        <View style={styles.containerhours}>

                            <TouchableOpacity onPress={setTime}>
                                <Text style={styles.titleH2}> {horaireData.day1.debutj} To {horaireData.day1.finj}  </Text>
                                <Text style={styles.titleH2}>  {horaireData.day1.debuts} To {horaireData.day1.fins}  </Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={setTime}>
                                <Text style={styles.titleH2}> </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.containerLine}>
                        <View style={styles.containerDay}>
                            <Text style={styles.titleH2}> Lundi</Text>
                        </View>
                        <View style={styles.containerhours}>
                            <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                        </View>
                    </View>
                    <View style={styles.containerLine}>
                        <View style={styles.containerDay}>
                            <Text style={styles.titleH2}> Mardi </Text>
                        </View>
                        <View style={styles.containerhours}>
                            <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                        </View>
                    </View>
                    <View style={styles.containerLine}>
                        <View style={styles.containerDay}>
                            <Text style={styles.titleH2}> Mercredi </Text>
                        </View>
                        <View style={styles.containerhours}>
                            <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                        </View>
                    </View>
                    <View style={styles.containerLine}>
                        <View style={styles.containerDay}>
                            <Text style={styles.titleH2}> Jeudi</Text>
                        </View>
                        <View style={styles.containerhours}>
                            <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                        </View>
                    </View>
                    <View style={styles.containerLine}>
                        <View style={styles.containerDay}>
                            <Text style={styles.titleH2}> Vendredi</Text>
                        </View>
                        <View style={styles.containerhours}>
                            <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                        </View>
                    </View>

                </View>
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
                    // onChangeText={text =>setDay1D(text)}
                    // value={debut}
                    />
                    <TextInput
                        style={{ height: 40, width: 100, backgroundColor: '#9CA3AF', margin: 20 }}
                    // onChangeText={text =>setFin(text)}
                    // value={fin}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                    <Text style={styles.titleH3}>
                        Ajouter
                    </Text>
                </TouchableOpacity>


            </ModelContainer>



            {btn ? (
                <View style={styles.containerMsg}>
                    <View style={styles.containerM} >

                        <Icon name="ios-close-circle" color={'#087'} size={32} style={{ marginTop: 9 }} />

                        <View>
                            <Text style={styles.titleH4}>{msg}</Text>
                            <Text style={styles.titleH2}>{heur} </Text>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.btnTitle}
                        onPress={() => {

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

                </View>) : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",


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

    }, btnScondary: {
        width: '80%',
        height: 45,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
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
        height: 100,
        justifyContent: 'center'
    },
    titleH3: {
        fontSize: 17,
        color: "#fff",
        marginLeft: 13,


    },
    titleH2: {
        fontSize: 17,
        color: "#fff",
        textAlign: 'center',

    },
    titleH4: {
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',

    }, titleH5: {
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
    container1: {
        width: '100%',
        height: 120,
        padding: 10,
    },
    btnTitle: {
        fontSize: 19,
        color: "#087",
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#087',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center'

    },
    containerTow: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000989',
        padding: 10,
        marginHorizontal: 10,
        height: 400,
        margin: 10,
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
    containerH: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    time: {
        fontSize: 25,
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    btn: {
        width: '40%',
        height: 43,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 20

    },
});
export default HoraireSetting;
