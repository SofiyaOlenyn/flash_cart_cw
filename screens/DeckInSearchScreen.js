import React, {useState, useEffect} from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {db} from "../firebase";
import Deck from "../components/Deck";
import {auth} from "../firebase"
import Card from "../components/Card";
import CardAdd from "../components/CardAdd";

const DeckInSearchScreen = ({route, navigation}) => {

    const {deck} = route.params;
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    navigation.setOptions({
        headerBackTitle: "Back",
    })
    const fetchCards = async () => {
        setCards(deck.cards)
    }
    const addDeck = async () => {

        const newDeck = deck.name + "_" + auth.currentUser.uid;
        db.collection("decks").doc(newDeck).set({
            name: deck.name,
            user_id: auth.currentUser.uid,
            user_id_creator: deck.user_id_creator,
            visible: false,
            cards: deck.cards,
            added: true,
            score: null,
            deck_id: newDeck,
            tags:deck.tags
        })
            .then(() => {
                console.log("Document successfully written!");

            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        navigation.navigate("Search");

    }
    useEffect(() => {
        fetchCards().then(r => {
        });
    }, [])


    return (
        <SafeAreaView>
            <SafeAreaView style={styles.containerButtons}>

                <Text style={styles.text}>{deck.name}</Text>
                <Text style={styles.tagsName}>Tags: { (deck.tags!=null) ? deck.tags.join(" ") : ""}</Text>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => addDeck()}
                >
                    <Text style={styles.textButton}> Add </Text>

                </TouchableOpacity>


            </SafeAreaView>
            <FlatList
                data={cards}
                renderItem={({item}) => <Card card={item} cards={deck.cards}/>}
                keyExtractor={(item) => item.front}
                refreshing={loading}
                onRefresh={fetchCards}
            />

        </SafeAreaView>
    );
};

export default DeckInSearchScreen;
const styles = StyleSheet.create({

    text: {
        marginHorizontal: 20,
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 40,
        alignContent: "center",
    },
    textButton: {

        fontWeight: "bold",
        alignContent: "center",
    },
    buttonCreate: {
        margin: 20,
        borderRadius: 20,
        borderColor: "#354649",
        borderWidth: 1,
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        //   width: 210,
        height: 40,
        backgroundColor: "#6C7A89",
    },
    tagsName:{
        fontSize: 20,
        //  fontWeight: "bold",
        marginHorizontal: 25,
        marginTop: 13,
        alignItems: 'center',
    }


})
