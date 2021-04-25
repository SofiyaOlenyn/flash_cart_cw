import React, {useEffect, useState} from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from 'react-native';
import {CheckBox, Input} from "react-native-elements";
import CardAdd from "../components/CardAdd";
import {db} from "../firebase";
import {auth} from "../firebase"
import Deck from "../components/Deck";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const EditCollectionScreen = ({route,navigation}) => {

    const [collectionName, setCollectionName] = useState("");
    const [decksData, setDecksData] = useState([])
    const [loading, setLoading] = useState(false)

    const {collection} = route.params;
    const {decks} = route.params;
    const fetchDecks = async () => {
        setCollectionName(collection.name)
        setLoading(true);
        const currentUser = auth.currentUser.uid;

        let arrID = []

        for(let i=0;i<collection.decks.length;i++){
            arrID[i]=collection.decks[i].deck_id
        }

        try {
            let results = [];
            db.collection("decks").where("user_id", "==", currentUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {


                        let d = {
                            deck_id: doc.data().deck_id,
                            name: doc.data().name,
                            length: doc.data().cards.length,
                            toCollection: ((arrID.includes(doc.data().deck_id)) ? true : false),

                        }
                        results.push(d)
                      //   console.log("results"+JSON.stringify(results));
                    });
                    setDecksData(results);

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const EditCollection = async () => {
        let collectionsAdded = decksData.filter(item => item.toCollection === true);

        // let arrID = []
        //
        // for(let i=0; i<collectionsAdded.length;i++){
        //     let deck ={
        //         deck_id: collectionsAdded.deck_id,
        //         name:collectionsAdded.name
        //     }
        //     arrID.push(deck)
        //
        // }
        if (collectionName) {

            const docRef = db.collection('collections').doc(collection.collection_id);
            const update = docRef.update({
                name: collectionName,
                decks: collectionsAdded

            });
            const updatedCollection = {
                name: collectionName,
                user_id: auth.currentUser.uid,
                collection_id: collection.collection_id,
                decks: collectionsAdded,
            }
            console.log(collectionsAdded)
            navigation.navigate("MyCollection", {
                collection: updatedCollection,
            });


            // const newCollection = collectionName.toString() + "_" + auth.currentUser.uid;
            // db.collection("collections").doc(newCollection).set({
            //     name: collectionName,
            //     user_id: auth.currentUser.uid,
            //     collection_id: newCollection,
            //     decks: collectionsAdded,
            // })
            //     .then(() => {
            //         console.log("Document successfully written!");
            //         navigation.navigate("Home");
            //
            //     })
            //     .catch((error) => {
            //         console.error("Error writing document: ", error);
            //     });
        }

    }

    const addToArr = async (item) => {


        let i = decksData.indexOf(item)


        let x = decksData[i].toCollection

        let arr = []

        decksData[i].toCollection = !x


        for (let j = 0; j < decksData.length; j++) {
            arr.push(decksData[j])
        }
       // console.log(arr)
        setDecksData(arr)

    }
    useEffect(() => {

        fetchDecks().then(r => {
        });
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Input
                style={styles.deckName}
                value={collectionName}
                onChangeText={(value) => setCollectionName(value)}
                placeholder="Collection name"
                autoFocus
                maxLength={40}
                multiline={true}
                numberOfLines={1}
            />
            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => EditCollection()}
            >
                <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <FlatList
                data={decksData}
                keyExtractor={(item) => item.deck_id}
                renderItem={(({item}) =>
                        <View
                            style={styles.containerDeck}

                        >

                            <View>
                                <Text style={styles.frontText}>{item.name}</Text>
                                <Text style={styles.textDeck}>
                                    {item.length} cards</Text>
                            </View>

                            <TouchableOpacity style={styles.plusIcon}
                                              onPress={() => addToArr(item)}
                            >
                                <MaterialCommunityIcons name={(item.toCollection) ? "check" : "plus-box"}
                                                        color={(item.toCollection) ? "#6C7A89" : "black"} size={35}/>
                            </TouchableOpacity>


                        </View>

                )}


                //  refreshing={loading}
                // onRefresh={fetchDecks}
            />

        </SafeAreaView>
    );
};

export default EditCollectionScreen;

const styles = StyleSheet.create({
        plusIcon: {
            position: 'absolute',
            bottom: 25,
            right: 5,

        },
        buttonCreate: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            width: 390,
            height: 50,
            borderRadius: 20,
            borderColor: "#354649",
            borderWidth: 1,
            backgroundColor: "#6C7A89",
        },
        frontText: {
            fontSize: 20,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginBottom: 15,
        },
        textDeck: {
            marginHorizontal: 10,
            marginBottom: 7,
        },
        containerDeck: {
            padding: 10,
            borderRadius: 10,
            borderColor: "#A3C6C4",
            borderWidth: 7,
            margin: 5,
            height: 100,
            flexDirection: 'row',
        },
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
