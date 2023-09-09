import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '@rneui/themed';

// Screens
import IdeaOfTheDayScreen from '../screens/IdeaOfTheDayScreen';
import IdeasScreen from '../screens/IdeaListScreen';
import PlanEventScreen from '../screens/PlanEventScreen';
import { createStackNavigator } from '@react-navigation/stack';

//Screen names
const homeName = "Home";
const ideasName = "Ideas";
const configName = "Details";
const settingsName = "Settings";
const planEvent = "planEvent";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Stack Navigator for the Home tab
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName={ideasName}>
            <Stack.Screen name={ideasName} component={IdeaOfTheDayScreen} options={{ headerShown: false }} />
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
                    tabBarStyle: {
                        backgroundColor: 'rgb(252, 247, 241)',
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                    },
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
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}>

                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="Ideas" component={IdeasScreen} options={{ headerShown: false }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;