import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from "react-native-elements";

const NewCardScreen = ({route, navigation}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const {cards} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Go back",
        })
    }, [navigation])


    const addCart = async function () {
        // let today = new Date();
        //
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        //
        // // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //
        // let dateTime = date+' '+time;
        try {
            const item = {
                front: front,
                back: back,
                learned: null,
                box: 1,
                lastSeen:Date.now()
            }
            let newCards = null;
            if (cards == null || cards.length == 0) {
                newCards = [item];
                console.log(cards.length)
            } else {
                newCards = cards.concat([item]);
            }
            navigation.navigate("NewDeck", {
                newCard: newCards,
            });

        } catch (e) {
            console.log(e);
        }
    }

    return (

        <View
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
                onPress={() => addCart()}
            >
                <Text style={styles.text}>Add cart</Text>

            </TouchableOpacity>
        </View>
    );
};

export default NewCardScreen;

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
            // fontWeight: "bold",
        }

    }
)
