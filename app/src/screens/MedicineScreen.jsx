import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { ActivityIndicator, MD3Colors, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RPH, RPW } from '../utils/dimensions';
import { BASE_URL, GET_MEDICINES } from '../utils/urls';
import MedicineCard from '../components/MedicineCard';
import FloatingActionButton from '../components/FloatingActionButton';
import AppBar from '../components/AppBar';

const MedicineScreen = ({ navigation }) => {
  const [medicines, setMedicines] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getMedicines = async () => {
    setIsLoading(true);
    try {
      const url = `${BASE_URL}/${GET_MEDICINES}`;
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      res.data.data.inventory.forEach(item => {
        const now = new Date(new Date().getTime() + 300 * 60000);
        const reminderDate = new Date(item.notificationDateAndTime);
        const restockDate = new Date(item.stockOverDate);
        if (now > restockDate) {
          item['color'] = '#FF6961';
        } else if (now >= reminderDate && now <= restockDate) {
          item['color'] = '#FFA071';
        } else if (now < reminderDate) {
          item['color'] = '#ABDCAE';
        }
      });

      setMedicines(res.data.data.inventory);
    } catch {
      console.error(error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getMedicines();
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <AppBar title={'Medicines'} navigation={navigation} />

      {isLoading ? (
        <View style={styles.containerTwo}>
          <ActivityIndicator animating={isLoading} size="large" />
        </View>
      ) : (
        <View style={styles.containerOne}>
          <FlatList
            data={medicines}
            renderItem={({ item }) => (
              <MedicineCard data={item} navigation={navigation} />
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[MD3Colors.primary80]}
                progressBackgroundColor={MD3Colors.secondary30}
                refreshing={isLoading}
                onRefresh={getMedicines}
              />
            }
            ListEmptyComponent={
              <View style={styles.containerTwo}>
                <Image
                  style={styles.image}
                  source={require('../assets/medicine.png')}
                />

                <Text style={styles.text} variant="bodyLarge">
                  No medicines
                </Text>

                <Text>Add a medicine and it will show up here.</Text>
              </View>
            }
            ListFooterComponent={<View style={{ height: RPH(10) }} />}
          />
        </View>
      )}

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

export default MedicineScreen;
