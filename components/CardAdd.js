import React, {useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import Divider from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/core";

const CardAdd = ({card}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const Separator = () => (
        <View style={styles.separator}/>
    );
    const navigation = useNavigation();
    const openDeckScreen = async function () {




        //  navigation.jumpTo('MyDeck');
        navigation.navigate("EditCardWhenAdd",{
            card:card,
        });
    }

    return (

        <View style={styles.container}>

            < SafeAreaView style={styles.containerText}>
            <Text style={styles.frontText}> {card.front}</Text>
            <Separator/>
            {/*<Text>-----------------------------------------------------------</Text>*/}
            <Text>{card.back} </Text>
            </SafeAreaView>
            < SafeAreaView style={styles.containerEditButtons}>

                <TouchableOpacity
                    style={styles.buttonsEdit}
                    onPress={() => openDeckScreen()}
                >
                    <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={20}/>


                </TouchableOpacity>
                {/*<TouchableOpacity*/}
                {/*    style={styles.buttonsEdit}*/}
                {/*    //  onPress={() => reset()}*/}
                {/*>*/}
                {/*    <MaterialCommunityIcons name="delete" color={"#354649"} size={20}/>*/}

                {/*</TouchableOpacity>*/}


            </SafeAreaView>


        </View>
    );
};

export default CardAdd;

const styles = StyleSheet.create({
        frontText: {

            fontWeight: "bold",
            marginHorizontal: 20,
            marginBottom: 7,
        },
        container: {
            flex: 1,
            // alignItems:"center",
            // justifyContent:"center",
            padding: 10,
            borderRadius: 35,
            backgroundColor: "#A3C6C4",
            margin: 5,
            height: 130,



        },
    containerText:{
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
            borderBottomColor: '#737373',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },

    }
)
