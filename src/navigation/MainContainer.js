import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '@rneui/themed';

// Screens
import ConfigScreen from '../screens/ConfigScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IdeaOfTheDayScreen from '../screens/IdeaOfTheDayScreen';
import IdeasScreen from '../screens/IdeasScreen';
import PlanEventScreen from '../screens/PlanEventScreen'; 
import { createStackNavigator } from '@react-navigation/stack';

//Screen names
const homeName = "Home";
const configName = "Details";
const settingsName = "Settings";
const planEvent = "planEvent";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Stack Navigator for the Home tab
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName={homeName}>
            <Stack.Screen name={homeName} component={IdeaOfTheDayScreen} options={{ headerShown: false }} />
            <Stack.Screen name={planEvent} component={PlanEventScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70 },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === configName) {
                            iconName = focused ? 'list' : 'list-outline';

                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} type='ionicon' size={size} color={color} />
                    },
                })}>

                <Tab.Screen name={homeName} component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name={configName} component={IdeasScreen} options={{ headerShown: false }} />
                <Tab.Screen name={settingsName} component={SettingsScreen} options={{ headerShown: false }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;