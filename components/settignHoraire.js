import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
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
    TextInput,
    ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const HoraireSetting = ({ navigation }) => {
    const [Switched, setSwitch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(false)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
    const [isEnabled, setIsEnabled] = useState(false);
    const [debutj, setDate] = useState(new Date())


    const [horaireData, setHoraireData] = React.useState({

        day: [{
            id: 1,
            jour: 'Dimanche',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 2,
            jour: 'Lundi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 3,
            jour: 'Mardi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 4,
            jour: 'Mercredi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 5,
            jour: 'Jeudi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 6,
            jour: 'Vendredi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '23:00',

        }
        ]

    });

    const DaysList = ({ days }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, margin: 10, backgroundColor: '#eee', paddingHorizontal: 20, width: '90%', alignSelf: 'center' }}>

                <Text style={{ fontSize: 17, fontWeight: 'bold', width: 93, padding: 2, alignSelf: 'center', justifyContent: 'center' }} > {days.jour} </Text>

                <TouchableOpacity 
                    onPress={() => { navigation.navigate('DetailsSetTime', days)}}
                    style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: 80, marginRight: 10 }}>
                        <Text> {days.debutj} |</Text>
                        <Text> {days.finj} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: 80, marginRight: 15 }}>
                        <Text> {days.debuts} |</Text>
                        <Text> {days.fins} </Text>
                    </View>
                    <Icon name="settings" color={'#078'} size={16} />

                </TouchableOpacity>





            </View>

        )
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const setTime = (index) => {
        setVisible(true)
    }

    return (
        <View style={styles.container}>
            <View>

                <View style={[styles.containerTitle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }]}>
                    <Text style={[styles.titleH1, { fontSize: 22 }]}> Paramètre Horaires D'ouverture</Text>
                    <Icon name="settings" color={'#fff'} size={36} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, margin: 10, backgroundColor: '#ccc' }}>

                    <Text style={{ fontSize: 17, fontWeight: 'bold' }} > les jours </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Debut  | </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Fin </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Debut  | </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Fin </Text>
                    </View>
                </View>

                <View >
                    <FlatList
                        data={horaireData.day}
                        renderItem={({ item, index }) => <DaysList days={item} />}
                    />
                </View>
            </View>


            <ModelContainer
                transparent
                visible={visible}
            >

                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.titleH5, { marginBottom: 15 }]}>
                        Choisissez L'heure
                    </Text>

                </View>
                <View style={{ justifyContent: 'center' }}>
                    <DatePicker
                        date={debutj}
                        mode="time"
                        onDateChange={setDate}
                        style={{ alignSelf: 'center', padding: 6 }}
                    />
                </View>
                <TouchableOpacity style={[styles.btnPiker, { alignSelf: 'flex-end' }]} onPress={() => { setVisible(false) }}>
                    <Text style={[{ textAlign: "center", fontSize: 18, fontWeight: 'bold', color: '#fff' }]}>
                        Modifier
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
        padding: 3,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center'
    },

    containerM: {
        padding: 16,
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

        margin: 10,
    },
    containerLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10

    },
    containerLineOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginHorizontal: 10,


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
    btnPiker: {
        width: '40%',
        height: 43,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        borderRadius: 20,
        marginTop: 30,

    },
});
export default HoraireSetting;
