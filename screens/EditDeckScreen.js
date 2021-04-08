import React, {useEffect, useLayoutEffect, useState} from 'react';

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
import CardAdd from "../components/CardAdd";
import {db} from "../firebase";
import {auth} from "../firebase"

const EditDeckScreen = ({route, navigation}) => {

    const [deckName, setDeckName] = useState("");
    const [isSelected, setSelection] = useState(false);
    const {deck} = route.params;

    const editDeck = async function () {

        const newDeckName = deck.name.toString() + "_" + auth.currentUser.uid;
        const docRef = db.collection('decks').doc(newDeckName);

        const updateTimestamp = docRef.update({
            name: deckName,
            visible: isSelected,

        });

        const updatedDeck = {
            added: deck.added,
            cards: deck.cards,
            name: deckName,
            user_id: deck.user_id,
            user_id_creator: deck.user_id_creator,
            visible: isSelected
        }
        navigation.navigate("MyDeck", {
            deck: updatedDeck,
        });

    }

    useEffect(() => {
        setDeckName(deck.name)
        setSelection(deck.visible)


    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/*<Text style={styles.text}>Add new deck</Text>*/}
            <Input
                style={styles.deckname}
                value={deckName}
                onChangeText={(value) => setDeckName(value)}
                placeholder="Deck name"
                autoFocus
                maxLength={40}
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

            </SafeAreaView>


            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={editDeck}
            >
                <Text style={styles.text}> Edit </Text>

            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default EditDeckScreen;

const styles = StyleSheet.create({
        containerButtons: {
            flexDirection: 'row',

        }
        ,
        container: {
            flex: 1,
            // alignItems:"center",
            // justifyContent:"center",
            padding: 10,
            backgroundColor: "#E5E5E5",

        },
        buttonAdd: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: 20,

            // width: 150,
            margin: 15,
            height: 50,
            borderRadius: 20,

            backgroundColor: "#6C7A89",
            // borderBottomColor:"#49559f",
        },
        buttonCreate: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            width: 192,
            // marginTop: 30,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#6C7A89",
            // borderBottomColor:"#49559f",
        },
        checkboxContainer: {
            flexDirection: 'row',
            // marginLeft: 15,
        },
        checkbox: {

            marginLeft: 15,
        },
        deckname: {
            margin: 15,
        },
        text: {
            fontWeight: "bold",
            margin: 15,
        },
        inputContainer: {
            width: 300,
        },
        button: {
            width: 200,
            marginTop: 10,
        }

    }
)
