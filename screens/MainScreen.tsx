import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

const MainScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
	       <Button
        title="Default Camera"
        onPress={() => navigation.navigate('Default Camera')}
      />

	       <Button
        title="Object Detection Camera Screen"
        onPress={() => navigation.navigate('Object Detection Camera Screen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
