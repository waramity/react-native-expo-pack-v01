import React, { ReactElement, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as tf from '@tensorflow/tfjs';

import MainScreen from './screens/MainScreen';
import DefaultCameraScreen from './screens/DefaultCameraScreen';
import ObjectDetectionCameraScreen from './screens/ObjectDetectionCameraScreen';

const Stack = createNativeStackNavigator();

interface AppState {
  isTfReady: boolean;
}

const App: React.FC = (): React.ReactElement => {
const [isTfReady, setIsTfReady] = useState(false);
	  useEffect(() => {
    // Wait for tf to be ready.
    const initializeTensorFlow = async () => {
      await tf.ready();
      // Signal to the app that tensorflow.js can now be used.
      setIsTfReady(true);
    };
    initializeTensorFlow();
  }, []);
	console.log(isTfReady)


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Default Camera" component={DefaultCameraScreen} />
        <Stack.Screen name="Object Detection Camera Screen" component={ObjectDetectionCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

