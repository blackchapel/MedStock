import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';

import MedicineScreen from '../screens/MedicineScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Medicines"
        component={MedicineScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="medication" color={color} size={22} />
          )
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="notifications"
              color={color}
              size={22}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
