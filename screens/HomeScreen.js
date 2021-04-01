import React, {useLayoutEffect} from 'react';

import {KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";

import BottomTabNavigation from "../navigation/BottomTabNavigation";
import {db} from "../firebase";


const HomeScreen = ({navigation}) => {

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle:"Flashcards App",
    //     })
    // },[navigation])



    const changePr = async function () {
        let docRef = db.collection("cards").doc("LA");
        let d=[];
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("STep1");
                db.collection("cards").doc("LA").set({
                    name: "Los Angeles",
                    state: "CA",
                    country: "USA",
                    cards:  doc.data().cards.concat([{front:"a",back:"a"}]),
                })
                    .then(() => {
                        console.log("Document successfully written!");
                        console.log(doc.data().cards);
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                console.log("Document data:", doc.data().cards);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


    }
    return (
        <SafeAreaView>

       {/*     <Button title="My profile" onPress={() => changePr()} />*/}
       <ScrollView>
 <CustomListItem/>
        </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
