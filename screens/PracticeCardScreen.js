import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {auth, db} from "../firebase";


const PracticeCardScreen = ({route, navigation}) => {

    const {deck} = route.params;
    const {cardsData} = route.params;
    const {learnAll} = route.params;
    const [cards, setCards] = useState([]);
    const [text, setText] = useState("");
    const [front, setFront] = useState(true);
    const [i, setI] = useState(0);


    const flipCart = async () => {
        if (front) {
            setText(cardsData[i].back)
            setFront(false)
        } else {
            setText(cardsData[i].front)
            setFront(true)
        }
    }
    const countScore = (x) => {
        let correctAmount = 0;
        for (let k = 0; k < x.length; k++) {
            if (x[k].learned == true) {
                correctAmount++
            }
        }
        let score = correctAmount * 100 / x.length;
        return score;
    }

    const correctAnswer = async (answer) => {

        let card = {
            front: cardsData[i].front,
            back: cardsData[i].back,
            learned: answer,
        }
        let tmp = cards.concat([card])
        setCards(tmp)
        if (cardsData.length == i + 1) {

            let cardsArr = []
            if (!learnAll) {
                let j = 0;

                for (let k = 0; k < deck.cards.length; k++) {
                    if (deck.cards[k].back == tmp[j].back && deck.cards[k].front == tmp[j].front) {
                        cardsArr = cardsArr.concat([tmp[j]])
                        j++
                    } else {
                        cardsArr = cardsArr.concat([deck.cards[k]])
                    }
                }
            } else {
                cardsArr = tmp
            }

            let score = countScore(cardsArr);
            const docRef = db.collection('decks').doc(deck.deck_id);
            const updateTimestamp = docRef.update({
                score: score,
                cards: cardsArr
            });

            const updatedDeck = {
                deck_id: deck.deck_id,
                score: score,
                added: deck.added,
                cards: cardsArr,
                name: deck.name,
                user_id: deck.user_id,
                user_id_creator: deck.user_id_creator,
                visible: deck.visible,
            }
            navigation.navigate("MyDeck", {
                deck: updatedDeck,
            });

        } else {

            setText(cardsData[i + 1].front)
            setFront(true)
            let k = i + 1
            setI(k)
        }
    }

    useEffect(() => {
        setText(cardsData[i].front)
    }, [])

    return (


        <View style={styles.container}>
            <Text style={styles.counter}>{i + 1}/{cardsData.length}</Text>
            <View style={styles.flashcard}>

                <Text style={styles.text}>{text}</Text>

            </View>
            <TouchableOpacity
                style={styles.flipButton}
                onPress={flipCart}
            >
                <Text style={styles.text}>FLIP</Text>

            </TouchableOpacity>


            <SafeAreaView style={styles.containerButtons}>

                <TouchableOpacity
                    //   style={styles.buttonCreate}
                    onPress={() => correctAnswer(false)}
                >
                    <Text style={styles.answerButton}> Not quite </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    // style={styles.buttonCreate}
                    onPress={() => correctAnswer(true)}
                >
                    <Text style={styles.answerButton}> Learned </Text>

                </TouchableOpacity>

            </SafeAreaView>
        </View>


    );
};

export default PracticeCardScreen;
const styles = StyleSheet.create({
    counter: {
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        // marginRight: 40,
        marginBottom: 15,
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        backgroundColor: "#E5E5E5",
    },
    answerButton: {
        // alignSelf: 'center',
        // justifyContent: 'center',
        fontWeight: "bold",
        marginHorizontal: 40,
        borderRadius: 5,
        borderColor: "#A3C6C4",
        borderWidth: 3,
        //  width:100,
    },
    flipButton: {
        fontWeight: "bold",
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginHorizontal: 30,
        borderRadius: 35,
        backgroundColor: "#6C7A89",
        height: 35,

        // position: 'absolute',
        // bottom:5
    }
    ,
    flashcard: {
        // alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 35,
        backgroundColor: "#A3C6C4",
        margin: 5,
        height: 300,
    },
    text: {
        fontWeight: "bold",
    },
    containerButtons: {
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
    ,
})