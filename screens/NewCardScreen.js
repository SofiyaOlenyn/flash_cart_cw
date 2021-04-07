import React, {useLayoutEffect, useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
const NewCardScreen = ({route, navigation}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const { cards} = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Go back",
        })
    },[navigation])

    const addCart = async function () {
        try {
           //newCard console.log("Cards:"+JSON.stringify(cards));
            const item = {
                front: front,
                back: back,
                learned:null,
            }
            let  newCards = null;
            if(cards== null || cards.length==0) {
                newCards = [item];
                console.log(cards.length)
            }
            else{

                newCards =

                    cards.concat(item);

            }

        //   console.log("Cards:"+navigation.objectValue());
        //  console.log("newCards:"+JSON.stringify(newCards));
            // console.log(newCards);
            navigation.navigate("NewDeck",{
                newCard :newCards,
            });

        } catch (e) {
            console.log(e);
        }
    }

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
                maxLength = {30}
                multiline={true}
                numberOfLines={1}
            />
            <Input
                value={back}
                onChangeText={(value) => setBack(value)}
                placeholder="Definition"

                maxLength = {300}
                multiline={true}
                numberOfLines={1}
            />

            </View>
            <TouchableOpacity
                style={styles.buttonAdd}
                 onPress={() => addCart() }
            >
                <Text  style={styles.text}>Add cart</Text>

            </TouchableOpacity>
        </View>
    );
};

export default NewCardScreen;

const styles = StyleSheet.create({
    buttonAdd:{
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 60,
        width: 300,
        marginTop: 30,
        height:36,
        borderRadius: 100,
        backgroundColor:"#6C7A89",
    },
    containerInput:{
        marginTop:200,
        padding:10,
        borderRadius: 35,
        backgroundColor:"#A3C6C4",
        margin:5,


    },
        container:{
            flex:1,
            padding:10,
            borderRadius: 35,
            backgroundColor:"#A3C6C4",
            margin:5,
            height:50,

        },
        inputContainer:{
            width: 300,
        },
        text:{
            fontSize: 20,
           // fontWeight: "bold",
        }

    }
)
