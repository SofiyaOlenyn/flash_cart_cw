import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import CustomListItem from "../components/CustomListItem";
import * as firebase from "firebase";

const SearchScreen = ({navigation}) => {
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
