import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

const MainScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
	       <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Default Camera')}
      />
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
