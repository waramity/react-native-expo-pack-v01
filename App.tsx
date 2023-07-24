import React, { ReactElement, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as tf from "@tensorflow/tfjs";

import MainScreen from "./screens/MainScreen";
import DefaultCameraScreen from "./screens/DefaultCameraScreen";
import TensorCameraScreen from "./screens/TensorCameraScreen";
import RealtimeObjectRecognizeScreen from "./screens/RealtimeObjectRecognizeScreen";
import LoadModelScreen from "./screens/LoadModelScreen";
import * as mobilenet from "@tensorflow-models/mobilenet";

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

  if (isTfReady) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Default Camera" component={DefaultCameraScreen} />
          <Stack.Screen name="Tensor Camera" component={TensorCameraScreen} />
          <Stack.Screen
            name="Realtime Object Recognize"
            component={RealtimeObjectRecognizeScreen}
          />
          <Stack.Screen name="Load Model" component={LoadModelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
