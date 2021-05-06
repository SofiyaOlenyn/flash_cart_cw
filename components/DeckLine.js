import React, {useEffect, useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import Divider from "react-native-paper";
import {useNavigation} from "@react-navigation/core";
import {auth} from "../firebase";
import {db} from "../firebase";
import firebase from "firebase";
import admin from "firebase";

const DeckLine = ({deck}) => {

        const navigation = useNavigation();
        const [userName, setUserName] = useState("")
        const openDeckScreen = async function () {

            if (deck.user_id_creator != auth.currentUser.uid) {
                navigation.navigate("DeckInSearch", {
                    deck: deck,
                });
            }
        }


        const getUserData = async function () {
            // firebase.initializeApp();
            // await admin.auth().getUser(deck.user_id_creator)
            // console.log(deck.user_id_creator)
            // db.ref('users/' + deck.user_id_creator).once("value", snap => {
            //     console.log(snap.val())
            //     setUserName(snap.val())
            // }).then(r => {})
        }

        useEffect(() => {
            getUserData().then(r => {
            })
            // admin
            //     .auth()
            //     .getRedirectResult(deck.user_id_creator)
            //     .then((userRecord) => {
            //         // See the UserRecord reference doc for the contents of userRecord.
            //          setUserName(userRecord)
            //         console.log(userRecord)
            //     })
            //     .catch((error) => {
            //         // rern  'Error fetching user data:';
            //     });

        }, [])
        return (

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => openDeckScreen()}
                >
                    <Text style={styles.frontText}>{deck.name}</Text>
                    {/*<Text style={styles.frontText}>{JSON.stringify(deck)}</Text>*/}
                    <View style={styles.bottom}>
                        <Text style={styles.text}>
                            {deck.cards.length} cards</Text>

                        <Text style={styles.text}>
                             {(auth.currentUser.uid == deck.user_id_creator) ? " My deck" : ""}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
;

export default DeckLine;

const styles = StyleSheet.create({
        frontText: {
            fontSize: 20,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginBottom: 15,
        },
        text: {
            marginHorizontal: 10,
            marginBottom: 7,
        },
        container: {
            padding: 10,
            borderRadius: 10,
            borderColor: "#A3C6C4",
            borderWidth: 7,
            margin: 5,
            height: 100,
        },
        bottom: {
            flexDirection: 'row',
        }

    }
)
