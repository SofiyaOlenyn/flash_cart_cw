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
const Stack = createStackNavigator();
const globalScreenOptions = {

    headerStyle: {backgroundColor: "#2C6BED"}, //color of top
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
          <Stack.Screen name='Home' component={HomeScreen}
                        options={{
                            headerRight: () => (
                                // <MaterialCommunityIcons name = {"star-four-points-outline"} size={30} color={Colors.light.tint}/>
                                <Ionicons name = {"ios-log-out"} onPress={signOutUser} size={30} color={"#4D9FEC"}/>
                            ) }}
              />
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
