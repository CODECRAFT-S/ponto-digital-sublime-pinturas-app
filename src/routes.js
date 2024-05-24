import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

import BaterPonto from '@pages/BaterPonto';
import HistoricoPonto from '@pages/HistoricoPonto';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === 'Início') {
              iconName = 'home';
            } else if (route.name === 'Histórico') {
              iconName = 'history';
            }

            return (
                <View style={{ 
                  borderTopWidth: focused ? 2 : 0, 
                  borderTopColor: Colors.theme.secondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  height: '155%',
                }}>
                  <FontAwesome name={iconName} size={size} color={color} />
                </View>
              );
          },
          headerShown: false,
          tabBarActiveTintColor: Colors.theme.secondary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#2A2A2B',
            borderTopWidth: 0, 
            elevation: 0,
            height: 70, 
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
            tabBarLabel: 'Início',
          }}
        />
        <Tab.Screen
          name="Histórico"
          component={HistoricoPonto}
          options={{
            tabBarLabel: 'Histórico',
          }}
        />
      </Tab.Navigator>
  );
}
