import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import NewDeckScreen from "../screens/NewDeckScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createMaterialBottomTabNavigator();

const ButtomTabNavigation = ({navigation}) => {

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            activeColor="black"
            barStyle={{ backgroundColor: '#2C6BED' }}
        >
            <Tab.Screen
                name="Feed"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyProfile"
                component={MyProfileScreen}
                options={{
                    tabBarLabel: 'MyProfile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="NewDeck"
                component={NewDeckScreen}
                options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="add-circle-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="add-circle-outline" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default ButtomTabNavigation;
