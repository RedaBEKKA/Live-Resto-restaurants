import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, CommandContext, ShowDataOpen } from './../components/context'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    ScrollView
} from 'react-native';


const EtatCommande = ({ navigation: { goBack }, route, navigation }) => {
    // useEffect(()=>{
    //         setTimeout( () => {
    //            navigation.navigate('Home')
    //         },100000);

    // })

    const [active, setActive] = React.useState({

        check_Active: true,
        check_ActiveCuisine: false,
        check_ActiveLivreur: false,

        Btn1: true,
        btn2: false,
        btn3: false,
    });


    const colorActive = active.tcheck_Active || active.check_ActiveCuisine ? '#087' : '#ccc'
    const colorTextActive = active.check_Active || active.check_ActiveCuisine ? '#000' : '#ccc'
    const backgroundActive = active.check_Active || active.check_ActiveCuisine ? '#087' : '#ccc'

    const colorActiveLivreur = active.check_ActiveLivreur ? '#087' : '#ccc'
    const colorTextActiveLivreur = active.check_ActiveLivreur ? '#000' : '#ccc'





    const { key, data } = route.params

    return (

        <View>
            <View>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon name="arrow-undo-outline" color={'#fff'} size={35} />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 21, fontWeight: 'bold' }}>
                        Etat du Commande # {key.id}
                    </Text>
                    <Icon name="ios-information-circle" color={'#fff'} size={40} />

                </View>


                <View >

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                            marginVertical: 12,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: colorActive,
                            padding: 10
                        }}>
                            <View>
                                <Icon name="ios-timer" color={backgroundActive} size={80} />
                            </View>
                            <View >
                                <View style={{ justifyContent: 'center', paddingTop: 10 }}>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        width: '90%',
                                        color: colorTextActive
                                    }}>La commande est en attente</Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#ccc',
                                        fontSize: 16,
                                        width: '80%'
                                    }}>Appoyer sur le button pour passer a la cuisine</Text>
                                </View>
                            </View>
                        </View>


                        {key.id == data ?

                            
                            <TouchableOpacity onPress={() => {
                                //console.log(etat.id)
                                console.log(data, ' id confirmer screen etat')
                                console.log(key.id, ' id passer a la cuisine')
                                setActive({
                                    check_Active: false,
                                    check_ActiveCuisine: true,
                                    check_ActiveLivreur: false,
                                    Btn1: false,
                                    btn2: true,
                                    btn3: false,
                                })
                            }
                            
                        }>

                                <View style={{
                                    backgroundColor: backgroundActive,
                                    height: 45,
                                    width: '70%',
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>

                                        <Text style={{
                                            color: colorTextActive,
                                            fontSize: 21, fontWeight: 'bold',
                                            marginHorizontal: 15
                                        }}>
                                            Passer a la cuisine

                                        </Text>
                                        <Icon name="md-arrow-down" color={colorTextActive} size={25} />
                                    </View>
                                </View>
                            </TouchableOpacity>



                                :
                                null
                                    
                                    
                                    }




                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: colorActive, padding: 10 }}>
                            <View>
                                <Icon name="ios-restaurant-outline" color={colorActive} size={80} style={{ padding: 1, marginLeft: 3 }} />
                            </View>
                            <View >
                                <View style={{ justifyContent: 'center', paddingTop: 10, marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', width: '70%', color: colorTextActive }}>La commande est en Prépartion</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16, width: '70%', marginLeft: 5 }}>Appoyer sur le button pour met la commande comme prète</Text>
                                </View>
                            </View>
                        </View>
                        {active.btn2 ?
                            <TouchableOpacity onPress={() => {

                                setActive({

                                    check_Active: false,
                                    check_ActiveCuisine: false,
                                    check_ActiveLivreur: true,
                                    Btn1: false,
                                    btn2: false,
                                    btn3: true,
                                })



                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: backgroundActive, height: 45, width: '70%', alignSelf: 'center', borderRadius: 10, alignItems: 'center', }}>
                                    <Text style={{ color: colorTextActive, fontSize: 20, fontWeight: 'bold', marginHorizontal: 15 }}>
                                        prête a livrer

                                    </Text>
                                    <Icon name="ios-checkmark-circle" color={colorTextActive} size={25} />
                                </View>
                            </TouchableOpacity> : null}

                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colorActiveLivreur, padding: 10 }}>
                            <View>
                                <Icon name="ios-checkmark-circle" color={colorActiveLivreur} size={80} />
                            </View>
                            <View >
                                <View style={{ justifyContent: 'center', paddingTop: 10 }}>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', width: '70%', color: colorTextActiveLivreur }}>Votre commande est prête a livrer</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16, width: '70%' }}>Appoyer sur le button pour passer a un livreur</Text>
                                </View>
                            </View>
                        </View>

                        {active.btn3 ?
                            <TouchableOpacity >
                                <View style={{ backgroundColor: colorActiveLivreur, height: 45, width: '60%', alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 60 }}>
                                    <Text style={{ color: colorTextActiveLivreur, fontSize: 20, fontWeight: 'bold' }}>
                                        Livrer
                                    </Text>
                                    <Icon name="ios-send-outline" color={colorTextActiveLivreur} size={25} />
                                </View>
                            </TouchableOpacity> : null}

                    </View>




                </View>

            </View>
            <TouchableOpacity style={{ position: 'absolute', right: -11, bottom: -125, marginHorizontal: 20, height: 50, width: 50, backgroundColor: '#fff', borderColor: '#078', borderWidth: 1, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => { navigation.navigate('Home') }}
            >
                <View >
                    <Icon name="ios-home" color={'#078'} size={32} />
                </View>
            </TouchableOpacity>
        </View >


    )
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#087',
        height: 80,
        paddingHorizontal: 10

    }
});
export default EtatCommande;










