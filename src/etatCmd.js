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


const EtatCommande = ({ navigation: { goBack }, route }) => {

    const key = route.params
    return (

        <View>
            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon name="arrow-undo-outline" color={'#fff'} size={35} />
                </TouchableOpacity>

                <Text style={{ color: '#fff', fontSize: 21, fontWeight: 'bold' }}>
                    Etat du Commande #{key.id}
                </Text>
                <Icon name="ios-information-circle" color={'#fff'} size={40} />

            </View>

            <View >

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#078', padding: 10 }}>
                        <View>
                            <Icon name="ios-timer" color={'#087'} size={80} />
                        </View>
                        <View >
                            <View style={{ justifyContent: 'center', paddingTop: 10 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', width: '90%' }}>La commande est en attente</Text>
                                <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16, width: '80%' }}>Appoyer sur le button pour passer a la cuisine</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity >
                        <View style={{ backgroundColor: '#087', height: 45, width: '70%', alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={{ color: '#fff', fontSize: 21, fontWeight: 'bold', marginHorizontal: 15 }}>
                                    Passer a la cuisine

                                </Text>


                                <Icon name="md-arrow-down" color={'#fff'} size={25} />



                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#078', padding: 10 }}>
                        <View>
                            <Icon name="ios-restaurant-outline" color={'#087'} size={80} style={{ padding: 1, marginLeft: 3 }} />
                        </View>
                        <View >
                            <View style={{ justifyContent: 'center', paddingTop: 10, marginHorizontal: 5 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', width: '70%' }}>La commande est en Prépartion</Text>
                                <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16, width: '70%', marginLeft: 5 }}>Appoyer sur le button pour met la commande comme prète</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#087', height: 45, width: '70%', alignSelf: 'center', borderRadius: 10, alignItems: 'center', }}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15 }}>
                                prête a livrer

                            </Text>
                            <Icon name="ios-checkmark-circle" color={'#fff'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#078', padding: 10 }}>
                        <View>
                            <Icon name="ios-checkmark-circle" color={'#087'} size={80} />
                        </View>
                        <View >
                            <View style={{ justifyContent: 'center', paddingTop: 10 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', width: '70%' }}>Votre commande est prête a livrer</Text>
                                <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16, width: '70%' }}>Appoyer sur le button pour passer a un livreur</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity >
                        <View style={{ backgroundColor: '#ccc', height: 45, width: '60%', alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 60 }}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                Livrer
                            </Text>
                            <Icon name="ios-send-outline" color={'#000'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>




            </View>
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










