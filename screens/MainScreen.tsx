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
      <Button
        title="Load Model"
        onPress={() => navigation.navigate("Load Model")}
      />
      <Button
        title="Realtime Object Recognize"
        onPress={() => navigation.navigate("Realtime Object Recognize")}
      />
      <Button
        title="Realtime Hand Tracking"
        onPress={() => navigation.navigate("Realtime Hand Tracking")}
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
