import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import BottomTabNavigation from './BottomTabNavigation';
import AddMedicineScreen from '../screens/AddMedicineScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen name="Add_Medicine" component={AddMedicineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
