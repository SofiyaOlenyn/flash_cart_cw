import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input, Image} from 'react-native-elements'
import {StatusBar} from "expo-status-bar";
import {auth} from "../firebase"

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


    const doSingIn = async () => {
        try {
            console.error(email)
            let response = await auth.signInWithEmailAndPassword(email, password)
            if (response && response.user) {
                console.log("Success ✅", "Authenticated successfully")
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
    text:{
        fontWeight: "bold",
    },
        inputContainer: {
            width: 300,
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
