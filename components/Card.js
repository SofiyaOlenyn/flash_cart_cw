import React, {useState} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {ListItem, Avatar, Input} from "react-native-elements";
import Divider from "react-native-paper";

const Card = ({ card }) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const Separator = () => (
        <View style={styles.separator} />
    );
    return (

     <View style={styles.container}>


         <Text style={styles.frontText}> {card.front}</Text>
         <Separator />
         {/*<Text>-----------------------------------------------------------</Text>*/}
         <Text>{card.back} </Text>


     </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    frontText:{

        fontWeight: "bold",
        marginHorizontal: 20,
        marginBottom:7,
    },
        container:{
            flex:1,
            // alignItems:"center",
            // justifyContent:"center",
            padding:10,
            borderRadius: 35,
            backgroundColor:"#A3C6C4",
            margin:5,
            height:130,


        },
        inputContainer:{
            width: 300,
        },
        button:{
            width:200,
            marginTop:10,
        },
        separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    }
)
