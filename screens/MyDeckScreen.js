import React, {useEffect, useLayoutEffect, useState} from 'react';

import {
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../components/Card";

const MyDeckScreen = ({route,navigation}) => {

    const [deckName, setDeckName] = useState("");
    const [ deckP, setDeckP] = useState("");
    const [ cards, setCards] = useState("");
    const { deck } = route.params;

    useEffect(() =>{
        if(deck) {
            setDeckName(deck.name)
            setDeckP(deck)
            setCards(deck.cards)
        }
    },[])


    return (
        <SafeAreaView style={styles.container}>


            <Text style={styles.deckname}>{deckName}</Text>



            <SafeAreaView style={styles.containerEditButtons}>

                <TouchableOpacity
                   style={styles.buttonsEdit}
                    //onPress={() => createDeck()}
                >
                    <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={25} />


                </TouchableOpacity>
                <TouchableOpacity
                   style={styles.buttonsEdit}
                  //  onPress={() => reset()}
                >
                    <MaterialCommunityIcons name="delete" color={"#354649"} size={25} />

                </TouchableOpacity>
                <TouchableOpacity
                      style={styles.buttonsEdit}
                    //  onPress={() => reset()}
                >

                    <MaterialCommunityIcons name="plus-box" color={"#354649"}  size={25} />

                </TouchableOpacity>

            </SafeAreaView>
            <SafeAreaView style={styles.containerProgress}>


                <Text  style={styles.scoreText}>Score 110%</Text>

                <TouchableOpacity
                    style={styles.buttonsEdit}
                    //onPress={() => createDeck()}
                >
                    <Text>All()</Text>


                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                    //  onPress={() => reset()}
                >
                    <Text>Not quite()</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonsEdit}
                    //  onPress={() => reset()}
                >

                    <Text>Got it()</Text>

                </TouchableOpacity>

            </SafeAreaView>

            <TouchableOpacity
                style={styles.buttonAdd}
                // onPress={() => openNewCardScreen()}
            >
                <Text  style={styles.text}> Practise all </Text>

            </TouchableOpacity>

            <FlatList

                data={cards}
                renderItem={({item}) => <Card card={item}/>}
                keyExtractor={(item) => item.front}
              //  refreshing={loading}
              //  onRefresh={fetchTweets}

            />
        </SafeAreaView>
    );
};

export default MyDeckScreen;

const styles = StyleSheet.create({
    containerEditButtons:{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight:13,


        }
        ,
    buttonsEdit:{
        marginHorizontal:8,
    },
    containerProgress:{
        flexDirection: 'row',
        marginTop:15,
        marginLeft:19,
    },

        container:{
            flex:1,
            // alignItems:"center",
            // justifyContent:"center",
            padding:10,
            backgroundColor:"#E5E5E5",

        },
    scoreText:{
        marginRight:8,
        fontSize:15,
        backgroundColor:"#A3C6C4",
        color:"black"
    },

        buttonAdd:{
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: 20,

            // width: 150,
            margin: 15,
            height:50,
            borderRadius: 20,

            backgroundColor:"#6C7A89",
            // borderBottomColor:"#49559f",
        },
        buttonCreate:{
            alignContent: "center",
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            width: 192,
            // marginTop: 30,
            height:50,
            borderRadius: 20,
            backgroundColor:"#6C7A89",
            // borderBottomColor:"#49559f",
        },
        checkboxContainer: {
            flexDirection: 'row',
            // marginLeft: 15,
        },
        checkbox: {

            marginLeft: 15,
        },
        deckname:{
            fontSize: 27,
            fontWeight: "bold",
            marginHorizontal: 25,
            marginTop: 13,
            alignItems: 'center',

        },
        text:{
            fontWeight: "bold",
            margin: 15,
        },
        inputContainer:{
            width: 300,
        },
        button:{
            width:200,
            marginTop:10,
        }

    }
)
