import React, {useEffect,useLayoutEffect, useState} from 'react';

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
import {Button, CheckBox, Input} from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
// import * as firebase from "firebase";
import Card from "../components/Card";
import {db} from "../firebase";
import {auth} from "../firebase"

const NewDeckScreen = ({route,navigation}) => {
    //TODO коли нажимаєш на карточку  у флейт листі було едіт її

    const [i, setI] = useState(0);
    const [deckName, setDeckName] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [ourCards, setOurCards] = useState([]);
    let {newCard} = route.params;
    const [loading,setLoading] = useState(false);

    const openNewCardScreen = async function () {
        if(deckName){
        try {
            console.log("CardsDeckScreen:"+ourCards);
           if(newCard==null){
               navigation.navigate("NewCard",{
                   cards:[],
               });
           }
           else{
               if(i==1){
                   navigation.navigate("NewCard",{
                       cards:ourCards,
                   });
               }
               else
                   {
                     setOurCards(newCard)
                       navigation.navigate("NewCard",{
                       cards:ourCards,
                        });
                   }
           }
        } catch (e) {
            console.log(e);
        }finally {
            setI(0);
        }
        }

        //TODO if deckName is empty alarm
    }
    const createDeck = async function () {

        console.log(newCard)
       if(deckName) {
           db.collection("decks").doc( deckName.toString() ).set({
               name: deckName,
               user_id: auth.currentUser.uid,
               visible: isSelected,
               cards: newCard,
           })
               .then(() => {
                   console.log("Document successfully written!");

               })
               .catch((error) => {
                   console.error("Error writing document: ", error);
               });


       }
        setDeckName("");
        setI(1);
        setOurCards([]);
        setSelection(false);
        console.log("route.params  "+route.params.toString());
        console.log("newCard  "+newCard.toString());

    }

    const reset = async () => {
        setDeckName("");
        setI(1);
        setSelection(false);
        setOurCards([]);
    }
    const fetchTweets = async () => {
         setLoading(true);
          if(i==0) {
              setOurCards(newCard)
          }


        setLoading(false);
      //  route.setParams({newCard: []});

    }
    useEffect(() => {
      console.log("xd;v,d;,vlf,vlv")

        if(newCard)
        {
            setOurCards(newCard)
        }

        fetchTweets().then(() =>{});

    },[])

    return (
        <SafeAreaView style={styles.container}>
            {/*<Text style={styles.text}>Add new deck</Text>*/}
            <Input
                style={styles.deckname}
                value={deckName}
                onChangeText={(value) => setDeckName(value)}
                placeholder="Deck name"
                autoFocus
                maxLength = {40}
                multiline={true}
                numberOfLines={1}
            />

            <SafeAreaView style={styles.checkboxContainer}>

                <CheckBox
                    // value={isSelected}
                    // onValueChange={setSelection}
                    style={styles.checkbox}
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                />
                <Text style={styles.text}>Make visible for other</Text>

            </SafeAreaView>

                <SafeAreaView style={styles.containerButtons}>

                    <TouchableOpacity
                        style={styles.buttonCreate}
                        onPress={() => createDeck()}
                    >
                        <Text  style={styles.text}> Create </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonCreate}
                        onPress={() => reset()}
                    >
                        <Text  style={styles.text}> Reset </Text>

                    </TouchableOpacity>

                </SafeAreaView>



           {/*<Card/>*/}
           {/*<Card/>*/}
           {/*     <Card card={item}/>*/}



            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => openNewCardScreen()}
            >
                <Text  style={styles.text}> Add </Text>

            </TouchableOpacity>
            <FlatList

                data={ourCards}
                renderItem={({item}) => <Card card={item}/>}
                keyExtractor={(item) => item.front}
                refreshing={loading}
                onRefresh={fetchTweets}

            />
        </SafeAreaView>
    );
};

export default NewDeckScreen;

const styles = StyleSheet.create({
    containerButtons:{
        flexDirection: 'row',

    }
    ,
        container:{
            flex:1,
            // alignItems:"center",
            // justifyContent:"center",
            padding:10,
            backgroundColor:"#E5E5E5",

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
        margin: 15,
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
