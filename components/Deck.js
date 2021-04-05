import React, {useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import Divider from "react-native-paper";

const Deck = ({ deck,navigation}) => {


    const openDeckScreen = async function () {

    }

    return (

        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => openDeckScreen() }
            >


            <Text style={styles.frontText}>{deck.name}</Text>
            <Text style={styles.text}>
                {/*{deck.cards.length}*/}
                cards</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Deck;

const styles = StyleSheet.create({
        frontText:{
             fontSize:20,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginBottom:15,
        },
        text:{

            marginHorizontal: 10,
            marginBottom:7,
        },
        container:{
            // flex:1,
            // alignItems:"center",
            // justifyContent:"center",

            padding:10,
            borderRadius: 10,
            borderColor:"#A3C6C4",
            borderWidth:7,
            margin:5,
            height:100,


        },


    }
)
