import React, { FC, useState, PropsWithChildren } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface FlipCameraButtonProps {
  onPress: () => void;
}

const FlipCameraButton: FC<PropsWithChildren<FlipCameraButtonProps>> = ({ onPress }) => {

  return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FlipCameraButton;
