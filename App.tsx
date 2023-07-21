// import React, { ReactElement, useState } from 'react';
// import { View, ViewStyle, Button } from 'react-native';
// import DefaultCameraScreen from './screens/DefaultCameraScreen';

// const App: React.FC = (): ReactElement => {
//   const [showCamera, setShowCamera] = useState(false);

//   const toggleCamera = () => {
//     setShowCamera(!showCamera);
//   };

//   return (
//     <View style={styles.container}>
//       {showCamera ? (
//         <DefaultCameraScreen />
//       ) : (
//         <Button title="Camera Component" onPress={toggleCamera} />
//       )}
//     </View>
//   );
// };

// const styles: { [key: string]: ViewStyle } = {
//   container: {
//     flex: 1,
//   },
// };

// export default App;

// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
