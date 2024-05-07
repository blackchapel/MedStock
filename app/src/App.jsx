import React from 'react';
import { Provider } from 'react-native-paper';
import StackNavigation from './navigation/StackNavigation';
import BottomTabNavigation from './navigation/BottomTabNavigation';

function App() {
  return (
    <Provider>
      <StackNavigation />
      {/* <BottomTabNavigation /> */}
    </Provider>
  );
}

export default App;
