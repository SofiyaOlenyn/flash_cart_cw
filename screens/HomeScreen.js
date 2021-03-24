import React, {useLayoutEffect} from 'react';

import {KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";

import ButtomTabNavigation from "../navigation/BottomTabNavigation";


const HomeScreen = ({navigation}) => {

    const navigaion = useNavigation();
    const signOutUser = async function () {
        try {
            await firebase.auth().signOut();

            navigation.replace("Login");
        } catch (e) {
            console.log(e);
        }
    }
    const changePr = async function () {
        try {

            navigaion.navigate("MyProfile");

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <SafeAreaView>
            <Button title="logout" onPress={() => signOutUser()} />
            <Button title="My profile" onPress={() => changePr()} />
       <ScrollView>
 <CustomListItem/>
        </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
