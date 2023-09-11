import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import IdeaOfTheDayScreen from '../screens/IdeaOfTheDayScreen';
import IdeaDetailsScreen from '../screens/IdeaDetailsScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import SettingsScreen from '../screens/SettingsScreen'

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screen names
const ideasName = "Ideas";
const languageSelect = "languageSelect";
const ideaDetails = "ideaDetails";
const Settings = "Settings";

const Stack = createStackNavigator();

function MainContainer() {
    const [languageSelected, setLanguageSelected] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const language = await AsyncStorage.getItem('selectedLanguage');
            return !!language; // Use double negation to convert to boolean
        }

        fetchData().then((isLanguageSelected) => {
            setLanguageSelected(isLanguageSelected); // Set the state variable
        });
    }, []);


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={languageSelect}>
                {/* {!languageSelected ? ( */}
                <Stack.Screen name={languageSelect} component={LanguageSelectScreen} options={{ headerShown: false }} />
                {/* ) : null} */}
                <Stack.Screen name={ideasName} component={IdeaOfTheDayScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ideaDetails} component={IdeaDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name={Settings} component={SettingsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;