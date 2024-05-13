import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text, TouchableRipple } from 'react-native-paper';

import { RPH, RPW } from '../utils/dimensions';
// #ABDCAE
// #FFA071
// #FF6961

const MedicineCard = ({ data, navigation }) => {
  return (
    <View>
      <TouchableRipple
        onPress={() => navigation.navigate('Edit_Medicine', data)}
        rippleColor="rgba(204, 196, 206, 0.32)"
        centered={true}>
        <View style={{ paddingHorizontal: RPW(3) }}>
          <View
            style={{
              borderLeftWidth: 5,
              borderLeftColor: data.color,
              marginVertical: RPH(2)
            }}>
            <View>
              <Text variant="titleLarge" style={styles.singleText}>
                {data.name}
              </Text>

              <View style={styles.multipleTexts}>
                <Text variant="bodyMedium">Strips: {data.numberOfStrips}</Text>
                <Text variant="bodyMedium">
                  Frequency: {data.frequency.toLowerCase()}
                </Text>
              </View>

              <View style={styles.multipleTexts}>
                <Text variant="bodyMedium">
                  Pills / Strip: {data.numberOfUnitsPerStrip}
                </Text>
                <Text variant="bodyMedium">
                  Start Date:{' '}
                  {new Date(data.startDate).toLocaleDateString('en-GB')}
                </Text>
              </View>

              <View style={styles.multipleTexts}>
                <Text variant="bodyMedium">
                  Pills / Day: {data.numberOfUnitsPerDay}
                </Text>

                <Text variant="bodyMedium">
                  Reminder:{' '}
                  {new Date(data.notificationDateAndTime).toLocaleDateString(
                    'en-GB'
                  )}
                </Text>
              </View>

              <View style={styles.multipleTexts}>
                <Text variant="bodyMedium">
                  Total Pills: {data.totalNumberOfUnits}
                </Text>

                <Text variant="bodyMedium">
                  Restock:{' '}
                  {new Date(data.stockOverDate).toLocaleDateString('en-GB')}
                </Text>
              </View>
            </View>
          </View>
          <Divider />
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  singleText: {
    marginLeft: RPW(3)
  },
  multipleTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: RPW(3)
  }
});

export default MedicineCard;
