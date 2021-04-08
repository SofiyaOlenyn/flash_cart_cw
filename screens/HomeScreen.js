import React, {useState, useEffect} from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {db} from "../firebase";
import Deck from "../components/Deck";
import {auth} from "../firebase"

const HomeScreen = ({navigation}) => {

    const [decks, setDecks] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchDecks = async () => {
        setLoading(true);
        const currentUser = auth.currentUser.uid;
        try {
            let results = [];
            db.collection("decks").where("user_id", "==", currentUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        results.push(doc.data())
                        // console.log("results"+results);
                    });
                    setDecks(results);

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDecks().then(r => {
        });
    }, [])


    return (
        <SafeAreaView>
            <SafeAreaView style={styles.containerButtons}>

                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => fetchDecks()}
                >
                    <Text style={styles.text}> My decks </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonCreate}
                >
                    <Text style={styles.text}> My collections </Text>

                </TouchableOpacity>

            </SafeAreaView>
            <FlatList
                data={decks}
                renderItem={({item}) => <Deck deck={item}/>}
                refreshing={loading}
                onRefresh={fetchDecks}
            />

        </SafeAreaView>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
    }
    ,
    text: {
        fontWeight: "bold",
    },
    buttonCreate: {
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
        width: 210,
        height: 40,
        backgroundColor: "#6C7A89",
    },


})
