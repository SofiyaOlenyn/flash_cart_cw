import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
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
                uri: "https://images-na.ssl-images-amazon.com/images/I/713Sa%2BKDnsL.png",

            }}
                   style={{width: 200, height: 200}}
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
                    secureTextEntry
                    maxLength={40}
                    multiline={true}
                    numberOfLines={1}


                />

            </View>
            <Button
                containerStyle={styles.button}
                onPress={doSingIn}
                title="Login"/>
            <Button
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
                type="outline"
                title="Register"/>


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
        inputContainer: {
            width: 300,
        },
        button: {
            width: 200,
            marginTop: 10,
        }

    }
)
