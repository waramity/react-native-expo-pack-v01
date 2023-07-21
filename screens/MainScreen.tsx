import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DefaultButton from '../components/core/DefaultButton'

const MainScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
	<DefaultButton title="Default Camera"/>
      <Text>Main Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
