import React, { useEffect, useState, useContext } from "react"


import { View, StyleSheet } from "react-native"
import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer"
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    ActivityIndicator
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext, DataContext } from "../components/context"


export function DrawerContent(props) {
    const donne = useContext(DataContext)
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext)
    
    const { visible } = React.useContext(DataContext)




    // const [data , setData] = useState([]);
    // const [isLoading , setIsLoading] = useState(true);

    // const dataUrl ='https://dev500.live-resto.fr/apiv2e/establishments/authenticate'
    // useEffect(() => {
    //     fetch (dataUrl)
    //     .then((res) => res.json())
    //     .then((json) => setData(json.establishment))

    //     .catch((error) =>alert(error))
    //     .finally(setIsLoading(false))
    // },[])

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: donne.establishment.img
                                }}
                                size={50}
                            />


                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{donne.establishment.title}</Title>
                                <Caption style={styles.caption}>{donne.establishment.subtitle}</Caption>
                            </View>


                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Acceuil"
                            onPress={() => { props.navigation.navigate('HomeScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="pending"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Commandes en cours"
                            onPress={() => { props.navigation.navigate('CommandeEcrScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="done-all"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Commandes terminé"
                            onPress={() => { props.navigation.navigate('CommandeEcrTScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="watch-later"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Horraire d'ouvertures"
                            onPress={() => { props.navigation.navigate('HoraireScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="calendar-today"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Fermetures exceptionelles"
                            onPress={() => { props.navigation.navigate('FermetureScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="settings"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Paramétres"
                            onPress={() => { props.navigation.navigate('SettingsScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="help"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Aide"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section name="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preferences}>
                                <Text>Pret a recevoir les commandes</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                    <Text style={{ padding: 5, fontWeight: 'bold' }}>
                        Besoin d'aide appellez nous sur 0782205066
                    </Text>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size} />
                    )}
                    label="Se deconnecter"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: '#000'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '600',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: '#fff',
        backgroundColor: '#087',

    },
});
