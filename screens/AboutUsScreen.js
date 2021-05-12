import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";
import {auth} from "firebase";
import HeaderForMyProfile from "../components/HeaderForMyProfile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AboutUsScreen = ({navigation}) => {

    navigation.setOptions({
        headerBackTitle: "Back",
    })

    return (
        <View>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>About us</Text>
            </View>
            <View
                //style={styles.titleContainer}
            >
                <Text
                    style={styles.text}
                    >
               Flashcards App - is the application to learn and practice new information. Created by Sofiya Olenyn as course work project.</Text>
                <View style={styles.line}>
                <MaterialCommunityIcons style={styles.icon} name={"file-plus-outline"} size={26} color={"#354649"}/>
                <Text
                    style={styles.text}
                >
                   By tapping on this icon you can add new deck with
                    cards</Text>
                </View>
                <View style={styles.line}>
                    <MaterialCommunityIcons style={styles.icon} name={"home"} size={26} color={"#354649"}/>
                    <Text
                        style={styles.text}
                    >
                        By tapping on this icon you can see your decks of cards and collection of decks. To open deck just tap on it. After it you will have
                    an opportunity to practice, testing it in two ways (quiz and writing), and also to edit and delete deck.</Text>
                </View>
                <View style={styles.line}>
                    <MaterialCommunityIcons name="file-search-outline" style={styles.icon} color={"#354649"} size={26}/>
                    <Text
                        style={styles.text}
                    >
                        By tapping on this icon you can find new deck of other users and then add it to yours decks. </Text>
                </View>
            </View>
        </View>
    );
};

export default AboutUsScreen;
const styles = StyleSheet.create({
    line:{
        width:400,
        flexDirection: 'row',
        marginVertical: 5,
    },
    title: {
        marginLeft: 10,
        marginVertical: 20,
        fontSize: 25,
        fontWeight: "bold",

    },
    titleContainer:{

        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        marginRight: 40,
        marginLeft: 15,
    },
    icon:{
        marginHorizontal:5,
    }
})
