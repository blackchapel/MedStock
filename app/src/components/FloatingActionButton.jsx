import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { RPH, RPW } from '../utils/dimensions';

const FloatingActionButton = ({ navigation }) => (
  <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => navigation.navigate('Add_Medicine')}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginBottom: RPH(2),
    marginRight: RPW(3),
    right: 0,
    bottom: 0
  }
});

export default FloatingActionButton;
