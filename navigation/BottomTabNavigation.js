import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import NewDeckScreen from "../screens/NewDeckScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = ({navigation}, newCard = newCard) => {

    return (

        <Tab.Navigator
            initialRouteName="Feed"
            activeColor="#E5E5E5"
            barStyle={{backgroundColor: "#354649"}}
        >


            <Tab.Screen
                name="Feed"
                component={HomeScreen}
                options={{

                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />

            <Tab.Screen
                name="NewDeck"
                component={NewDeckScreen}
                initialParams={(newCard: [])}
                options={
                    {

                        tabBarLabel: 'Add',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name={"file-plus-outline"} size={26} color={color}/>


                        ),
                    }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="file-search-outline" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="MyProfile"
                component={MyProfileScreen}
                options={{
                    tabBarLabel: 'MyProfile',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                    ),
                }}
            />

        </Tab.Navigator>
    );
}
export default BottomTabNavigation;
