import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const RPH = percentage => {
  return (percentage / 100) * screenHeight;
};

export const RPW = percentage => {
  return (percentage / 100) * screenWidth;
};
