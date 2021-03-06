import React, {useEffect, useState} from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {CheckBox, Input} from "react-native-elements";
import CardAdd from "../components/CardAdd";
import {db} from "../firebase";
import {auth} from "../firebase"
import * as firebase from "firebase";

const NewDeckScreen = ({route, navigation}) => {


    const [i, setI] = useState(0);
    const [deckName, setDeckName] = useState("");
    const [tags, setTags] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [ourCards, setOurCards] = useState([]);
    let {newCard} = route.params;
    const [loading, setLoading] = useState(false);

    const openNewCardScreen = async function () {
        if (deckName) {
            try {
                console.log("CardsDeckScreen:" + ourCards);
                if (newCard == null) {
                    navigation.navigate("NewCard", {
                        cards: [],
                    });
                } else {
                    if (i == 1) {
                        navigation.navigate("NewCard", {
                            cards: ourCards,
                        });
                    } else {
                        setOurCards(newCard)
                        navigation.navigate("NewCard", {
                            cards: ourCards,
                        });
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                setI(0);
            }
        }

        //TODO if deckName is empty alarm
    }

    const createDeck = async function () {


        if (deckName && newCard) {
            const uuid =()=>'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c,r)=>('x'==c?(r=Math.random()*16|0):(r&0x3|0x8)).toString(16));

            const ID = uuid()+"-"+auth.currentUser.uid;
          //  console.log(ID)
            let t = tags.toLowerCase().split(" ");
            let tagsArr = (Array.from(t)).splice(0,3)
            //console.log(tagsArr )

            // await uploadImage(newCard[0].imageUrlBack)
            //
            let cardsArr =[]

            for(let i=0; i<newCard.length; i++){


                let card = {
                    front: newCard[i].front,
                    frontImage:  newCard[i].frontImage,
                    back: newCard[i].back,
                    backImage: newCard[i].backImage,
                    learned: null,
                    box: 1,
                    lastSeen: Date.now()
                }
                cardsArr.push(card)

            }


           // const newDeck = deckName.toString() + "_" + auth.currentUser.uid;
            db.collection("decks").doc(ID).set({
                name: deckName.trim(),
                user_id: auth.currentUser.uid,
                user_id_creator: auth.currentUser.uid,
                visible: isSelected,
                cards: cardsArr,
                added: false,
                score: null,
                deck_id: ID,
                tags: tagsArr
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
        setDeckName("");
        setTags("")
        setI(1);
        setOurCards([]);
        setSelection(false);
    }

    const reset = async () => {
        for(let i=0; i<newCard.length; i++) {

            if (newCard[i].frontImage) {
                let imageRef = firebase.storage().ref('/' + newCard[i].frontImage);
                imageRef
                    .delete()
                    .then(() => {
                        console.log(`${newCard[i].frontImage}has been deleted successfully.`);
                    })
                    .catch((e) => console.log('error on image deletion => ', e));
            }
            if (newCard[i].backImage) {
                let imageRef = firebase.storage().ref('/' + newCard[i].backImage);
                imageRef
                    .delete()
                    .then(() => {
                        console.log(`${newCard[i].backImage}has been deleted successfully.`);
                    })
                    .catch((e) => console.log('error on image deletion => ', e));
            }
        }
        setDeckName("");
        setTags("");
        setI(1);
        setSelection(false);
        setOurCards([]);
    }

    const fetchTweets = async () => {
        setLoading(true);
        if (i == 0) {
            setOurCards(newCard)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (newCard) {
            setOurCards(newCard)
        }
        fetchTweets().then(() => {
        });

    }, [newCard])

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
                maxLength={100}
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
            <SafeAreaView style={styles.containerButtons}>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => createDeck()}
                >
                    <Text style={styles.text}> Create </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => reset()}
                >
                    <Text style={styles.text}> Reset </Text>

                </TouchableOpacity>
            </SafeAreaView>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => openNewCardScreen()}
            >
                <Text style={styles.text}> Add </Text>
            </TouchableOpacity>
            <FlatList
                data={ourCards}
                renderItem={({item}) => <CardAdd card={item} cards={ourCards}/>}
                keyExtractor={(item) => item.front}
                refreshing={loading}
                onRefresh={fetchTweets}
            />
        </SafeAreaView>
    );
};

export default NewDeckScreen;

const styles = StyleSheet.create({
        containerButtons: {
            flexDirection: 'row',
        }
        ,
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: "#E5E5E5",
        },
        buttonAdd: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            margin: 15,
            height: 50,
            borderRadius: 20,
            borderColor: "#354649",
            borderWidth: 1,
            backgroundColor: "#6C7A89",
        },
        buttonCreate: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            width: 192,
            height: 50,
            borderRadius: 20,
            borderColor: "#354649",
            borderWidth: 1,
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
        inputContainer: {
            width: 300,
        },
        button: {
            width: 200,
            marginTop: 10,
        }

    }
)
