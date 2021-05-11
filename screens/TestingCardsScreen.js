import React, {useEffect, useState} from 'react';

import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {auth, db} from "../firebase";
import * as firebase from "firebase";


const TestingCardsScreen = ({route, navigation}) => {

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
    const [answer1, setAnswer1] = useState("");
    const [answered1, setAnswered1] = useState(false);
    const [answer2, setAnswer2] = useState("");
    const [answered2, setAnswered2] = useState(false);
    const [answer3, setAnswer3] = useState("");
    const [answered3, setAnswered3] = useState(false);
    const [answer4, setAnswer4] = useState("");
    const [answered4, setAnswered4] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const [answeredQuestion, setAnsweredQuestion] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [ifItIsCorrect, setIfItIsCorrect] = useState(false);

    const makeAnswer = async () => {

        let answer = ifItIsCorrect;
        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        //console.log(JSON.stringify(cardsData[i]))
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
            if (cardsData[i + 1].backImage) {
                let imageRef = firebase.storage().ref('/' + cardsData[i + 1].backImage);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        //from url you can fetched the uploaded image easily
                        // setImageUrlFront(url)
                        setImage(url);
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            } else {
                setImage("")
            }

            if (cardsData[i + 1].frontImage) {
                let imageRef = firebase.storage().ref('/' + cardsData[i + 1].frontImage);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        //from url you can fetched the uploaded image easily
                        setImageUrlFront(url)
                        setImage(url);
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            }
            setText(cardsData[i + 1].back)
            setImage(imageUrlBack);
            let k = i + 1
            setI(k)
            generateAnswers();
            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

            setAnswered1(false);
            setAnswered2(false);
            setAnswered3(false);
            setAnswered4(false);
            setAnswerText("");
            setAnsweredQuestion(false);
            setCorrectAnswer("");
            setIfItIsCorrect(false);

            // setText(cardsData[i + 1].front)
            // setFront(true)

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

    const answerTest1 = async () => {
        if (!answeredQuestion) {
            setAnsweredQuestion(true)
            setAnswered1(true)
            setAnswered2(false)
            setAnswered3(false)
            setAnswered4(false)

            //  setAnswerText(cardsData[i].front)
            if (answer1 === cardsData[i].front) {
                setAnswerText("Correct")
                setIfItIsCorrect(true)
            } else {
                setAnswerText("Wrong")
                setCorrectAnswer("Answer: " + cardsData[i].front)
                setIfItIsCorrect(false)
            }
        }
        // let answer = answer2;
        // switch (answer) {
        //     case answer1:
        //         setAnswered1(true)
        //         setAnswered2(false)
        //         setAnswered3(false)
        //         setAnswered4(false)
        //         break;
        //     case answer2:
        //         setAnswered1(false)
        //         setAnswered2(true)
        //         setAnswered3(false)
        //         setAnswered4(false)
        //         break;
        //     case answer3:
        //         setAnswered1(false)
        //         setAnswered2(false)
        //         setAnswered3(true)
        //         setAnswered4(false)
        //         break;
        //     default:
        //         setAnswered1(false)
        //         setAnswered2(false)
        //         setAnswered3(false)
        //         setAnswered4(true)
        // }

    }
    const answerTest2 = async () => {
        if (!answeredQuestion) {
            setAnsweredQuestion(true)
            setAnswered1(false)
            setAnswered2(true)
            setAnswered3(false)
            setAnswered4(false)
            if (answer2 === cardsData[i].front) {
                setAnswerText("Correct!!")
                setIfItIsCorrect(true)
            } else {
                setAnswerText("Wrong!!")
                setCorrectAnswer("Answer: " + cardsData[i].front)
                setIfItIsCorrect(false)
            }
        }
    }
    const answerTest3 = async () => {
        if (!answeredQuestion) {
            setAnsweredQuestion(true)
            setAnswered1(false)
            setAnswered2(false)
            setAnswered3(true)
            setAnswered4(false)
            if (answer3 === cardsData[i].front) {
                setAnswerText("Correct!!")
                setIfItIsCorrect(true)
            } else {
                setAnswerText("Wrong!!")
                setCorrectAnswer("Answer: " + cardsData[i].front)
                setIfItIsCorrect(false)
            }
        }
    }
    const answerTest4 = async () => {
        if (!answeredQuestion) {
            setAnsweredQuestion(true)
            setAnswered1(false)
            setAnswered2(false)
            setAnswered3(false)
            setAnswered4(true)
            if (answer4 === cardsData[i].front) {
                setAnswerText("Correct!!")
                setIfItIsCorrect(true)
            } else {
                setAnswerText("Wrong!!")
                setCorrectAnswer("Answer: " + cardsData[i].front)
                setIfItIsCorrect(false)
            }
        }
    }
    const generateAnswers = () => {

        let arr = shuffle(makeRandom());
        setAnswer1(arr[0])
        setAnswer2(arr[1])
        setAnswer3(arr[2])
        setAnswer4(arr[3])

    }

    function makeRandom() {
        let answr = [];
        //
        answr.push(cardsData[i].front);
        // answr.push(cardsData[1].front);
        // answr.push(cardsData[2].front);
        // answr.push(cardsData[3].front);
        let k = 0;


        let index1 = Math.floor(Math.random() * cardsData.length);
        if (index1 != i) {
            answr.push(cardsData[index1].front);
        } else {
            while (true) {
                index1 = Math.floor(Math.random() * cardsData.length);
                if (index1 != i) {
                    answr.push(cardsData[index1].front);
                    break;
                }
            }
        }
        let index2 = Math.floor(Math.random() * cardsData.length);
        if (index2 != i && index2 != index1) {
            answr.push(cardsData[index2].front);
        } else {
            while (true) {
                index2 = Math.floor(Math.random() * cardsData.length);
                if (index2 != i && index2 != index1) {
                    answr.push(cardsData[index2].front);
                    break;
                }
            }
        }
        let index3 = Math.floor(Math.random() * cardsData.length);
        if (index3 != i && index3 != index1 && index3 != index2) {
            answr.push(cardsData[index3].front);
        } else {
            while (true) {
                index3 = Math.floor(Math.random() * cardsData.length);
                if (index3 != i && index3 != index1 && index3 != index2) {
                    answr.push(cardsData[index3].front);
                    break;
                }
            }
        }
        console.log("SS" + answr)
        return answr;
    }

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    useEffect(() => {
        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        loadImageData().then(r => {
            setText(cardsData[i].back)
            console.log(cardsData[i].front)
            setImage(imageUrlBack);
            generateAnswers();


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
            <Text style={styles.text}>Choose correct:</Text>
            <TouchableOpacity
                style={answered1 ? styles.flipButtonActive : styles.flipButton}
                onPress={answerTest1}
            >
                <Text style={styles.text}>{answer1}</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={answered2 ? styles.flipButtonActive : styles.flipButton}
                onPress={answerTest2}
            >
                <Text style={styles.text}>{answer2}</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={answered3 ? styles.flipButtonActive : styles.flipButton}
                onPress={answerTest3}
            >
                <Text style={styles.text}>{answer3}</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={answered4 ? styles.flipButtonActive : styles.flipButton}
                onPress={answerTest4}
            >
                <Text style={styles.text}>{answer4}</Text>

            </TouchableOpacity>

            <Text style={styles.textAnswered}>{answerText}</Text>
            <Text style={styles.textAnswer}>{correctAnswer}</Text>

            <TouchableOpacity style={styles.answerButton}
                //   style={styles.buttonCreate}
                              onPress={() => makeAnswer()}
            >
                <Text style={styles.text}> Next </Text>

            </TouchableOpacity>
            {/*<SafeAreaView style={styles.containerButtons}>*/}

            {/*    <TouchableOpacity style={styles.answerButton}*/}
            {/*        //   style={styles.buttonCreate}*/}
            {/*                      onPress={() => makeAnswer(false)}*/}
            {/*    >*/}
            {/*        <Text style={styles.text}> Not quite </Text>*/}

            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.answerButton}*/}
            {/*        // style={styles.buttonCreate}*/}
            {/*                      onPress={() => makeAnswer(true)}*/}
            {/*    >*/}
            {/*        <Text style={styles.text}> Learned </Text>*/}

            {/*    </TouchableOpacity>*/}

            {/*</SafeAreaView>*/}
        </View>


    );
};

export default TestingCardsScreen;
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
        height: 300,
    },
    text: {
        fontWeight: "bold",
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textAnswered: {
        fontWeight: "bold",
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 30,
        marginBottom: 15
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
        width: 200,
        height: 200,
    },
    withoutImage: {}
})
