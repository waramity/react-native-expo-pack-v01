import React, { ReactElement, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import DefaultCameraScreen from './screens/DefaultCameraScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Default Camera" component={DefaultCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
