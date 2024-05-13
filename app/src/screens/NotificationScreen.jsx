import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { MD3Colors, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RPH, RPW } from '../utils/dimensions';
import { BASE_URL, GET_NOTIFICATIONS } from '../utils/urls';
import AppBar from '../components/AppBar';
import NotificationCard from '../components/NotificationCard';
import FloatingActionButton from '../components/FloatingActionButton';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getNotifications = async () => {
    setIsLoading(true);
    try {
      const url = `${BASE_URL}/${GET_NOTIFICATIONS}`;
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications(res.data.data.notification.reverse());
    } catch (error) {
      console.error(error.response);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotifications();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.body}>
      <AppBar title={'Notifications'} navigation={navigation} />

      <View style={styles.containerOne}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationCard data={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[MD3Colors.primary80]}
              progressBackgroundColor={MD3Colors.secondary30}
              refreshing={isLoading}
              onRefresh={getNotifications}
            />
          }
          ListEmptyComponent={
            <View style={styles.containerTwo}>
              <Image
                style={styles.image}
                source={require('../assets/notification.png')}
              />

              <Text style={styles.text} variant="bodyLarge">
                No notifications
              </Text>
            </View>
          }
          ListFooterComponent={<View style={{ height: RPH(10) }} />}
        />
      </View>

      <FloatingActionButton navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  containerOne: {
    flex: 1,
    marginHorizontal: RPW(3)
  },
  containerTwo: {
    flex: 1,
    height: RPH(75),
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: RPW(41),
    height: RPW(42),
    marginBottom: RPH(3)
  },
  text: {
    marginBottom: RPH(2),
    fontWeight: 'bold'
  }
});

export default NotificationScreen;
