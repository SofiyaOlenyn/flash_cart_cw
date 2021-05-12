import React, {useLayoutEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import {auth} from "../firebase"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation])
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
    };
    const uploadImage = async (ID,uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child(ID);
        return ref.put(blob);
    }

    const register = () => {

        let imageId = null;
        if(imageUrl != "") {
            const uuid1 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
            imageId = uuid1() + "-ssd"
            uploadImage(imageId, imageUrl).then(r =>{
                auth.createUserWithEmailAndPassword(email, password)
                    .then(authUser => {
                        authUser.user.updateProfile({
                            displayName: name,
                            photoURL: imageId
                        }).then(r => {
                        })
                    })
                    .catch(error => alert(error.message))
            } )

        }

    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 20, fontSize: 40}}>
                Create an account
            </Text>
            <View style={styles.inputContainer}>
                {/*<View style={styles.inRow}>*/}
                {/*<TouchableOpacity onPress={() =>pickImage()}>*/}
                {/*    <MaterialCommunityIcons name="camera" color={"#354649"} size={37}/>*/}
                {/*</TouchableOpacity>*/}
                {/*    <View>*/}
                {/*<Image*/}
                {/*    source={{uri: imageUrl}}*/}
                {/*    style={*/}
                {/*        imageUrl == "" ? styles.withoutImage : styles.image*/}
                {/*    }*/}
                {/*/>*/}

                {/*<TouchableOpacity onPress={ imageUrl == "" ? pickImage :removeImage }>*/}
                {/*    <Text style={styles.text}> {  imageUrl == "" ? "Pick photo" : "Remove Image"}</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder='Email'

                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type='text'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                {/*<Input*/}
                {/*    placeholder='Profile Picture URL (option)'*/}

                {/*    type='text'*/}
                {/*    value={imageUrl}*/}
                {/*    onChangeText={(text) => setImageUrl(text)}*/}
                {/*    onSubmitEditing={register}*/}
                {/*/>*/}

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={register}

            >

                <Text>Register</Text>

            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
         justifyContent: "center",
        //marginTop: 5,
        backgroundColor: "white",
    }, inputContainer: {
        width: 300,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",

        width: 200,
        marginTop: 5,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#6C7A89",
    },image: {
        marginHorizontal:10,
        width: 100,
        height: 90,
    },
    withoutImage:{

    }, inRow:{

        flexDirection: 'row',

    },
    text:{
       color:"#808080",
        marginLeft:15,

    }

});
