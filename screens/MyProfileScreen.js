import React from 'react';
import {View} from 'react-native';
import * as firebase from "firebase";
import {auth} from "firebase";
import HeaderForMyProfile from "../components/HeaderForMyProfile";

const MyProfileScreen = ({navigation}) => {

    return (
       <View>
           <HeaderForMyProfile/>
       </View>
    );
};

export default MyProfileScreen;
