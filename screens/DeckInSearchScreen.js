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

        const uuid =()=>'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c,r)=>('x'==c?(r=Math.random()*16|0):(r&0x3|0x8)).toString(16));

        const ID = uuid()+"-"+auth.currentUser.uid;
        const newDeck = deck.name + "_" + auth.currentUser.uid;

        let cardsArr = []
        for(let i=0;i<deck.cards.length;i++){

            let newCard = {
                front: deck.cards[i].front,
                back: deck.cards[i].back,
                learned: null,
                box: 1,
                lastSeen:Date.now()
            }
            cardsArr.push(newCard)
        }

        let tagsArr = []
        if(deck.tags!=null){
            tagsArr=deck.tags
        }

        db.collection("decks").doc(ID).set({
            name: deck.name,
            user_id: auth.currentUser.uid,
            user_id_creator: deck.user_id_creator,
            visible: false,
            cards: cardsArr,
            added: true,
            score: null,
            deck_id: ID,
            tags:tagsArr
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
