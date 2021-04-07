import React, {useLayoutEffect,useState} from 'react';

import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import {auth} from "../firebase"
const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login",
        })
    },[navigation])

    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png"
                }).then(r => {})
            })
            .catch(error => alert(error.message))
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
       <StatusBar style="light" />
        <Text h3 style={{marginBottom:50 , fontSize:40}}>
          Create an account
        </Text>
            <View style={styles.inputContainer}>
               <Input
                   placeholder = 'Full Name'
                   autoFocus
                   type='text'
                   value = {name}
                   onChangeText={(text) => setName(text)}
               />
                <Input
                    placeholder = 'Email'

                    type='email'
                    value = {email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder = 'Password'
                    secureTextEntry
                    type='text'
                    value = {password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder = 'Profile Picture URL (option)'

                    type='text'
                    value = {imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing = {register}
                />

            </View>
            <Button  containerStyle={styles.button} reised onPress={register} title="Register"/>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen ;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    }, inputContainer:{
        width: 300,
    },
    button:{
        width:200,
        marginTop:10,
    }

});
