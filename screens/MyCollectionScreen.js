import React, {useEffect, useState} from 'react';

import {
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CardInDeck from "../components/CardInDeck";
import {alert} from "react-native-web";
import {auth, db} from "../firebase";
import Deck from "../components/Deck";



const MyCollectionScreen = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [decks, setDecks] = useState("");
    const [loading, setLoading] = useState(false)
    const {collection} = route.params;


    const fetchDecks = async () => {

        setLoading(true);
        let arrID = []

        for(let i=0;i<collection.decks.length;i++){
            arrID[i]=collection.decks[i].deck_id
        }

        try {
            let results = [];
            db.collection("decks").where("deck_id", "in", arrID)
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
        }



        setCollectionName(collection.name)

        setLoading(false);
    }

    const editCollection = async () => {

        navigation.navigate("EditCollection", {
            collection: collection,
            decks: decks
        });
    }
    const deleteCollection = async () => {

            let query = db.collection('collections')
                .where('collection_id', '==', collection.collection_id)
            ;

            query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });

            setModalVisible(false)
            navigation.navigate("Home");



    }
    const openDeleteModal = async () => {
        setModalVisible(true)
    }
    useEffect(() => {

        fetchDecks()



    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Do u really wanna delete collection?</Text>
                        <View style={styles.modalViewAnswers}>
                            <Pressable
                                style={styles.buttonModals}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>NO</Text>
                            </Pressable>
                            <TouchableOpacity
                                style={styles.buttonModals}
                               onPress={deleteCollection}
                            >
                                <Text style={styles.textStyle}>YES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text style={styles.deckName}>{collection.name}</Text>
            <SafeAreaView style={styles.containerEditButtons}>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                    onPress={editCollection}
                >
                    <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                   onPress={() => openDeleteModal()}
                >
                    <MaterialCommunityIcons name="delete" color={"#354649"} size={25}/>
                </TouchableOpacity>


            </SafeAreaView>




            <FlatList

                data={decks}
                renderItem={({item}) => <Deck deck={item}/>}
                keyExtractor={(item) => item.front}
                refreshing={loading}
                onRefresh={fetchDecks}

            />
        </SafeAreaView>
    );
};

export default MyCollectionScreen;

const styles = StyleSheet.create({
        containerEditButtons: {
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 13,
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            }
        },
        modalViewAnswers: {
            flexDirection: 'row',
        },
        buttonsEditActive: {
            marginHorizontal: 8,
            backgroundColor: "#A3C6C4",
        },
        buttonsEdit: {
            marginHorizontal: 8,
        },
        buttonModals: {
            borderRadius: 20,
            marginHorizontal: 8,
            padding: 10,
            elevation: 2,
            backgroundColor: "#A3C6C4",
        },
        containerProgress: {
            flexDirection: 'row',
            marginTop: 15,
            marginLeft: 19,
        },
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: "#E5E5E5",

        },
        scoreText: {
            marginRight: 8,
            fontSize: 15,
            backgroundColor: "#A3C6C4",
            color: "black"
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
            // borderColor: "#354649",
            // borderWidth: 1,
            backgroundColor: "#6C7A89",
        },
        checkboxContainer: {
            flexDirection: 'row',
        },
        checkbox: {

            marginLeft: 15,
        },
        deckName: {
            fontSize: 27,
            fontWeight: "bold",
            marginHorizontal: 25,
            marginTop: 13,
            alignItems: 'center',
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
