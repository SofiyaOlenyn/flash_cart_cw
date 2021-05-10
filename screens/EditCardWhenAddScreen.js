import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {auth} from "../firebase";

const EditCardWhenAddScreen = ({route, navigation}) => {

    const {card} = route.params;
    const {cards} = route.params;

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [imageUrlFront, setImageUrlFront] = useState("");
    const [imageUrlBack, setImageUrlBack] = useState("");
    const [imgFrontChanged, setImgFrontChanged] = useState(false);
    const [imgBackChanged, setImgBackChanged] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Go back",
        })
    }, [navigation])

    useEffect(() => {
        console.log(JSON.stringify(card))
        setFront(card.front)
        setBack(card.back)
        setImageUrlBack(card.imageUrlBack)
        setImageUrlFront(card.imageUrlFront)
    }, [])
    const pickImage = async (side) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                if (side) {
                    if(card.imageUrlFront != ""){
                        setImgFrontChanged(true)
                    }
                    setImageUrlFront(result.uri);
                } else {
                    if(card.imageUrlBack != ""){
                        setImgBackChanged(true)
                    }
                    setImageUrlBack(result.uri);
                }

            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    const uploadImage = async (ID, uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child(ID);
        return ref.put(blob);
    }
    const editCard = async function () {


        let ID1 = null;
        let ID2 = null;


        if(imgFrontChanged){
            let imageRef = firebase.storage().ref('/' + card.frontImage);
            imageRef
                .delete()
                .then(() => {
                    console.log(`${card.frontImage}has been deleted successfully.`);
                })
                .catch((e) => console.log('error on image deletion => ', e));
        }
        if (imgBackChanged) {
            let imageRef = firebase.storage().ref('/' + card.backImage);
            imageRef
                .delete()
                .then(() => {
                    console.log(`${card.backImage}has been deleted successfully.`);
                })
                .catch((e) => console.log('error on image deletion => ', e));
        }

        if(imageUrlFront != "" && !imgFrontChanged )
        {
            ID1=card.frontImage
        }
        if(imageUrlBack != "" && !imgBackChanged )
        {
            ID2=card.backImage
        }
        if(imageUrlFront != "" && card.frontImage==null ) {
            const uuid1 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
            ID1 = uuid1() + "-" + auth.currentUser.uid;
            await uploadImage(ID1,imageUrlFront)
        }
        if(imageUrlBack != "" && card.backImage==null) {
            const uuid2 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
            ID2 = uuid2() + "-" + auth.currentUser.uid;
            await uploadImage(ID2,imageUrlBack)
        }

        const newCard = {
            front: front,
            frontImage:ID1,
            imageUrlFront: imageUrlFront,
            back: back,
            backImage:ID2,
            imageUrlBack: imageUrlBack,
            learned: card.learned,
            box: 1,
            lastSeen: Date.now(),
        }
        if (cards.length == 1) {
            navigation.navigate("NewDeck", {
                newCard: [newCard],
            });
        } else {
            let i = cards.indexOf(card)
            cards.splice(i, 1)
            cards.splice(i, 0, newCard)
            navigation.navigate("NewDeck", {
                newCard: cards,
            });
        }
    }
    const removeImage = (side) => {


        if (side) {
            if(card.imageUrlFront != ""){
                setImgFrontChanged(true)
            }
            setImageUrlFront("");
        } else {
            if(card.imageUrlBack != ""){
                setImgBackChanged(true)
            }
            setImageUrlBack("");
        }
    }
    const deleteCard = async function () {


        if (card.frontImage) {
            let imageRef = firebase.storage().ref('/' + card.frontImage);
            imageRef
                .delete()
                .then(() => {
                    console.log(`${card.frontImage}has been deleted successfully.`);
                })
                .catch((e) => console.log('error on image deletion => ', e));
        }
        if (card.backImage) {
            let imageRef = firebase.storage().ref('/' + card.backImage);
            imageRef
                .delete()
                .then(() => {
                    console.log(`${card.backImage}has been deleted successfully.`);
                })
                .catch((e) => console.log('error on image deletion => ', e));
        }

        if (cards.length == 1) {
            navigation.navigate("NewDeck", {
                newCard: [],
            });
        } else {
            let i = cards.indexOf(card)
            cards.splice(i, 1)
            navigation.navigate("NewDeck", {
                newCard: cards,
            });
        }
    }

    return (

        <View>
            <View
                style={styles.containerInput}
            >
                <View style={styles.inRow}>
                    <TouchableOpacity onPress={() => pickImage(true)}>
                        <MaterialCommunityIcons name="camera" color={"#354649"} size={37}/>
                    </TouchableOpacity>
                    <Input
                        value={front}
                        onChangeText={(value) => setFront(value)}
                        placeholder="Term"
                        //  autoFocus
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
                <TouchableOpacity onPress={() => removeImage(true)}>
                    <Text> {imageUrlFront == "" ? "" : "Remove Image"}</Text>
                </TouchableOpacity>
                <View style={styles.inRow}>
                    <TouchableOpacity onPress={() => pickImage(false)}>
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
                <TouchableOpacity onPress={() => removeImage(false)}>
                    <Text> {imageUrlBack == "" ? "" : "Remove Image"}</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => editCard()}
            >
                <Text style={styles.text}>Edit</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => deleteCard()}
            >
                <Text style={styles.text}>Delete</Text>

            </TouchableOpacity>
        </View>
    );
};

export default EditCardWhenAddScreen;

const styles = StyleSheet.create({
        inRow: {
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
        withoutImage: {}

    }
)
