import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RPH, RPW } from '../utils/dimensions';
import { BASE_URL, LOGIN } from '../utils/urls';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const loginHandler = async () => {
    try {
      setIsLoading(true);

      const url = `${BASE_URL}/${LOGIN}`;

      const res = await axios.post(url, {
        username: username,
        password: password
      });

      if (
        res.status == 200 &&
        res.data.data.token !== 'undefined' &&
        res.data.data.user !== 'undefined'
      ) {
        await AsyncStorage.setItem('token', res.data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.data.user));

        navigation.replace('BottomTab');
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      if (error?.response?.status === 404) {
        setErrorMessage('Invalid email or password!');
      } else {
        console.log('hello');
        setErrorMessage('Something went wrong');
      }
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      if (user) {
        navigation.replace('BottomTab');
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <Surface style={styles.surface}>
        <Text variant="displayMedium" style={styles.header}>
          Log in
        </Text>

        <TextInput
          label="Username"
          style={styles.textInput}
          autoCapitalize="none"
          autoComplete="username"
          autoFocus={true}
          error={isError}
          value={username}
          onChangeText={text => setUsername(text)}
          onSubmitEditing={() => {
            this.secondTextInput.focus();
          }}
        />

        <TextInput
          label="Password"
          style={styles.textInput}
          secureTextEntry={isSecureEntry}
          autoComplete="password"
          autoCapitalize="none"
          error={isError}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setIsSecureEntry(!isSecureEntry);
              }}
            />
          }
          value={password}
          onChangeText={text => setPassword(text)}
          ref={input => {
            this.secondTextInput = input;
          }}
        />

        <HelperText type="error" visible={isError}>
          {errorMessage}
        </HelperText>

        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={() => loginHandler()}
          style={styles.button}>
          Log in
        </Button>

        <View style={styles.signupButtonView}>
          <Text>New to the app? </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.signupButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  surface: {
    flex: 1,
    paddingHorizontal: RPW(3),
    paddingTop: RPH(6)
  },
  header: {
    marginBottom: RPH(6)
  },
  textInput: {
    marginBottom: RPH(2)
  },
  button: {
    marginBottom: RPH(1)
  },
  signupButtonView: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center'
  },
  signupButton: {
    fontWeight: 'bold'
  }
});

export default LoginScreen;
