import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraComponent from '../components/common/CameraComponent'
import FlipCameraButton from '../components/common/FlipCameraButton'

const DefaultCameraScreen = () => {
  return (
    <View style={styles.container}>
	  <CameraComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DefaultCameraScreen;
