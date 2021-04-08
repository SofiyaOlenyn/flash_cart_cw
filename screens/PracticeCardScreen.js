import React from 'react';

import {StyleSheet} from 'react-native';

import FlipCard from 'react-native-flip-card'
import FlashCard from "../components/FlashCard";

const PracticeCardScreen = ({route,navigation}) => {


    return (

        <FlashCard/>


    );
};

export default PracticeCardScreen;
const styles = StyleSheet.create({
    card: {
        backgroundColor:"red"
    }})
