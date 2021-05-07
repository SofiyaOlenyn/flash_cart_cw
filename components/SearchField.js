import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {useNavigation} from '@react-navigation/native';
import DeckLine from "./DeckLine";
import {auth, db} from "../firebase";
import {Input} from "react-native-elements";
import admin from "firebase";


const SearchField = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [usersResults, setUserResults] = useState([]);
    const navigation = useNavigation();

    const listAllUsers = (nextPageToken) => {
        // List batch of users, 1000 at a time.
        admin
            .auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    console.log('user', userRecord.toJSON());
                });
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    listAllUsers(listUsersResult.pageToken);
                }
            })
            .catch((error) => {
                console.log('Error listing users:', error);
            });
    };
// Start listing users from the beginning, 1000 at a time.


    const searchDeck = async () => {


        //load 100 last decks if search input is empty

        if (searchFilter == "") {
            setLoading(true);
            let arr = [];
            const currentUser = auth.currentUser.uid;
            let users = [];
            try {
                db.collection("decks")
                    .where("visible", "==", true)
                    .limit(100)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            arr.push(doc.data())
                            console.log(arr)
                        });


                        setUserResults(arr);
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

            } catch (e) {
                console.log(e);
            } finally {
                //  setUserResults(results);
                setLoading(false);
            }
        }
        //load data
        else {

            setLoading(true);
            let arr = [];
            let users = [];
            try {

                db.collection("decks")
                    .where("name", "==", searchFilter)
                    .where("visible", "==", true)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            arr.push(doc.data())

                        });


                        db.collection("decks")
                            // .where("user_id", "!=",currentUser )
                            .where("tags", "array-contains", searchFilter.toLowerCase())
                            // .where("user_id", "==","user_created_id" )
                            .where("visible", "==", true)

                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    for (let i = 0; i < arr.length; i++) {

                                        if (arr[i].deck_id != doc.data().deck_id) {
                                            arr.push(doc.data())
                                        }

                                    }
                                });

                                setUserResults(arr);

                            })


                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

            } catch (e) {
                console.log(e);
            } finally {
                //  setUserResults(results);
                setLoading(false);
            }

        }
    }



    return (
        <View>
            <View
                style={styles.inputsContainer}
            >

                <TouchableOpacity
                    style={styles.button}
                    onPress={searchDeck}
                >
                    <Text
                        style={styles.buttonText}
                    >Search</Text>
                </TouchableOpacity>


                <Input

                    onChangeText={(value) => setSearchFilter(value)}
                    multiline={true}
                    maxLength={30}
                    numberOfLines={1}
                    style={styles.input}
                    placeholder={"Search deck..."}
                />

            </View>

            <View style={{width: '100%', height: '91.3%'}}>
                <FlatList
                    data={usersResults}
                    renderItem={({item}) => <DeckLine deck={item}/>}
                    keyExtractor={(item) => item.deck_id}
                    refreshing={loading}
                    onRefresh={searchDeck}
                />

            </View>
        </View>
    )
}

export default SearchField;

const styles = StyleSheet.create({


    inputsContainer: {
        flexDirection: 'row',
        //   marginLeft: 10,
    },

    input: {
        maxHeight: 50,
    },
    button: {
        width: 120,
        backgroundColor: "#6C7A89",
        borderRadius: 30,
        height: 40,
    },
    buttonText: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
});



