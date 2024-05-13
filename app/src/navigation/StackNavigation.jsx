import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import BottomTabNavigation from './BottomTabNavigation';
import AddMedicineScreen from '../screens/AddMedicineScreen';
import EditMedicineScreen from '../screens/EditMedicineScreen';
import { Easing } from 'react-native';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const config = {
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01
    }
  };

  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 300,
      easing: Easing.linear
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            transitionSpec: {
              open: config,
              close: closeConfig
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            transitionSpec: {
              open: config,
              close: closeConfig
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigation}
          options={{
            transitionSpec: {
              open: config,
              close: closeConfig
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        />
        <Stack.Screen
          name="Add_Medicine"
          component={AddMedicineScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            transitionSpec: {
              open: config,
              close: closeConfig
            },
            cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
          }}
        />
        <Stack.Screen
          name="Edit_Medicine"
          component={EditMedicineScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            transitionSpec: {
              open: config,
              close: closeConfig
            },
            cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
