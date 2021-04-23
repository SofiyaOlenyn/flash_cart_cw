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



const MyDeckScreen = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [deckP, setDeckP] = useState("");
    const [cards, setCards] = useState("");
    const [cardsData, setCardsData] = useState("");
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState("")
    const [allFlag, setAllFlag] = useState(true)
    const [learnedFlag, setLearnedFlag] = useState(false)
    const [notLearnedFlag, setNotLearnedFlag] = useState(false)
    const [learned, setLearned] = useState([])
    const [notLearned, setNotLearned] = useState([])

    const {deck} = route.params;

    //todo payAttention on flag and card data
    const fetchCards = async () => {


        setLoading(true);

        setLearnedCards(deck.cards)

        setCards(deck.cards)
        setDeckName(deck.name)
        if (allFlag){
        setCardsData(deck.cards)
        }else{
            if(learnedFlag){
                setCardsData(learned)
            }
            else{
                setCardsData(notLearned)
            }
        }

        if (deck.score == null) {
            setScore("Not learned")
        } else {

            setScore((Math.round(deck.score)).toString() + "%")
        }
        setLoading(false);
    }
    useEffect(() => {
        if (deck) {
            setAllFlag(true)
            setNotLearnedFlag(false)

            setLearnedFlag(false)
            setDeckName(deck.name)
            setCardsData(deck.cards)
            // setDeckP(deck)
            setCards(deck.cards)
            setLearnedCards(deck.cards)
            if (deck.score == null) {
                setScore("Not learned")
            } else {

                setScore((Math.round(deck.score)).toString() + "%")
            }
        }
    }, [])

    const editDeck = async () => {

        if(!deck.added) {

            navigation.navigate("EditDeck", {
                deck: deck,
            });
       }
    }
    const setLearnedCards = () => {

        let l = []
        let nl = []
        for (let k = 0; k < deck.cards.length; k++) {
            if (deck.cards[k].learned == true) {
                l = l.concat([deck.cards[k]])
            } else {
                nl = nl.concat([deck.cards[k]])
            }
        }
        setNotLearned(nl)
        setLearned(l)
    }
    const setAllCardsData = async () => {
        setCardsData(deck.cards)
        setAllFlag(true)
        setNotLearnedFlag(false)
        setLearnedFlag(false)

    }
    const setLearnedData = async () => {
        setCardsData(learned)
        setAllFlag(false)
        setNotLearnedFlag(false)
        setLearnedFlag(true)
    }
    const setNotLearnedData = async () => {
        setCardsData(notLearned)
        setAllFlag(false)
        setNotLearnedFlag(true)
        setLearnedFlag(false)
    }

    const practiceDeck = async () => {

        if(cardsData.length==0) {}
        else{
            console.log("cardsData" + cardsData)
            navigation.navigate("PracticeCard", {
                deck: deck,
                cardsData: cardsData,
                learnAll: allFlag
            });
        }

    }

    const addDeck = async () => {
        navigation.navigate("NewCardToExistingDeck", {
            deck: deck,
        });
    }

    const openDeleteModal = async () => {
        setModalVisible(true)
    }


    const deleteDeck = async () => {
        let query = db.collection('decks')
            .where('deck_id', '==', deck.deck_id)
        ;

        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });

        setModalVisible(false)
        navigation.navigate("Home");

    }
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

                        <Text style={styles.modalText}>Do u really wanna delete deck?</Text>
                        <View style={styles.modalViewAnswers}>
                            <Pressable
                                style={[styles.buttonModals, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>NO</Text>
                            </Pressable>
                            <TouchableOpacity
                                style={[styles.buttonModals, styles.buttonClose]}
                                onPress={deleteDeck}
                            >
                                <Text style={styles.textStyle}>YES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text style={styles.deckName}>{deckName}</Text>
            <SafeAreaView style={styles.containerEditButtons}>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                    onPress={editDeck}
                >
                    <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                    onPress={() => openDeleteModal()}
                >
                    <MaterialCommunityIcons name="delete" color={"#354649"} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                    onPress={addDeck}
                >
                    <MaterialCommunityIcons name="plus-box" color={"#354649"} size={25}/>
                </TouchableOpacity>

            </SafeAreaView>
            <SafeAreaView style={styles.containerProgress}>

                <Text style={styles.scoreText}>{score}</Text>
                <TouchableOpacity
                    style={allFlag ? styles.buttonsEditActive : styles.buttonsEdit}
                    onPress={() => setAllCardsData()}
                >
                    <Text>All({cards.length})</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={notLearnedFlag ? styles.buttonsEditActive : styles.buttonsEdit}
                    onPress={() => setNotLearnedData()}
                >
                    <Text>Not quite({notLearned.length})</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={learnedFlag ? styles.buttonsEditActive : styles.buttonsEdit}
                    onPress={() => setLearnedData()}
                >

                    <Text>Learned({learned.length})</Text>

                </TouchableOpacity>

            </SafeAreaView>

            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => practiceDeck()}
            >
                <Text style={styles.text}> {notLearnedFlag ? "Practice not learned cards" : "Practice all"} </Text>

            </TouchableOpacity>

            <FlatList

                data={cardsData}
                renderItem={({item}) => <CardInDeck card={item} deck={deck}/>}
                keyExtractor={(item) => item.front}
                refreshing={loading}
                onRefresh={fetchCards}

            />
        </SafeAreaView>
    );
};

export default MyDeckScreen;

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
