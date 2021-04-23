import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createStackNavigator();

const globalScreenOptions = {


    headerStyle: {backgroundColor: "#354649"}, //color of top
    buttonColor:"#57648C",
    headerTitleStyle : {color:"white"},
    headerTintColor:"white",
}

export default function App() {

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
              <Stack.Screen  name='EditCardWhenAdd' component={EditCardWhenAddScreen}/>
              <Stack.Screen  name='EditDeck' component={EditDeckScreen}/>
              <Stack.Screen  name='EditCardInMy' component={EditCardInMyScreen}/>
              <Stack.Screen  name='NewCardToExistingDeck' component={NewCardToExistingDeckScreen}/>
              <Stack.Screen  name='PracticeCard' component={PracticeCardScreen}/>
              <Stack.Screen  name='DeckInSearch' component={DeckInSearchScreen}/>
          </Stack.Navigator>
      </NavigationContainer>

  );
}

