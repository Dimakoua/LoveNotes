import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import IdeaOfTheDayScreen from '../screens/IdeaOfTheDayScreen';
import IdeaDetailsScreen from '../screens/IdeaDetailsScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import SettingsScreen from '../screens/SettingsScreen'
import IdeaListScreen from '../screens/IdeaListScreen';
import WishListScreen from '../screens/WishListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../screens/NotificationScreen';

//Screen names
const dailyIdea = "Ideas";
const languageSelect = "languageSelect";
const ideaDetails = "ideaDetails";
const Settings = "Settings";
const ideaList = "ideaList";
const wishList = "wishList";
const notification = "notification";

const Stack = createStackNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={languageSelect}>
                <Stack.Screen name={languageSelect} component={LanguageSelectScreen} options={{ headerShown: false }} />
                <Stack.Screen name={dailyIdea} component={IdeaOfTheDayScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ideaDetails} component={IdeaDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name={Settings} component={SettingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ideaList} component={IdeaListScreen} options={{ headerShown: false }} />
                <Stack.Screen name={wishList} component={WishListScreen} options={{ headerShown: false }} />
                <Stack.Screen name={notification} component={NotificationScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;