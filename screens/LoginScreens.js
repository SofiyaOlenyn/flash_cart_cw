import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input, Image} from 'react-native-elements'
import {StatusBar} from "expo-status-bar";
import {auth} from "../firebase"
import {db} from "../firebase";
import * as firebase from "firebase";
import Expo from "expo"
import * as Google from 'expo-google-app-auth'
const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])

    const registerGoogle = async () => {
        //
        // const loginResult = await Expo.Google.logInAsync({
        //    // androidClientId: 'My android ClientId',
        //    // androidStandaloneAppClientId: 'My android standalone ClientId',
        //     behavior: 'web',
        //     iosClientId: '467895483224-7nl79vu8ao3ncdal3jt6cldbdg7mk09b.apps.googleusercontent.com',
        //     scopes: ['profile', 'email'],
        // });
        // if(loginResult.type === 'success'){
        //     console.log(loginResult.user.name + " : " + loginResult.user.id + " : " + loginResult.user.email)
        //     const provider = firebase.auth.GoogleAuthProvider
        //     const credential = provider.credential(null, loginResult.accessToken)
        //    // Actions.course();
        //     return firebase.auth().signInWithCredential(credential)
        // }else {
        //    // Alert.alert("Login Error");
        // }
        console.log("1")
        var provider = new firebase.auth.GoogleAuthProvider();

        console.log("2")
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {

        });
        auth.signInWithPopup(provider).then(function (result) {
            console.log("3")
        }).catch(function (error) {

        });
    };
    const doSingIn = async () => {
        try {
            console.error(email)
            let response = await auth.signInWithEmailAndPassword(email, password)
            if (response && response.user) {
                console.log("Success ???", "Authenticated successfully")
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (

        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light"/>
            <Image source={{
                uri: "https://i.postimg.cc/02JbFwVr/photo-2021-04-23-13-12-12.jpg",

            }}
                   style={{width: 600, height: 200}}
            />


            <View style={styles.inputContainer}>

                <Input
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Email"
                    autoFocus
                    maxLength={40}
                    multiline={true}
                    numberOfLines={1}
                />
                {/*//TODO to add security to password*/}
                <Input
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder="Password"
                    textContentType={"password"}
                    secureTextEntry={true}
                    maxLength={40}
                    multiline={true}
                    numberOfLines={1}
                    keyboardType={"default"}

                />

            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => doSingIn()}
            >
                <Text style={styles.text}>Login</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonGoogle}
                onPress={registerGoogle}

            >
                <Image source={{
                    uri: "https://developers.google.com/identity/images/g-logo.png",

                }}
                       style={{width: 25, height: 25, marginRight: 10}}
                />
                <Text>Log In with Google</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Register')}

            >

                <Text>Register</Text>

            </TouchableOpacity>


            <View style={{height: 100}}/>

        </KeyboardAvoidingView>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            backgroundColor: "white",
        },
        text: {
            fontWeight: "bold",
        },
        inputContainer: {
            width: 300,
        },
        buttonGoogle: {
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            marginTop: 10,
            height: 30,
            borderRadius: 20,
            backgroundColor: "white",
            borderColor: "#6C7A89",
            borderWidth: 1,
            flexDirection: 'row',
        },
        button: {
            alignItems: "center",
            justifyContent: "center",

            width: 200,
            marginTop: 10,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#6C7A89",
        }

    }
)
