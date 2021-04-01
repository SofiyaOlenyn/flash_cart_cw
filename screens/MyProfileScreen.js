import React, {useLayoutEffect} from 'react';

import {KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";

import * as firebase from "firebase";
import {auth} from "firebase";
import HeaderForMyProfile from "../components/HeaderForMyProfile";



const MyProfileScreen = ({navigation}) => {


    const signOutUser = async function () {
        try {
            await firebase.auth().signOut();

            navigation.replace("Login");
        } catch (e) {
            console.log(e);
        }
    }
    const user = auth().currentUser;

    return (
       <View>
           <HeaderForMyProfile/>
       </View>
    );
};

export default MyProfileScreen;
