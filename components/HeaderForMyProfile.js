import React, {useEffect, useState} from "react";
import {RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {auth} from "firebase";
import {Avatar, Button} from "react-native-elements";
import * as firebase from "firebase";

const HeaderForMyProfile = () => {

    const navigation = useNavigation();
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userImg, setUserImg] = useState('')

    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const checkIfCurrentUserFollow = async () => {
        const user = auth().currentUser;
        console.log(user.displayName);
        setUserName(user.displayName)
        setUserEmail(user.email)
        setUserImg(user.photoURL)
    }
    const aboutUs =  () => {
        navigation.navigate("AboutUs");

    }
    const signOutUser = async function () {

        try {
            await firebase.auth().signOut();
            navigation.replace("Login");
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
        checkIfCurrentUserFollow().then(r => {
        });

    }, [])

    return (

        <View
            //  contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={checkIfCurrentUserFollow}/>
            }
        >


            <View style={styles.container}>
                <Avatar
                    size={"medium"}
                    rounded
                    source={{
                        uri: userImg,
                    }}
                />
                <View>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.username}>{userEmail}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.buttonLogOut}
                onPress={() => signOutUser()}
            >
                <Text style={styles.text}> Log Out </Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonAboutUs}
                onPress={() => aboutUs()}
            >
                <Text style={styles.text}> About us </Text>

            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonLogOut: {
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 60,
        width: 300,
        marginTop: 30,
        height: 36,
        borderRadius: 100,
        backgroundColor: "#A3C6C4",
    },
    buttonAboutUs:{
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 60,
        width: 300,
        marginTop: 30,
        height: 36,
        borderRadius: 100,
        backgroundColor: "white",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    name: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold"
    },
    username: {
        marginTop: 10,
        marginHorizontal: 5,
        color: 'grey',
    },
    img: {
        position: "absolute",
        alignContent: "center",
        display: 'flex',
    },

});


export default HeaderForMyProfile;
