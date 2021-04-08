import React, {useEffect, useLayoutEffect, useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import {auth, db} from "../firebase";

const EditCardInMyScreen = ({route, navigation}) => {
    const {card} = route.params;
    const {deck} = route.params;
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [learned, setLearned] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Go back",
        })
    }, [navigation])

    useEffect(() => {
        console.log("Card  " + JSON.stringify(card))
        console.log(JSON.stringify(deck))
        setFront(card.front)
        setBack(card.back)
        setLearned(card.learned)
    }, [])

    const deleteCard = async function () {

        const cards = deck.cards;
        const newDeckName = deck.name.toString() + "_" + auth.currentUser.uid;
        const docRef = db.collection('decks').doc(newDeckName);

        if (cards.length == 1) {

            try {

                const updateTimestamp = docRef.update({
                    cards: []
                });

                const newDeck = {
                    added: deck.added,
                    cards: [],
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible
                }

                // console.log("newDeck"+newDeck)
                navigation.navigate("MyDeck", {
                    deck: newDeck,
                });

            } catch (e) {
                console.log(e)
            }

        } else {
            let i = cards.indexOf(card)
            const newCards = cards.splice(i, 1)

            try {

                const updateTimestamp = docRef.update({
                    cards: newCards
                });

                const newDeck = {
                    added: deck.added,
                    cards: cards,
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible
                }

                // console.log("newCards"+JSON.stringify(newCards))
                // console.log("cards"+JSON.stringify(cards))
                navigation.navigate("MyDeck", {
                    deck: newDeck,
                });
            } catch (e) {
                console.log(e)
            }

        }

    }
    const editCard = async function () {
        const cards = deck.cards;
        const newDeckName = deck.name.toString() + "_" + auth.currentUser.uid;
        const docRef = db.collection('decks').doc(newDeckName);

        const newCard = {
            front:front,
            back:back,
            learned: card.learned
        }

        if (cards.length == 1) {


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

        } else {
            let i = cards.indexOf(card)

            cards.splice(i, 1)
            cards.splice(i, 0, newCard)

            try {

                const updateTimestamp = docRef.update({
                    cards: cards
                });

                const newDeck = {
                    added: deck.added,
                    cards: cards,
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible
                }

                console.log("newCards"+JSON.stringify(newDeck))
                console.log("cards"+JSON.stringify(cards))
                navigation.navigate("MyDeck", {
                    deck: newDeck,
                });
            } catch (e) {
                console.log(e)
            }

        }


    }


    // const addCart = async function () {
    //     try {
    //         //newCard console.log("Cards:"+JSON.stringify(cards));
    //         const item = {
    //             front: front,
    //             back: back,
    //             learned:null,
    //         }
    //         let  newCards = null;
    //         if(cards== null || cards.length==0) {
    //             newCards = [item];
    //             console.log(cards.length)
    //         }
    //         else{
    //
    //             newCards =
    //
    //                 cards.concat(item);
    //
    //         }
    //
    //         //   console.log("Cards:"+navigation.objectValue());
    //         //  console.log("newCards:"+JSON.stringify(newCards));
    //         // console.log(newCards);
    //         navigation.navigate("NewDeck",{
    //             newCard :newCards,
    //         });
    //
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
                    maxLength={30}
                    multiline={true}
                    numberOfLines={1}
                />
                <Input
                    value={back}
                    onChangeText={(value) => setBack(value)}
                    placeholder="Definition"

                    maxLength={300}
                    multiline={true}
                    numberOfLines={1}
                />

            </View>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => editCard()}
            >
                <Text style={styles.text}>Edit</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => deleteCard()}
            >
                <Text style={styles.text}>Delete</Text>

            </TouchableOpacity>

        </View>
    );
};

export default EditCardInMyScreen;

const styles = StyleSheet.create({
        buttonAdd: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 60,
            width: 300,
            marginTop: 30,
            height: 36,
            borderRadius: 100,
            backgroundColor: "#6C7A89",
        },
        containerInput: {
            marginTop: 200,
            padding: 10,
            borderRadius: 35,
            backgroundColor: "#A3C6C4",
            margin: 5,


        },
        container: {
            flex: 1,
            padding: 10,
            borderRadius: 35,
            backgroundColor: "#A3C6C4",
            margin: 5,
            height: 50,

        },
        inputContainer: {
            width: 300,
        },
        text: {
            fontSize: 20,
            // fontWeight: "bold",
        }

    }
)
