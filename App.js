import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreens";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen"
import * as firebase from "./firebase";
import MyProfileScreen from "./screens/MyProfileScreen";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import NewCardScreen from "./screens/NewCardScreen";
import MyDeckScreen from "./screens/MyDeckScreen";

const Stack = createStackNavigator();


const globalColors = {
    dark:"#354649"
}

const globalScreenOptions = {
//     Dark Blue: #12232E
//
// Lighter Blue: #007CC7
//
// Lightest Blue: #4DA8DA
//
// Shadow of Dark Blue: #203647
//
// Shadow of Light Blue: #EEFBFB

//     Hex: 934A5F / 57648C / C2B4D6 / E5E5E5

    // Hex: 354649 / 6C7A89 / A3C6C4 / E0E7E9
    headerStyle: {backgroundColor: "#354649"}, //color of top
    buttonColor:"#57648C",
    headerTitleStyle : {color:"white"},
    headerTintColor:"white",
}

export default function App() {
    const [refreshing, setRefreshing] = React.useState(false);

    //TODO change page after sign out
    const signOutUser = async function () {
        try {

            await firebase.auth.signOut();


            //navigation.replace("Login");
        } catch (e) {
            console.log(e);
        }
    }

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions = {globalScreenOptions}>

          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Home' component={BottomTabNavigation}
                        options={{
                            headerTitle:"Flashcards App",

                            // headerRight: () => (
                            //     // <MaterialCommunityIcons name = {"star-four-points-outline"} size={30} color={Colors.light.tint}/>
                            //     <Ionicons name = {"ios-log-out"} onPress={signOutUser} size={30} color={"#4D9FEC"}/>
                            // )

                        }
                        }


              />
              <Stack.Screen  name='NewCard' component={NewCardScreen}/>
              <Stack.Screen  name='MyDeck' component={MyDeckScreen}/>
          </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
