import React, {useEffect, useState} from 'react';

import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from 'react-native';
import {CheckBox, Input} from "react-native-elements";
import {db} from "../firebase";

import RadioButton from "react-native-paper";
//import {amount} from "../constant/Colors";
import * as firebase from "firebase";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import {auth} from "firebase";
const EditUserScreen = ({route, navigation}) => {

    const [userName, setUserName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [changed, setChanged] = useState(false);
    const user = auth().currentUser;

    const Separator = () => (
        <View style={styles.separator}/>
    );
    const editUser = async function () {
        if (changed) {
            let imageRef = firebase.storage().ref('/' + user.photoURL);
            imageRef
                .delete()
                .then(() => {
                    console.log(`${user.photoURL}has been deleted successfully.`);
                })
                .catch((e) => console.log('error on image deletion => ', e));
        }
        let ID1 = null
        if(imageUrl != ""  && imageUrl != "https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png" && changed) {
            const uuid1 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
            ID1 = uuid1() + "-"
            await uploadImage(ID1,imageUrl)
        }
        user.updateProfile({
            displayName: userName,
            photoURL: ID1
        }).then(function() {
            // Update successful.
        }).catch(function(error) {
            // An error happened.
        });
        navigation.navigate("MyProfile")


    }
    const uploadImage = async (ID, uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child(ID);
        return ref.put(blob);
    }
    const removeImage =   () => {

        setImageUrl("");

    }
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
            });
            if (!result.cancelled) {

                setImageUrl(result.uri);


            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
        setChanged(true)
    };
    useEffect(() => {


        setUserName(user.displayName)
        console.log(user.photoURL)
       if(user.photoURL== null || user.photoURL==""){
           setImageUrl("https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png")
       }else{
           let imageRef = firebase.storage().ref('/' +user.photoURL);
           imageRef
               .getDownloadURL()
               .then((url) => {
                   //from url you can fetched the uploaded image easily
                   setImageUrl(url)

               })
               .catch((e) => console.log('getting downloadURL of image error => ', e));
       }

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Input
                style={styles.deckName}
                value={userName}
                onChangeText={(value) => setUserName(value)}
                placeholder="User name"
                autoFocus
                maxLength={40}
                multiline={true}
                numberOfLines={1}
            />

   <View style={styles.inRow}>
            <TouchableOpacity onPress={() => pickImage(true)}>
                <MaterialCommunityIcons name="camera" color={"#354649"} size={37}/>
            </TouchableOpacity>
            <View>
            <Image
                source={{uri: imageUrl}}
                style={
                    imageUrl == "" ? styles.withoutImage : styles.image
                }
            />
            <TouchableOpacity onPress={() => removeImage(true)}>
                <Text style={styles.text}> {imageUrl == "" ? "" : "Remove Image"}</Text>
            </TouchableOpacity>
            </View>
            </View>
            <TouchableOpacity
                style={styles.buttonEdit}
                onPress={editUser}
            >
                <Text style={styles.text}> Edit </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default EditUserScreen;

const styles = StyleSheet.create({
    image: {
        marginHorizontal:10,
        width: 140,
        height: 140,
    },
    withoutImage:{

    },
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: "#E5E5E5",

        },
        buttonEdit: {
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            margin: 15,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#6C7A89",

        },
        checkboxContainer: {
            flexDirection: 'row',
        },
        checkbox: {
            marginLeft: 15,
        },
        deckName: {
            margin: 15,
        },
        text: {
            fontWeight: "bold",
            marginLeft: 15,
        },
        button: {
            width: 200,
            marginTop: 10,
        },
        textCardsAmount: {
            marginVertical: 15,
        }
        , separator: {
            marginVertical: 8,
            borderBottomColor: '#354649',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    inRow:{
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
    flexDirection: 'row',

},
    }
)
