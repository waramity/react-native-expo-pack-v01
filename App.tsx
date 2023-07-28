import React, { ReactElement, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as tf from "@tensorflow/tfjs";

import MainScreen from "./screens/MainScreen";
import DefaultCameraScreen from "./screens/DefaultCameraScreen";
import TensorCameraScreen from "./screens/TensorCameraScreen";
import LoadModelScreen from "./screens/LoadModelScreen";
import RealtimeObjectRecognizeScreen from "./screens/RealtimeObjectRecognizeScreen";
import RealtimeHandTrackingScreen from "./screens/RealtimeHandTrackingScreen";
import ObjectRecognizeImagePickerScreen from "./screens/ObjectRecognizeImagePickerScreen";
import BoundingBoxScreen from "./screens/BoundingBoxScreen";

import * as mobilenet from "@tensorflow-models/mobilenet";

import 'react-native-reanimated'


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

          <Stack.Screen name="Load Model" component={LoadModelScreen} />
          <Stack.Screen
            name="Realtime Object Recognize"
            component={RealtimeObjectRecognizeScreen}
          />

          <Stack.Screen

            name="Realtime Hand Tracking"
            component={RealtimeHandTrackingScreen}
          />

          <Stack.Screen
            name="Object Recognize Image Picker"
            component={ObjectRecognizeImagePickerScreen}
          />

          <Stack.Screen
            name="Bounding Box"
            component={BoundingBoxScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
