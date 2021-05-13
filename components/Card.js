import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/core";
import * as firebase from "firebase";

const Card= ({card, cards}) => {
    const [imageUrlFront, setImageUrlFront] = useState("");
    const [imageUrlBack, setImageUrlBack] = useState("");
    const Separator = () => (
        <View style={styles.separator}/>
    );
    const navigation = useNavigation();

    useEffect(() => {
        if(card.frontImage) {
            let imageRef = firebase.storage().ref('/' +card.frontImage);
            imageRef
                .getDownloadURL()
                .then((url) => {
                    //from url you can fetched the uploaded image easily
                    setImageUrlFront(url)
                })
                .catch((e) => console.log('getting downloadURL of image error => ', e));
        }
        if(card.backImage) {
            let imageRef = firebase.storage().ref('/' +card.backImage);
            imageRef
                .getDownloadURL()
                .then((url) => {
                    //from url you can fetched the uploaded image easily
                    setImageUrlBack(url)
                })
                .catch((e) => console.log('getting downloadURL of image error => ', e));
        }


    }, [])

    if ( imageUrlFront ===imageUrlBack &&imageUrlBack == "")
    {
        return (


            <View

                style={styles.container}>
                < SafeAreaView

                    // style={
                    //     card.imageUrlFront == "" ?
                    //         (card.imageUrlBack = "" ? styles.containerText : styles.imageOne) :
                    //         (card.imageUrlBack = "" ? styles.imageOne : styles.imageTwo)
                    // }
                >
                    <Text style={styles.frontText}> {card.front}</Text>
                    {/*<Image*/}
                    {/*    source={{uri: imageUrlFront}}*/}
                    {/*    style={*/}
                    {/*        card.imageUrlFront == "" ? styles.withoutImage : styles.image*/}
                    {/*    }*/}
                    {/*/>*/}
                    <Separator/>
                    <Text>{card.back} </Text>
                    <Image
                        source={{uri: imageUrlBack}}
                        style={
                            card.imageUrlBack == "" ? styles.withoutImage : styles.image
                        }
                    />
                </SafeAreaView>
                < SafeAreaView style={styles.containerEditButtons}>
                    <TouchableOpacity
                        style={styles.buttonsEdit}
                        onPress={() => openDeckScreen()}
                    >
                        <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={20}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    } else {


        if (imageUrlFront != "" && imageUrlBack != "") {
            return (


                <View

                    style={styles.imageTwo}>
                    < SafeAreaView
                        style={styles.containerText}
                        // style={
                        //     card.imageUrlFront == "" ?
                        //         (card.imageUrlBack = "" ? styles.containerText : styles.imageOne) :
                        //         (card.imageUrlBack = "" ? styles.imageOne : styles.imageTwo)
                        // }
                    >
                        <Text style={styles.frontText}> {card.front}</Text>
                        <Image
                            source={{uri: imageUrlFront}}
                            style={
                                imageUrlFront == "" ? styles.withoutImage : styles.image
                            }
                        />
                        <Separator/>

                        <Text>{card.back}</Text>
                        <Image
                            source={{uri: imageUrlBack}}
                            style={
                                imageUrlBack == "" ? styles.withoutImage : styles.image
                            }
                        />
                    </SafeAreaView>
                    < SafeAreaView style={styles.containerEditButtons}>

                        <TouchableOpacity
                            style={styles.buttonsEdit}
                            onPress={() => openDeckScreen()}
                        >
                            <MaterialCommunityIcons name="grease-pencil" color={"#354649"} size={20}/>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            );
        } else {
            return (


                <View

                    style={styles.imageOne}>
                    < SafeAreaView
                        style={styles.containerText}
                        // style={
                        //     card.imageUrlFront == "" ?
                        //         (card.imageUrlBack = "" ? styles.containerText : styles.imageOne) :
                        //         (card.imageUrlBack = "" ? styles.imageOne : styles.imageTwo)
                        // }
                    >
                        <Text style={styles.frontText}> {card.front}</Text>
                        <Image
                            source={{uri: imageUrlFront}}
                            style={
                                imageUrlFront == "" ? styles.withoutImage : styles.image
                            }
                        />
                        <Separator/>

                        <Text>{card.back}</Text>
                        <Image
                            source={{uri: imageUrlBack}}
                            style={
                                imageUrlBack == "" ? styles.withoutImage : styles.image
                            }
                        />
                    </SafeAreaView>

                </View>
            );
        }

    }
};

export default Card;

const styles = StyleSheet.create({
        frontText: {

            fontWeight: "bold",
            marginHorizontal: 20,
            marginBottom: 7,
        },
        container: {
            flex: 1,
            padding: 10,
            borderRadius: 35,
            borderColor: "#354649",
            borderWidth: 1,
            backgroundColor: "#A3C6C4",
            margin: 5,
            height: 200,

        },
        imageOne: {
            flex: 1,
            padding: 10,
            borderRadius: 35,
            borderColor: "#354649",
            borderWidth: 1,
            backgroundColor: "#A3C6C4",
            margin: 5,
            height: 200,



        },
        imageTwo: {
            flex: 1,
            padding: 10,
            borderRadius: 35,
            borderColor: "#354649",
            borderWidth: 1,
            backgroundColor: "#A3C6C4",
            margin: 5,
            height: 350,
        },
        containerText: {

            height: 90,
        },
        inputContainer: {
            width: 300,
        },
        containerEditButtons: {
            //  flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 10,

        }
        ,
        buttonsEdit: {
            position:"absolute",
            top:-50,
            right:0,
            marginHorizontal: 5,
            marginBottom: 10,
        },
        button: {
            width: 200,
            marginTop: 10,
        },
        separator: {
            marginVertical: 8,
            borderBottomColor: '#354649',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        image: {
            width: 100,
            height: 100,
        },
        withoutImage: {}

    }
)
