import React, { ReactElement, useState } from 'react';
import { View, ViewStyle, Button } from 'react-native';
import DefaultCameraScreen from './screens/DefaultCameraScreen';

const App: React.FC = (): ReactElement => {
  const [showCamera, setShowCamera] = useState(false);

  const toggleCamera = () => {
    setShowCamera(!showCamera);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <DefaultCameraScreen />
      ) : (
        <Button title="Camera Component" onPress={toggleCamera} />
      )}
    </View>
  );
};

const styles: { [key: string]: ViewStyle } = {
  container: {
    flex: 1,
  },
};

export default App;
