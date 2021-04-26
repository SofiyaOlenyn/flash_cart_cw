import React from 'react';
import {SafeAreaView, StyleSheet,ScrollView, Text, View} from 'react-native';

import SearchField from "../components/SearchField";

const SearchScreen = ({navigation}) => {
    return (
        <SafeAreaView
        >
            <View
                style={styles.headerContainer}
            >
                <SearchField/>
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        //   alignItems: 'center',
        //   justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        //  flexDirection: 'row',
        //   justifyContent: 'space-between',
        padding: 15,
    },
})
