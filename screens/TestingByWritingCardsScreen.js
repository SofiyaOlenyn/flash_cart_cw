import React, {useEffect, useState} from 'react';

import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {auth, db} from "../firebase";
import * as firebase from "firebase";
import {Input} from "react-native-elements";


const TestingByWritingCardsScreen = ({route, navigation}) => {

    const {deck} = route.params;
    const {cardsData} = route.params;
    const {notInRes} = route.params;
    const [imageUrlFront, setImageUrlFront] = useState("");
    const [imageUrlBack, setImageUrlBack] = useState("");
    const [image, setImage] = useState("");

    // const {learnAll} = route.params;
    const [cards, setCards] = useState([]);
    const [text, setText] = useState("");
    const [front, setFront] = useState(true);
    const [i, setI] = useState(0);
    const [answer, setAnswer] = useState("");

    const [answerText, setAnswerText] = useState("");
    const [answeredQuestion, setAnsweredQuestion] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [ifItIsCorrect, setIfItIsCorrect] = useState(false);

    const makeAnswer = async () => {

        let answer = ifItIsCorrect;
        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        let boxNum;
        if (answer) {

            if (cardsData[i].box == 4) {
                boxNum = 4;
            } else {
                boxNum = cardsData[i].box + 1;
            }
        } else {
            if (cardsData[i].box == 1) {
                boxNum = 1;
            } else {
                boxNum = cardsData[i].box - 1;
            }
        }
        console.log(boxNum)
        let card = {
            front: cardsData[i].front,
            frontImage: cardsData[i].frontImage,
            back: cardsData[i].back,
            backImage: cardsData[i].backImage,
            learned: answer,
            box: boxNum,
            lastSeen: Date.now()
        }

        let tmp = cards.concat([card])
        setCards(tmp)
        if (cardsData.length == i + 1) {

            let cardsArr = []

            cardsArr = tmp.concat(notInRes)
            // let score = countScore(cardsArr);
            const docRef = db.collection('decks').doc(deck.deck_id);
            const updateTimestamp = docRef.update({
                cards: cardsArr
            });

            const updatedDeck = {
                deck_id: deck.deck_id,
                score: deck.score,
                added: deck.added,
                cards: cardsArr,
                name: deck.name,
                user_id: deck.user_id,
                user_id_creator: deck.user_id_creator,
                visible: deck.visible,
                tags: deck.tags
            }
            navigation.navigate("MyDeck", {
                deck: updatedDeck,
            });

        } else {
            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

            if (cardsData[i + 1].backImage) {
                setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

                let imageRef = firebase.storage().ref('/' + cardsData[i + 1].backImage);
                imageRef
                    .getDownloadURL()
                    .then((url) => {

                        setImage(url);
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            } else {
                setImage("")
            }


            setText(cardsData[i + 1].back)
            setImage(imageUrlBack);
            let k = i + 1
            setI(k)

            setAnswerText("");
            setAnswer("");
            setAnsweredQuestion(false);
            setCorrectAnswer("");
            setIfItIsCorrect(false);


        }
    }
    const loadImageData = async () => {
        setImage("")
        if (cardsData[i].backImage) {
            let imageRef = firebase.storage().ref('/' + cardsData[i].backImage);
            imageRef
                .getDownloadURL()
                .then((url) => {
                    //from url you can fetched the uploaded image easily
                    setImageUrlFront(url)
                    setImage(url);
                })
                .catch((e) => console.log('getting downloadURL of image error => ', e));
        }

    }
    const checkAnswer = async () => {
        if (!answeredQuestion) {
            setAnsweredQuestion(true)
            if (answer === cardsData[i].front) {
                setAnswerText("Correct")
                setIfItIsCorrect(true)
            } else {
                setAnswerText("Wrong")
                setCorrectAnswer("Answer: " + cardsData[i].front)
                setIfItIsCorrect(false)
            }
        }

    }


    useEffect(() => {
        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        loadImageData().then(r => {
            setText(cardsData[i].back)
            console.log(cardsData[i].front)
            setImage(imageUrlBack);


        });
    }, [])

    return (


        <View style={styles.container}>

            <Text style={styles.counter}>{i + 1}/{cardsData.length}</Text>
            <View style={styles.flashcard}>
                <Image
                    source={{uri: image}}
                    style={
                        image == "" ? styles.withoutImage : styles.image
                    }
                />
                <Text style={styles.text}>{text}</Text>

            </View>
            <Text style={styles.text}>Write correct answer:</Text>
            <Input
                value={answer}
                onChangeText={(value) => setAnswer(value)}
                placeholder="Term"
                maxLength={300}
                multiline={true}
                numberOfLines={1}
            />


            <TouchableOpacity style={styles.flipButton}
                //   style={styles.buttonCreate}
                              onPress={() => checkAnswer()}
            >
                <Text style={styles.text}> Check </Text>

            </TouchableOpacity>
            <Text style={styles.textAnswered}>{answerText}</Text>
            <Text style={styles.textAnswer}>{correctAnswer}</Text>

            <TouchableOpacity style={styles.answerButton}
                //   style={styles.buttonCreate}
                              onPress={() => makeAnswer()}
            >
                <Text style={styles.text}> Next </Text>

            </TouchableOpacity>
        </View>


    );
};

export default TestingByWritingCardsScreen;
const styles = StyleSheet.create({
    counter: {
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        // marginRight: 40,
        marginBottom: 15,
    },
    container: {
        // justifyContent: 'center',
        //marginTop: 10,
        flex: 1,
        padding: 10,
        backgroundColor: "#E5E5E5",
    },
    answerButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: "bold",
        marginHorizontal: 40,
        borderRadius: 5,
        borderColor: "#A3C6C4",
        borderWidth: 3,
        width: 100,
        height: 50,
    },
    flipButton: {
        fontWeight: "bold",
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        backgroundColor: "#6C7A89",
        height: 35,

        // position: 'absolute',
        // bottom:5
    },
    flipButtonActive: {
        fontWeight: "bold",
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        backgroundColor: "#A3C6C4",
        height: 35,

        // position: 'absolute',
        // bottom:5
    }
    ,
    flashcard: {
        // alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 35,
        borderColor: "#354649",
        borderWidth: 1,
        backgroundColor: "#A3C6C4",
        margin: 5,
        height: 190,
    },
    text: {
        marginVertical: 10,
        fontWeight: "bold",
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textAnswered: {
        fontWeight: "bold",
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 30,
        marginBottom: 5
    },
    textAnswer: {
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 15
        //alignSelf: 'center',
        // justifyContent: 'center',
    },
    containerButtons: {
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
    , image: {
        marginTop: 25,
        width: 170,
        height: 170,
    },
    withoutImage: {}
})
