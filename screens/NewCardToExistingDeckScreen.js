import React, {useLayoutEffect, useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import {auth, db} from "../firebase";
const NewCardToExistingDeckScreen = ({route, navigation}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const { deck } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Go back",
        })
    },[navigation])

    const addCart = async function () {

        const cards = deck.cards;
        const newDeckName = deck.name.toString() + "_" + auth.currentUser.uid;
        const docRef = db.collection('decks').doc(newDeckName);

        const newCard = {
            front:front,
            back:back,
            learned: null
        }

        if (cards.length == 0) {


            try {

                const updateTimestamp = docRef.update({
                    cards: [newCard]
                });

                const updatedDeck = {
                    added: deck.added,
                    cards: [newCard],
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible
                }

                console.log("newDeck"+updatedDeck)
                navigation.navigate("MyDeck", {
                    deck: updatedDeck,
                });

            } catch (e) {
                console.log(e)
            }

        }
        else{
            const newCards =  cards.concat([newCard]);
            try {

                const updateTimestamp = docRef.update({
                    cards: newCards
                });

                const updatedDeck = {
                    added: deck.added,
                    cards: newCards,
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible
                }

                console.log("newDeck"+updatedDeck)
                navigation.navigate("MyDeck", {
                    deck: updatedDeck,
                });

            } catch (e) {
                console.log(e)
            }


        }
    }

    return (

        <View
            //style={styles.container}
        >
            <View
                style={styles.containerInput}
            >
                <Input
                    value={front}
                    onChangeText={(value) => setFront(value)}
                    placeholder="Term"
                    autoFocus
                    maxLength = {30}
                    multiline={true}
                    numberOfLines={1}
                />
                <Input
                    value={back}
                    onChangeText={(value) => setBack(value)}
                    placeholder="Definition"

                    maxLength = {300}
                    multiline={true}
                    numberOfLines={1}
                />

            </View>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={addCart}
            >
                <Text  style={styles.text}>Add cart</Text>

            </TouchableOpacity>
        </View>
    );
};

export default NewCardToExistingDeckScreen;

const styles = StyleSheet.create({
        buttonAdd:{
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 60,
            width: 300,
            marginTop: 30,
            height:36,
            borderRadius: 100,
            backgroundColor:"#6C7A89",
        },
        containerInput:{
            marginTop:200,
            padding:10,
            borderRadius: 35,
            backgroundColor:"#A3C6C4",
            margin:5,


        },
        container:{
            flex:1,
            padding:10,
            borderRadius: 35,
            backgroundColor:"#A3C6C4",
            margin:5,
            height:50,

        },
        inputContainer:{
            width: 300,
        },
        text:{
            fontSize: 20,
            // fontWeight: "bold",
        }

    }
)
