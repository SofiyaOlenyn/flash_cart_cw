import React, {useEffect, useState} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {CheckBox, Input} from "react-native-elements";
import {db} from "../firebase";
import {auth} from "../firebase"

const EditDeckScreen = ({route, navigation}) => {

    const [deckName, setDeckName] = useState("");
    const [tags, setTags] = useState("");
    const [isSelected, setSelection] = useState(false);
    const {deck} = route.params;

    const editDeck = async function () {

        const newDeckName = deck.deck_id;
        let t = tags.toLowerCase().split(" ");
        const tagsArr = (Array.from(t)).splice(0,3)
        const docRef = db.collection('decks').doc(newDeckName);
        const update = docRef.update({
            name: deckName,
            visible: isSelected,
            tags:tagsArr

        });
        const updatedDeck = {
            added: deck.added,
            cards: deck.cards,
            name: deckName,
            user_id: deck.user_id,
            user_id_creator: deck.user_id_creator,
            visible: isSelected,
            score: deck.score,
            deck_id:deck.deck_id,
            tags:tagsArr
        }
        navigation.navigate("MyDeck", {
            deck: updatedDeck,
        });

    }

    useEffect(() => {
        setDeckName(deck.name)
        setSelection(deck.visible)
        if(deck.tags!=null){
            setTags(deck.tags.join(" "))
        }
        else {
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
        }

    }
)
