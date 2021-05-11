import React, {useEffect, useState} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from 'react-native';
import {CheckBox, Input} from "react-native-elements";
import {db} from "../firebase";
import {auth} from "../firebase"
import RadioButton from "react-native-paper";
//import {amount} from "../constant/Colors";

const EditDeckScreen = ({route, navigation}) => {

    const [deckName, setDeckName] = useState("");
    const [tags, setTags] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [checked10, setChecked10] = useState(true);
    const [checked20, setChecked20] = useState(false);
    const [checked30, setChecked30] = useState(false);
    const {deck} = route.params;
    const {amount} = route.params;
    const Separator = () => (
        <View style={styles.separator}/>
    );
    const editDeck = async function () {

        const newDeckName = deck.deck_id;
        let t = tags.toLowerCase().split(" ");
        const tagsArr = (Array.from(t)).splice(0, 3)
        const docRef = db.collection('decks').doc(newDeckName);
        let a;
        if(checked10){
            a=10
        }
        if(checked20){
            a=20
        }
        if(checked30){
            a=30
        }
        const update = docRef.update({
            name: deckName,
            visible: isSelected,
            tags: tagsArr

        });
        const updatedDeck = {
            added: deck.added,
            cards: deck.cards,
            name: deckName,
            user_id: deck.user_id,
            user_id_creator: deck.user_id_creator,
            visible: isSelected,
            score: deck.score,
            deck_id: deck.deck_id,
            tags: tagsArr
        }
        navigation.navigate("MyDeck", {
            deck: updatedDeck,
            amount: a
        });

    }
    const tick10 = () => {
        setChecked10(true)
        setChecked20(false)
        setChecked30(false)
    }
    const tick20 = () => {
        setChecked10(false)
        setChecked20(true)
        setChecked30(false)
    }
    const tick30 = () => {
        setChecked10(false)
        setChecked20(false)
        setChecked30(true)
    }

    useEffect(() => {

        if(amount==10){
            tick10()
        }
        if(amount==20){
            tick20()
        }
        if(amount==30){
            tick30()
        }

        setDeckName(deck.name)
        setSelection(deck.visible)
        if (deck.tags != null) {
            setTags(deck.tags.join(" "))
        } else {
            setTags((" "))
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Input
                style={styles.deckName}
                value={deckName}
                onChangeText={(value) => setDeckName(value)}
                placeholder="Deck name"
                autoFocus
                maxLength={40}
                multiline={true}
                numberOfLines={1}
            />
            <Input
                style={styles.deckName}
                value={tags}
                onChangeText={(value) => setTags(value)}
                placeholder="Tags (write up to 3 tags separated by space)"
                autoFocus
                maxLength={40}
                multiline={true}
                numberOfLines={1}
            />
            <SafeAreaView style={styles.checkboxContainer}>

                <CheckBox
                    style={styles.checkbox}
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                />
                <Text style={styles.text}>Make visible for other</Text>

            </SafeAreaView>
            <Separator/>
            <SafeAreaView
                style={styles.checkboxContainer}>
                <Text style={styles.text}>Amount of cards:</Text>
                <CheckBox
                    // style={styles.checkbox}
                    checked={checked10}
                    onPress={tick10}
                />
                <Text style={styles.textCardsAmount}>10</Text>
                <CheckBox
                    // style={styles.checkbox}
                    checked={checked20}
                    onPress={tick20}
                />
                <Text style={styles.textCardsAmount}>20</Text>
                <CheckBox
                    // style={styles.checkbox}
                    checked={checked30}
                    onPress={tick30}
                />
                <Text style={styles.textCardsAmount}>30</Text>
            </SafeAreaView>
            <TouchableOpacity
                style={styles.buttonEdit}
                onPress={editDeck}
            >
                <Text style={styles.text}> Edit </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default EditDeckScreen;

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: "#E5E5E5",

        },
        buttonEdit: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            margin: 15,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#6C7A89",

        },
        checkboxContainer: {
            flexDirection: 'row',
        },
        checkbox: {
            marginLeft: 15,
        },
        deckName: {
            margin: 15,
        },
        text: {
            fontWeight: "bold",
            margin: 15,
        },
        button: {
            width: 200,
            marginTop: 10,
        },
        textCardsAmount: {
            marginVertical: 15,
        }
        , separator: {
            marginVertical: 8,
            borderBottomColor: '#354649',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    }
)
