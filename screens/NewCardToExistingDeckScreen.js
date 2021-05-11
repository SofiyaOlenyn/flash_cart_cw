import React, {useLayoutEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from "react-native-elements";
import {auth, db} from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

const NewCardToExistingDeckScreen = ({route, navigation}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [imageUrlFront, setImageUrlFront] = useState("");
    const [imageUrlBack, setImageUrlBack] = useState("");
    const {deck} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Go back",
        })
    }, [navigation])

    const addCart = async function () {
        let ID1 = null;
        let ID2 = null;

        if(imageUrlFront != "") {
            const uuid1 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
            ID1 = uuid1() + "-" + auth.currentUser.uid;
            await uploadImage(ID1,imageUrlFront)
        }
        if(imageUrlBack != "") {
            const uuid2 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
            ID2 = uuid2() + "-" + auth.currentUser.uid;
            await uploadImage(ID2,imageUrlBack)
        }

        const cards = deck.cards;
        const newDeckName = deck.deck_id;
        const docRef = db.collection('decks').doc(newDeckName);
        const newCard = {
            front: front,
            frontImage:ID1,
            back: back,
            backImage:ID2,
            learned: null,
            box: 1,
            lastSeen:Date.now()
        }

        if (cards.length == 0) {
            try {

                const updateTimestamp = docRef.update({
                    cards: [newCard]
                });

                const updatedDeck = {
                    added: deck.added,
                    cards: [newCard],
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible,
                    score: deck.score,
                    deck_id:deck.deck_id,
                    tags:deck.tags
                }

                console.log("newDeck" + updatedDeck)
                navigation.navigate("MyDeck", {
                    deck: updatedDeck,
                });

            } catch (e) {
                console.log(e)
            }

        } else {
            const newCards = cards.concat([newCard]);
            try {

                const updateTimestamp = docRef.update({
                    cards: newCards
                });

                const updatedDeck = {
                    added: deck.added,
                    cards: newCards,
                    name: deck.name,
                    user_id: deck.user_id,
                    user_id_creator: deck.user_id_creator,
                    visible: deck.visible,
                    score: deck.score,
                    deck_id:deck.deck_id,
                    tags:deck.tags
                }

                console.log("newDeck" + updatedDeck)
                navigation.navigate("MyDeck", {
                    deck: updatedDeck,
                });

            } catch (e) {
                console.log(e)
            }


        }
    }

    const removeImage =   (side) => {
        if(side){
            setImageUrlFront("");
        }else{
            setImageUrlBack("");
        }
    }
    const pickImage = async (side) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
            });
            if (!result.cancelled) {
                if(side){
                    setImageUrlFront(result.uri);
                }else{
                    setImageUrlBack(result.uri);
                }

            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    const uploadImage = async (ID,uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child(ID);
        return ref.put(blob);
    }
    return (

        <View
        >

            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => addCart()}
            >
                <Text style={styles.text}>Add cart</Text>

            </TouchableOpacity>

            <View
                style={styles.containerInput}
            >

                <View style={styles.inRow}>
                    <TouchableOpacity onPress={() =>pickImage(true)}>
                        <MaterialCommunityIcons name="camera" color={"#354649"} size={37}/>
                    </TouchableOpacity>
                    <Input
                        value={front}
                        onChangeText={(value) => setFront(value)}
                        placeholder="Term"
                        autoFocus
                        maxLength={30}
                        multiline={true}
                        numberOfLines={1}
                    />

                </View>

                {/*<TouchableOpacity onPress={() =>pickImage(false)}>*/}
                {/*    <MaterialCommunityIcons name="close" color={"#354649"} size={37}/>*/}
                {/*</TouchableOpacity>*/}
                <Image
                    source={{uri: imageUrlFront}}
                    style={
                        imageUrlFront == "" ? styles.withoutImage : styles.image
                    }
                />
                <TouchableOpacity onPress={() =>removeImage(true)}>
                    <Text> {  imageUrlFront == "" ? "" : "Remove Image"}</Text>
                </TouchableOpacity>
                <View style={styles.inRow}>
                    <TouchableOpacity onPress={() =>pickImage(false)}>
                        <MaterialCommunityIcons name="camera" color={"#354649"} size={37}/>
                    </TouchableOpacity>
                    <Input
                        value={back}
                        onChangeText={(value) => setBack(value)}
                        placeholder="Definition"

                        maxLength={300}
                        multiline={true}
                        numberOfLines={1}
                    />
                </View>
                <Image
                    source={{uri: imageUrlBack}}
                    style={
                        imageUrlBack == "" ? styles.withoutImage : styles.image
                    }
                />
                <TouchableOpacity onPress={() =>removeImage(false)}>
                    <Text> {  imageUrlBack == "" ? "" : "Remove Image"}</Text>
                </TouchableOpacity>

            </View>
            {/*<TouchableOpacity onPress={pickImage(true)}>*/}
            {/*    <Text //style={styles.pickImage}*/}
            {/*    >Pick a image</Text>*/}
            {/*</TouchableOpacity>*/}


        </View>
    );
};

export default NewCardToExistingDeckScreen;

const styles = StyleSheet.create({
        inRow:{
            marginLeft: 15,
            flexDirection: 'row',
        },

        buttonAdd: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 60,
            width: 300,
            marginTop: 30,
            height: 36,
            borderRadius: 100,
            backgroundColor: "#6C7A89",
        },
        containerInput: {
            marginTop: 50,
            padding: 10,
            borderRadius: 35,
            backgroundColor: "#A3C6C4",
            margin: 5,
            alignItems: 'center',

        },
        text: {
            fontSize: 20,
            // fontWeight: "bold",
        },
        image: {
            width: 150,
            height: 150,
        },
        withoutImage:{

        }

    }
)
