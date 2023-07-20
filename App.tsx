import React, { ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
import CameraComponent from './components/common/CameraComponent';

const App: React.FC = (): ReactElement => {
  return (
    <View style={styles.container}>
      <CameraComponent />
    </View>
  );
};

const styles: { [key: string]: ViewStyle } = {
  container: {
    flex: 1,
  },
};

export default App;
