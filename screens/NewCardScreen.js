import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import {auth} from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NewCardScreen = ({route, navigation}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [imageUrlFront, setImageUrlFront] = useState("");
    const [imageUrlBack, setImageUrlBack] = useState("");
    const [img, setImg] = useState("");
    const {cards} = route.params;

    // const getPermissionAsync = async () => {
    //     if (Platform.OS !== 'web') {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // };
    //
    //
    // useEffect(() => {
    //     getPermissionAsync()
    // }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Go back",
        })
    }, [navigation])


    const addCart = async function () {
        // let today = new Date();
        //
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        //
        // // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //
        // let dateTime = date+' '+time;

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


        try {
            const item = {
                front: front,
                frontImage:ID1,
                imageUrlFront: imageUrlFront,
                back: back,
                backImage:ID2,
                imageUrlBack: imageUrlBack,
                learned: null,
                box: 1,
                lastSeen: Date.now()
            }
            let newCards = null;
            if (cards == null || cards.length == 0) {
                newCards = [item];
                console.log(cards.length)
            } else {
                newCards = cards.concat([item]);
            }
            navigation.navigate("NewDeck", {
                newCard: newCards,
            });

        } catch (e) {
            console.log(e);
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
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
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
    // const uploadImage = async (uri) => {
    //     // let imageRef = firebase.storage().ref('/' + "my-image");
    //     // imageRef
    //     //     .getDownloadURL()
    //     //     .then((url) => {
    //     //         //from url you can fetched the uploaded image easily
    //     //         setImg(url)
    //     //     })
    //     //     .catch((e) => console.log('getting downloadURL of image error => ', e));
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
    //     const ID = uuid() + "-" + auth.currentUser.uid;
    //     let ref = firebase.storage().ref().child(ID);
    //     return ref.put(blob);
    // }

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

export default NewCardScreen;

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
