import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from "react-native-elements";
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
    const countScore =  (x) => {
        let correctAmount=0;
        for (let k = 0; k < x.length; k++) {
            if(x[k].learned==true)
            {
                correctAmount++
            }
        }
        let score = correctAmount*100/x.length;
        return score;



    }
    const deleteCard = async function () {

        let cards = deck.cards;
        const newDeckName = deck.deck_id;
        const docRef = db.collection('decks').doc(newDeckName);

        if (cards.length != 1) {
            let i = cards.indexOf(card)
            cards.splice(i, 1)
        } else {
            cards = [];
        }

        try {
            const update = docRef.update({
                cards: cards
            });
            let score = countScore(cards)
            const newDeck = {
                added: deck.added,
                cards: cards,
                name: deck.name,
                user_id: deck.user_id,
                user_id_creator: deck.user_id_creator,
                visible: deck.visible,
                score: score,
                deck_id:deck.deck_id
            }
            navigation.navigate("MyDeck", {
                deck: newDeck,
            });

        } catch (e) {
            console.log(e)
        }

    }
    const editCard = async function () {
        let cards = deck.cards;
        const newDeckName = deck.deck_id;
        const docRef = db.collection('decks').doc(newDeckName);

        const newCard = {
            front: front,
            back: back,
            learned: card.learned,
            box: 1,
            lastSeen:Date.now(),

        }

        if (cards.length == 1) {
            cards = [newCard]
        } else {
            let i = cards.indexOf(card)
            cards.splice(i, 1)
            cards.splice(i, 0, newCard)
        }
        try {
            const update = docRef.update({
                cards: cards
            });
            const updatedDeck = {
                added: deck.added,
                cards: cards,
                name: deck.name,
                user_id: deck.user_id,
                user_id_creator: deck.user_id_creator,
                visible: deck.visible,
                score: deck.score,
                deck_id:deck.deck_id
            }

            console.log("newDeck" + updatedDeck)
            navigation.navigate("MyDeck", {
                deck: updatedDeck,
            });

        } catch (e) {
            console.log(e)
        }


    }


    return (

        <View>
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
        text: {
            fontSize: 20,
        }

    }
)
