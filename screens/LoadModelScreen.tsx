import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";

import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component
import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook

export default function LoadModelScreen() {
  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress
  const [net, setNet] = useState<mobilenet.MobileNet>();

  const loadModel = async () => {
    const model = await mobilenet.load();
    setNet(model); // Set the loaded model to the state
  };

  useEffect(() => {
    loadModel();
  }, []);

  if (!net) {
    return <ProgressBar loadingProgress={loadingProgress} />;
  }

  return (
    <View style={styles.container}>
      <Text>Model load success</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
