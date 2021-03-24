import React, {useLayoutEffect} from 'react';

import {KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import * as firebase from "firebase";


const SearchScreen = ({navigation}) => {


    const signOutUser = async function () {
        try {
            await firebase.auth().signOut();

            navigation.replace("Login");
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <SafeAreaView>
            <Text>Serch</Text>
            <ScrollView>
                <CustomListItem/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchScreen;
