import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

const MainScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Default Camera"
        onPress={() => navigation.navigate("Default Camera")}
      />

      <Button
        title="Tensor Camera"
        onPress={() => navigation.navigate("Tensor Camera")}
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
