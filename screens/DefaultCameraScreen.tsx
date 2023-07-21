import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/core/BackButton'
import CameraComponent from '../components/common/CameraComponent'

const DefaultCameraScreen = () => {
  const handleBackButtonPress = () => {
    console.log('Back button pressed');
  };

  return (
    <View style={styles.container}>
	<DefaultCameraScreen />
	<BackButton onPress={handleBackButtonPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DefaultCameraScreen;
