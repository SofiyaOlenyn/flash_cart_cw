import React, {useEffect,useLayoutEffect, useState} from 'react';

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
import {Button, CheckBox, Input} from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
// import * as firebase from "firebase";
import Card from "../components/Card";
import {db} from "../firebase";
import {auth} from "../firebase"

const NewDeckScreen = ({newCard,navigation}) => {


    const [i, setI] = useState(0);
    const [deckName, setDeckName] = useState("");
    const [isSelected, setSelection] = useState(false);
    const[cards,setCards] = useState([]);
    const[cardsDemo,setCardsDemo] = useState([]);
    const [loading,setLoading] = useState(false);
    const item = {
        front: "IT IS FRONT",
            back:"IT IS BACK SIZE"
    }

    const array = [
        {
            front: "IT IS FRONT",
            back:"IT IS BACK SIZE"
        },
        {
            front: "IT IS FRONT1",
            back:"IT IS BACK SIZE1"
        }

    ]

    const openNewCardScreen = async function () {

        if(deckName){

        try {

           // setCards(item)
            console.log(cards)
            navigation.navigate("NewCard",{
                cards:cards,
            });
        } catch (e) {
            console.log(e);
        }
        }
        //TODO if deckName is empty alarm
    }
    const createDeck = async function () {


       if(deckName) {
           db.collection("decks").doc( deckName.toString() ).set({
               name: deckName,
               user_id: auth.currentUser.uid,
               visible: isSelected,
               cards: cards,
           })
               .then(() => {
                   console.log("Document successfully written!");

               })
               .catch((error) => {
                   console.error("Error writing document: ", error);
               });

       }


    }
    const fetchTweets = async () => {
        setLoading(true);
        if(newCard){
            setCards(newCard)
        }


    }
    useEffect(() => {
        setI(i)
        fetchTweets().then(() =>{});

    },[])

    return (
        <SafeAreaView style={styles.container}>
            {/*<Text style={styles.text}>Add new deck</Text>*/}
            <Input
                style={styles.deckname}
                value={deckName}
                onChangeText={(value) => setDeckName(value)}
                placeholder="Deck name"
                autoFocus
                maxLength = {40}
                multiline={true}
                numberOfLines={1}
            />

            <SafeAreaView style={styles.checkboxContainer}>

                <CheckBox
                    // value={isSelected}
                    // onValueChange={setSelection}
                    style={styles.checkbox}
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                />
                <Text style={styles.text}>Make visible for other</Text>
                <TouchableOpacity
                    style={styles.buttonCreate}
                     onPress={() => createDeck()}
                >
                    <Text  style={styles.text}> Create </Text>

                </TouchableOpacity>
            </SafeAreaView>


            <ScrollView  >
           {/*<Card/>*/}
           {/*<Card/>*/}
           {/*     <Card card={item}/>*/}
           {/*     <FlatList*/}


           {/*          data={cards}*/}
           {/*          renderItem={({item}) => <Card card={item}/>}*/}
           {/*         // keyExtractor={(item) => item}*/}
           {/*          refreshing={loading}*/}
           {/*          onRefresh={fetchTweets}*/}
           {/*     />*/}
                <TouchableOpacity
                    style={styles.buttonAdd}
                     onPress={() => openNewCardScreen()}
                >
                    <Text  style={styles.text}> Add </Text>

                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewDeckScreen;

const styles = StyleSheet.create({
        container:{
            flex:1,
            // alignItems:"center",
            // justifyContent:"center",
            padding:10,
            backgroundColor:"#E5E5E5",

        },
    buttonAdd:{
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 20,
        fontWeight: "bold",
        // width: 150,
        margin: 15,
        height:50,
        borderRadius: 20,

        backgroundColor:"#6C7A89",
        // borderBottomColor:"#49559f",
    },
    buttonCreate:{
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        width: 150,
        // marginTop: 30,
        height:50,
        borderRadius: 20,
        backgroundColor:"#6C7A89",
        // borderBottomColor:"#49559f",
    },
    checkboxContainer: {
        flexDirection: 'row',
        // marginLeft: 15,
    },
    checkbox: {

        marginLeft: 15,
    },
    deckname:{
        margin: 15,
    },
    text:{
        margin: 15,
    },
        inputContainer:{
            width: 300,
        },
        button:{
            width:200,
            marginTop:10,
        }

    }
)
