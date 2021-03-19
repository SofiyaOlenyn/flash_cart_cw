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
                    photoURL: imageUrl || "data:image/png;base64,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"

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
