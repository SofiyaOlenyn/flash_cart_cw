import React, {useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import Divider from "react-native-paper";
import {useNavigation} from "@react-navigation/core";

const CollectionLine = ({collection}) => {

    const navigation = useNavigation();

    const openCollectionScreen = async function () {

        navigation.navigate("MyCollection", {
            collection: collection,
        });
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => openCollectionScreen()}
            >
                <Text style={styles.frontText}>{collection.name}</Text>
                <Text style={styles.text}>
                    {collection.decks.length} decks</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CollectionLine;

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

    }
)
