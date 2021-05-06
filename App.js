import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreens";
import RegisterScreen from "./screens/RegisterScreen";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import NewCardScreen from "./screens/NewCardScreen";
import MyDeckScreen from "./screens/MyDeckScreen";
import EditCardWhenAddScreen from "./screens/EditCardWhenAddScreen";
import EditCardInMyScreen from "./screens/EditCardInMyScreen";
import EditDeckScreen from "./screens/EditDeckScreen";
import NewCardToExistingDeckScreen from "./screens/NewCardToExistingDeckScreen";
import PracticeCardScreen from "./screens/PracticeCardScreen";
import DeckInSearchScreen from "./screens/DeckInSearchScreen";
import NewCollectionScreen from "./screens/NewCollectionScreen";
import MyCollectionScreen from "./screens/MyCollectionScreen";
import EditCollectionScreen from "./screens/EditCollectionScreen";
import Ionicons from "react-native-vector-icons";
import {StyleSheet} from "react-native";
import PracticeSpecialScreen from "./screens/PracticeSpecialScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
    headerStyle: {backgroundColor: "#354649"},
    buttonColor: "#57648C",
    headerTitleStyle: {color: "white"},
    headerTintColor: "white",
}

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={globalScreenOptions}>

                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen name='Register' component={RegisterScreen}/>
                <Stack.Screen name='Home' component={BottomTabNavigation}
                              options={{
                                  headerTitle: "Flashcards App",
                                  headerTitleStyle: styles.text
                              }
                              }
                />
                <Stack.Screen name='NewCard' component={NewCardScreen}
                              options={{headerTitle: "Add card"}}/>
                <Stack.Screen name='MyDeck' component={MyDeckScreen}
                              options={{headerTitle: "Deck"}}/>
                <Stack.Screen name='EditCardWhenAdd' component={EditCardWhenAddScreen}
                              options={{headerTitle: "Edit card"}}/>
                <Stack.Screen name='EditDeck' component={EditDeckScreen}
                              options={{headerTitle: "Edit deck"}}/>
                <Stack.Screen name='EditCardInMy' component={EditCardInMyScreen}
                              options={{headerTitle: "Edit card"}}/>
                <Stack.Screen name='NewCardToExistingDeck' component={NewCardToExistingDeckScreen}
                              options={{headerTitle: "Add card"}}/>
                <Stack.Screen name='PracticeCard' component={PracticeCardScreen}
                              options={{headerTitle: "Practice"}}/>
                <Stack.Screen name='DeckInSearch' component={DeckInSearchScreen}
                              options={{headerTitle: "Deck"}}/>
                <Stack.Screen name='NewCollection' component={NewCollectionScreen}
                              options={{headerTitle: "Add collection"}}/>
                <Stack.Screen name='MyCollection' component={MyCollectionScreen}
                              options={{headerTitle: "Collection"}}/>
                <Stack.Screen name='EditCollection' component={EditCollectionScreen}
                              options={{headerTitle: "Edit"}}/>
                <Stack.Screen name='PracticeSpecial' component={PracticeSpecialScreen}
                              options={{headerTitle: "Practice"}}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({

    text: {

        fontSize: 20,
        fontWeight: "bold",
    }
})

