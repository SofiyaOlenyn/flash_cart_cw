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
import * as firebase from "firebase";


const MyDeckScreen = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [cards, setCards] = useState("");
    const [cardsData, setCardsData] = useState("");
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState("")
    const [allFlag, setAllFlag] = useState(true)
    const [learnedFlag, setLearnedFlag] = useState(false)
    const [notLearnedFlag, setNotLearnedFlag] = useState(false)
    const [learned, setLearned] = useState([])
    const [notLearned, setNotLearned] = useState([])
    const [practiceDecksAmount, setPracticeDecksAmount] = useState(10)

    const {deck} = route.params;
    navigation.setOptions({
        headerBackTitle: "Back",
    })

    const fetchCards = async () => {


        setLoading(true);

        setLearnedCards(deck.cards)

        setCards(deck.cards)
        setDeckName(deck.name)
        if (allFlag) {
            setCardsData(deck.cards)
        } else {
            if (learnedFlag) {
                setCardsData(learned)
            } else {
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
            setCards(deck.cards)
            setLearnedCards(deck.cards)
            if (deck.score == null) {
                setScore("Not learned")
            } else {

                setScore((Math.round(deck.score)).toString() + "%")
            }
        }
    }, [deck])

    const editDeck = async () => {

        if (!deck.added) {

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
    const practiceSpecialDeck = async () => {
        if (cardsData.length == 0) {
        } else {
            let res = [];
            let notInRes = [];
            let box1 = [];
            let box2 = [];
            let box3 = [];
            let box4 = [];

            for (let i = 0; i < deck.cards.length; i++) {
                let k = deck.cards[i].box
                console.log("k " + k)
                switch (k) {
                    case 1:
                        box1.push(deck.cards[i])
                        res.push(deck.cards[i])
                        break;
                    case 2:
                        box2.push(deck.cards[i])
                        break;
                    case 3:
                        box3.push(deck.cards[i])
                        break;
                    default:
                        box4.push(deck.cards[i])
                }
            }


            if (box2.length != 0) {
                for (let i = 0; i < box2.length; i++) {
                    //  console.log("Difference_In_Days "+Date.parse("05/05/2021"))
                    let Difference_In_Time = Date.now() - box2[i].lastSeen;
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
                    console.log("Difference_In_Days 2" + Difference_In_Days)
                    if (Difference_In_Days >= 3) {
                        res.push(box2[i])
                    } else {
                        notInRes.push(box2[i])
                    }
                }
            }

            if (box3.length != 0) {
                for (let i = 0; i < box3.length; i++) {
                    //  console.log("Difference_In_Days "+Date.parse("05/05/2021"))
                    let Difference_In_Time = Date.now() - box3[i].lastSeen;
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
                    console.log("Difference_In_Days3 " + Difference_In_Days)
                    if (Difference_In_Days >= 7) {
                        res.push(box3[i])
                    } else {
                        notInRes.push(box3[i])
                    }
                }
            }

            if (box4.length != 0) {
                for (let i = 0; i < box4.length; i++) {
                    //  console.log("Difference_In_Days "+Date.parse("05/05/2021"))
                    let Difference_In_Time = Date.now() - box4[i].lastSeen;
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
                    console.log("Difference_In_Days4 " + Difference_In_Days)
                    if (Difference_In_Days >= 14) {
                        res.push(box4[i])
                    } else {
                        notInRes.push(box4[i])
                    }
                }

            }

            //if small amount of cards to practice add randomly
            //todo change to number of cards

            // >90 -> 30
            //  -> min 10
            if (deck.cards.length <= 10) {
                if (res.length <= 0.3 * deck.cards.length) {

                    while (res.length <= 0.3 * deck.cards.length) {
                        let index = Math.floor(Math.random() * notInRes.length);
                        let removed = notInRes.splice(index, 1);
                        res.push(removed[0])
                    }
                }
            } else {

                if (res.length <= practiceDecksAmount) {
                    console.log("ldcdkmc")
                    while (res.length <= practiceDecksAmount) {
                        let index = Math.floor(Math.random() * notInRes.length);
                        let removed = notInRes.splice(index, 1);
                        res.push(removed[0])
                    }
                }
                if (res.length >= practiceDecksAmount + 10) {
                    while (res.length >= practiceDecksAmount + 10) {
                        let index = Math.floor(Math.random() * notInRes.length);
                        let removed = res.splice(index, 1);
                        notInRes.push(removed[0])
                    }
                }
            }


            let r = res

            navigation.navigate("PracticeSpecial", {
                deck: deck,
                cardsData: r,
                notInRes: notInRes
            });
            // console.log("r"+JSON.stringify(r))
            // console.log("notInRes"+JSON.stringify(notInRes))
        }
    }

    const practiceDeck = async () => {

        if (cardsData.length == 0) {
        } else {
            console.log("cardsData" + cardsData)

          //   let cardsArr = []
          //
          // let frI = null;
          //   let bI = null;
          //   for (let i = 0; i < cardsData.length; i++) {
          //
          //       if(cardsData[i].frontImage) {
          //           let imageRef = firebase.storage().ref('/' +cardsData[i].frontImage);
          //           imageRef
          //               .getDownloadURL()
          //               .then((url) => {
          //                   //from url you can fetched the uploaded image easily
          //                   frI= url
          //               })
          //               .catch((e) => console.log('getting downloadURL of image error => ', e));
          //       }
          //       if(cardsData[i].backImage) {
          //           let imageRef = firebase.storage().ref('/' +cardsData[i].backImage);
          //           imageRef
          //               .getDownloadURL()
          //               .then((url) => {
          //                   //from url you can fetched the uploaded image easily
          //                   bI = url
          //               })
          //               .catch((e) => console.log('getting downloadURL of image error => ', e));
          //       }
          //       let card = {
          //           front: cardsData[i].front,
          //           frontImage: cardsData[i].frontImage,
          //           frontUrl:frI,
          //           back: cardsData[i].back,
          //           backImage: cardsData[i].backImage,
          //           backUrl:bI,
          //           learned: null,
          //           box: 1,
          //           lastSeen: Date.now()
          //       }
          //       cardsArr.push(card)
          //
          //   }
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

        const currentUser = auth.currentUser.uid;
        let results = [];
        try {

            db.collection("collections").where("user_id", "==", currentUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        results.push(doc.data())
                        console.log("results" + results);
                    });
                    console.log(JSON.stringify("finally"))
                    for (let i = 0; i < results.length; i++) {
                        for (let j = 0; j < results.length; j++) {
                            if (results[i].decks[j].deck_id == deck.deck_id) {

                                let decksToChange = results[i].decks;
                                console.log(JSON.stringify("sss" + decksToChange))
                                console.log(JSON.stringify("j " + j))
                                decksToChange.splice(j, 1);
                                try {
                                    const docRef = db.collection('collections').doc(results[i].collection_id);
                                    const update = docRef.update({
                                        decks: decksToChange
                                    });
                                } catch (e) {

                                }
                            }
                        }

                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });


        } catch (e) {
            console.log(e);
        }


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
            <Text style={styles.tagsName}>Tags: {(deck.tags != null) ? deck.tags.join(" ") : ""}</Text>
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
                onPress={() => practiceSpecialDeck()}
            >
                <Text style={styles.text}> Practice </Text>

            </TouchableOpacity>
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
            margin: 5,
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
        tagsName: {
            fontSize: 20,
            //  fontWeight: "bold",
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
