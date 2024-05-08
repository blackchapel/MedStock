import React from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppBar = ({ title, navigation }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch {
      console.error(error);
    }
  };
  return (
    <Appbar.Header elevated={true}>
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="account-circle"
        onPress={() => {
          logout();
        }}
      />
    </Appbar.Header>
  );
};

export default AppBar;
