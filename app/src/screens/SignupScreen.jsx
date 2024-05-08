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
import { BASE_URL, SIGNUP } from '../utils/urls';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const loginHandler = async () => {
    try {
      setIsLoading(true);

      const url = `${BASE_URL}/${SIGNUP}`;

      const res = await axios.post(url, {
        name: name,
        username: username,
        password: password
      });

      if (
        res.status == 201 &&
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
      setErrorMessage('Something went wrong');
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
          Sign up
        </Text>

        <TextInput
          label="Name"
          style={styles.textInput}
          autoComplete="name"
          autoCapitalize
          autoFocus={true}
          error={isError}
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            this.secondTextInput.focus();
          }}
        />

        <TextInput
          label="Username"
          style={styles.textInput}
          autoCapitalize="none"
          autoComplete="username"
          error={isError}
          value={username}
          onChangeText={text => setUsername(text)}
          ref={input => {
            this.secondTextInput = input;
          }}
          onSubmitEditing={() => {
            this.thirdTextInput.focus();
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
            this.thirdTextInput = input;
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
          Sign up
        </Button>

        <View style={styles.loginButtonView}>
          <Text>New to the app? </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.replace('Login');
            }}>
            <Text style={styles.loginButton}>Log in</Text>
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
  loginButtonView: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center'
  },
  loginButton: {
    fontWeight: 'bold'
  }
});

export default SignupScreen;
