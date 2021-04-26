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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CollectionLine from "../components/CollectionLine";

const HomeScreen = ({navigation}) => {

    const [decks, setDecks] = useState([])
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(false)
    const [deckFlag, setDeckFlag] = useState(true)

    const fetchDecks = async () => {
        setDeckFlag(true)
        setLoading(true);
        const currentUser = auth.currentUser.uid;
        try {
            let results = [];
            db.collection("decks").where("user_id", "==", currentUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
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
    const fetchCollections = async () => {
        setDeckFlag(false)
        setLoading(true);
        const currentUser = auth.currentUser.uid;
        try {
            let results = [];
            db.collection("collections").where("user_id", "==", currentUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        results.push(doc.data())
                        // console.log("results"+results);
                    });
                    setCollections(results);

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
    const openNewCollectionScreen = async () => {
        navigation.navigate("NewCollection");

    }
    useEffect(() => {
        fetchDecks().then(r => {
        });
    }, [])


    return (
        <SafeAreaView>
            <SafeAreaView style={styles.containerButtons}>

                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => fetchDecks()}
                >
                    <Text style={styles.text}> My decks </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => fetchCollections()}
                >
                    <Text style={styles.text}> My collections </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.plusIcon}
                   onPress={() => openNewCollectionScreen()}
                >
                    <MaterialCommunityIcons name="plus-box" color={"black"} size={35}/>

                </TouchableOpacity>


            </SafeAreaView>
            <FlatList
                data={ deckFlag ? decks : collections }
                renderItem={ deckFlag ? ( ({item}) => <Deck deck={item}/>) : ( ({item}) => <CollectionLine collection={item}/>) }
                keyExtractor={deckFlag ? (item) => item.deck_id : (item) => item.collection_id}
                refreshing={loading}
                onRefresh={deckFlag ? fetchDecks : fetchCollections}
            />

        </SafeAreaView>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
    }
    ,
    text: {
        fontWeight: "bold",
    },
    buttonCreate: {
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 40,
        backgroundColor: "#6C7A89",
    },
    plusIcon:{
        backgroundColor: "#6C7A89",
        width: 60,
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
    }


})
