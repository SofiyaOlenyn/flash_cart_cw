import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/core";

const Card= ({card, cards}) => {

    const Separator = () => (
        <View style={styles.separator}/>
    );
    const navigation = useNavigation();


    return (

        <View style={styles.container}>
            < SafeAreaView style={styles.containerText}>
                <Text style={styles.frontText}> {card.front}</Text>
                <Separator/>
                <Text>{card.back} </Text>
            </SafeAreaView>
            {/*< SafeAreaView style={styles.containerEditButtons}>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={styles.buttonsEdit}*/}
            {/*        onPress={() => openDeckScreen()}*/}
            {/*    >*/}
            {/*        <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={20}/>*/}
            {/*    </TouchableOpacity>*/}
            {/*</SafeAreaView>*/}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
        frontText: {

            fontWeight: "bold",
            marginHorizontal: 20,
            marginBottom: 7,
        },
        container: {
            flex: 1,
            padding: 10,
            borderRadius: 35,
            borderColor: "#354649",
            borderWidth: 1,
            backgroundColor: "#A3C6C4",
            margin: 5,
            height: 130,
        },
        containerText: {
            height: 90,
        },
        inputContainer: {
            width: 300,
        },
        containerEditButtons: {
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 10,
        }
        ,
        buttonsEdit: {
            marginHorizontal: 5,
        },
        button: {
            width: 200,
            marginTop: 10,
        },
        separator: {
            marginVertical: 8,
            borderBottomColor: '#354649',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },

    }
)
