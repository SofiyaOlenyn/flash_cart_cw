
import React, {useEffect, useState} from 'react';

import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {auth, db} from "../firebase";
import * as firebase from "firebase";


const PracticeCardScreen = ({route, navigation}) => {

    const {deck} = route.params;
    const {cardsData} = route.params;
    const {learnAll} = route.params;
    const [cards, setCards] = useState([]);
    const [text, setText] = useState("");
    const [front, setFront] = useState(true);
    const [imageUrlFront, setImageUrlFront] = useState("");
    const [imageUrlBack, setImageUrlBack] = useState("");
    const [image, setImage] = useState("");
    const [i, setI] = useState(0);


    const flipCart = async () => {

        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        if (front) {
            if(cardsData[i].backImage) {
                let imageRef = firebase.storage().ref('/' +cardsData[i].backImage);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        //from url you can fetched the uploaded image easily
                        setImageUrlBack(url)
                        setImage(url);
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            }else{
                setImage("")
            }
            //setImage(imageUrlBack)
            setText(cardsData[i].back)
            setFront(false)
        } else {
            if(cardsData[i].frontImage) {
                let imageRef = firebase.storage().ref('/' +cardsData[i].frontImage);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        //from url you can fetched the uploaded image easily
                        setImageUrlFront(url)
                        setImage(url);
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            }else{
                setImage("")
            }
          //  setImage(imageUrlFront)
            setText(cardsData[i].front)
            setFront(true)
        }
    }
    const countScore = (x) => {
        let correctAmount = 0;
        for (let k = 0; k < x.length; k++) {
            if (x[k].learned == true) {
                correctAmount++
            }
        }
        let score = correctAmount * 100 / x.length;
        return score;
    }

    const makeAnswer = async (answer) => {
        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        let boxNum;
        if(answer){

            if(cardsData[i].box==4){
                boxNum=4;
            }
            else{
                boxNum=cardsData[i].box+1;
            }
        }
        else{
            if(cardsData[i].box==1){
                boxNum=1;
            }
            else{
                boxNum=cardsData[i].box-1;
            }
        }
        let card = {
            front: cardsData[i].front,
            frontImage: cardsData[i].frontImage,
            back: cardsData[i].back,
            backImage: cardsData[i].backImage,
            learned: answer,
            box: boxNum,
            lastSeen:Date.now()
        }
        let tmp = cards.concat([card])
        setCards(tmp)
        if (cardsData.length == i + 1) {

            let cardsArr = []
            if (!learnAll) {
                let j = 0;

                for (let k = 0; k < deck.cards.length; k++) {
                    if (deck.cards[k].back == tmp[j].back && deck.cards[k].front == tmp[j].front &&
                        deck.cards[k].backImage == tmp[j].backImage && deck.cards[k].frontImage == tmp[j].frontImage
                    ) {
                        cardsArr = cardsArr.concat([tmp[j]])
                        j++
                    } else {
                        cardsArr = cardsArr.concat([deck.cards[k]])
                    }
                }
            } else {
                cardsArr = tmp
            }

            let score = countScore(cardsArr);
            const docRef = db.collection('decks').doc(deck.deck_id);
            const updateTimestamp = docRef.update({
                score: score,
                cards: cardsArr
            });

            const updatedDeck = {
                deck_id: deck.deck_id,
                score: score,
                added: deck.added,
                cards: cardsArr,
                name: deck.name,
                user_id: deck.user_id,
                user_id_creator: deck.user_id_creator,
                visible: deck.visible,
                tags:deck.tags
            }
            navigation.navigate("MyDeck", {
                deck: updatedDeck,
            });

        } else {

            if(cardsData[i+1].frontImage) {
                let imageRef = firebase.storage().ref('/' +cardsData[i+1].frontImage);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        //from url you can fetched the uploaded image easily
                        setImageUrlFront(url)
                        setImage(url);
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            }else{
                setImage("")
            }
            setText(cardsData[i + 1].front)
            setFront(true)


            let k = i + 1
            setI(k)
          //await loadImageData(i);



        }
    }
    const loadImageData = async () =>

    {
        setImage("")
        if(cardsData[i].frontImage) {
            let imageRef = firebase.storage().ref('/' +cardsData[i].frontImage);
            imageRef
                .getDownloadURL()
                .then((url) => {
                    //from url you can fetched the uploaded image easily
                    setImageUrlFront(url)
                    setImage(url);
                })
                .catch((e) => console.log('getting downloadURL of image error => ', e));
        }
        if(cardsData[i].backImage) {
            let imageRef = firebase.storage().ref('/' +cardsData[i].backImage);
            imageRef
                .getDownloadURL()
                .then((url) => {
                    //from url you can fetched the uploaded image easily
                    setImageUrlBack(url)
                })
                .catch((e) => console.log('getting downloadURL of image error => ', e));
        }
    }
    useEffect(() => {
        setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/1024px-Vector_Loading.svg.png")

        loadImageData().then(r => {
            setText(cardsData[i].front)
            console.log(cardsData[i].frontImage)
            setImage(imageUrlFront);

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
            <TouchableOpacity
                style={styles.flipButton}
                onPress={flipCart}
            >
                <Text style={styles.text}>FLIP</Text>

            </TouchableOpacity>


            <SafeAreaView style={styles.containerButtons}>

                <TouchableOpacity style={styles.answerButton}
                    //   style={styles.buttonCreate}
                                  onPress={() => makeAnswer(false)}
                >
                    <Text style={styles.text} > Not quite </Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton}
                    // style={styles.buttonCreate}
                                  onPress={() => makeAnswer(true)}
                >
                    <Text style={styles.text}> Learned </Text>

                </TouchableOpacity>

            </SafeAreaView>
        </View>


    );
};

export default PracticeCardScreen;
const styles = StyleSheet.create({
    counter: {
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        // marginRight: 40,
        marginBottom: 15,
    },
    container: {
        justifyContent: 'center',
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
        width:100,
        height:50,
    },
    flipButton: {
        fontWeight: "bold",
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginHorizontal: 30,
        borderRadius: 35,
        backgroundColor: "#6C7A89",
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
    containerButtons: {
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
    ,image: {
        width: 200,
        height: 200,
    },
    withoutImage: {}
})
