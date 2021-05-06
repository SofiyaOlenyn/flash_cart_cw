import React, {useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import Divider from "react-native-paper";
import {useNavigation} from "@react-navigation/core";
import {auth} from "../firebase";

const Deck = ({deck}) => {

    const navigation = useNavigation();

    const openDeckScreen = async function () {
        navigation.navigate("MyDeck", {
            deck: deck,
        });
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => openDeckScreen()}
            >
                <Text style={styles.frontText}>{deck.name}</Text>
                <View style={styles.bottom}>
                <Text style={styles.text}>
                    {deck.cards.length} cards</Text>
                <Text style={styles.text}>
                    {(auth.currentUser.uid != deck.user_id_creator) ? " Added" : ""}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Deck;

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
