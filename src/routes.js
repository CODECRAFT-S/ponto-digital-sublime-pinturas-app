import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { Platform, SafeAreaView, View } from "react-native";
import { Colors } from "@constants/Colors";

import Login from "@pages/Login";
import BaterPonto from "@pages/BaterPonto";
import HistoricoPonto from "@pages/HistoricoPonto";
import CapturePhoto from "@pages/CapturePhoto";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === "Início") {
                        iconName = "home";
                    } else if (route.name === "Histórico") {
                        iconName = "history";
                    }

                    return (
                        <SafeAreaView
                            style={{
                                borderTopWidth: focused ? 2 : 0,
                                borderTopColor: Colors.theme.secondary,
                                alignItems: "center",
                                justifyContent: "center",
                                width: "80%",
                                height: "155%",
                            }}
                        >
                            <FontAwesome
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        </SafeAreaView>
                    );
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.theme.secondary,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#2A2A2B",
                    borderTopWidth: 0,
                    elevation: 0,
                    height: Platform.OS === "ios" ? 100 : 70,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                },
                tabBarItemStyle: {
                    marginTop: 10,
                    marginBottom: 10,
                },
            })}
        >
            <Tab.Screen
                name="Início"
                component={BaterPonto}
                options={{
                    tabBarLabel: "Início",
                }}
            />
            <Tab.Screen
                name="Histórico"
                component={HistoricoPonto}
                options={{
                    tabBarLabel: "Histórico",
                }}
            />
        </Tab.Navigator>
    );
}

export default function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS, 
            }}
        >
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Home" component={Tabs}></Stack.Screen>
            <Stack.Screen
                name="CapturePhoto"
                component={CapturePhoto}
                options={{
                    ...TransitionPresets.ModalPresentationIOS,
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}
