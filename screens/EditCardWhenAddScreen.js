import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from "react-native-elements";

const EditCardWhenAddScreen = ({route, navigation}) => {

    const {card} = route.params;
    const {cards} = route.params;
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Go back",
        })
    }, [navigation])

    useEffect(() => {
        console.log(JSON.stringify(card))
        setFront(card.front)
        setBack(card.back)
    }, [])

    const editCard = async function () {
        const newCard = {
            front: front,
            back: back,
            learned: card.learned,
            box: 1,
            lastSeen:Date.now(),
        }
        if (cards.length == 1) {
            navigation.navigate("NewDeck", {
                newCard: [newCard],
            });
        } else {
            let i = cards.indexOf(card)
            cards.splice(i, 1)
            cards.splice(i, 0, newCard)
            navigation.navigate("NewDeck", {
                newCard: cards,
            });
        }
    }
    const deleteCard = async function () {

        if (cards.length == 1) {
            navigation.navigate("NewDeck", {
                newCard: [],
            });
        } else {
            let i = cards.indexOf(card)
            cards.splice(i, 1)
            navigation.navigate("NewDeck", {
                newCard: cards,
            });
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

export default EditCardWhenAddScreen;

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
