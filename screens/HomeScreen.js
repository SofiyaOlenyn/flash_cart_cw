import React, {useState, useLayoutEffect, useEffect} from 'react';

import {
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Button} from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";

import BottomTabNavigation from "../navigation/BottomTabNavigation";
import {db} from "../firebase";
import Deck from "../components/Deck";
import CardAdd from "../components/CardAdd";

import {auth} from "../firebase"


const HomeScreen = ({navigation}) => {

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle:"Flashcards App",
    //     })
    // },[navigation])

    const[decks,setDecks] = useState([])
    const [loading,setLoading] = useState(false)


    const fetchDecks = async () => {
        setLoading(true);
     //  console.log("User   "+ JSON.stringify(auth.currentUser));
        const currentUser = auth.currentUser.uid;
        try {

            let results = [];
            db.collection("decks").where("user_id", "==", currentUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                      // console.log(doc.id, " => ", doc.data());
                        results.push(doc.data())
                       // console.log("results"+results);
                    });
                    setDecks(results);

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });



        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() =>{
        fetchDecks().then(r => {});
    },[])


    return (
        <SafeAreaView>
            <SafeAreaView style={styles.containerButtons}>

                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => fetchDecks()}
                >
                    <Text  style={styles.text}> My decks </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    // onPress={() => reset()}
                >
                    <Text  style={styles.text}> My collections </Text>

                </TouchableOpacity>

            </SafeAreaView>
            {/*<Deck deck={deck}/>*/}
            <FlatList

                data={decks}
                renderItem={({item}) => <Deck deck={item}/>}

                // keyExtractor={(item) => item.front}
                refreshing={loading}
                onRefresh={fetchDecks}

            />

        </SafeAreaView>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    containerButtons:{
        flexDirection: 'row',

    }
    ,
    text:{
        fontWeight: "bold",
        // margin: 15,
    },
    buttonCreate:{
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 10,
        width: 210,
        // marginTop: 30,
        height:40,
        // borderRadius: 20,
        backgroundColor:"#6C7A89",
        // borderBottomColor:"#49559f",
    },


})
