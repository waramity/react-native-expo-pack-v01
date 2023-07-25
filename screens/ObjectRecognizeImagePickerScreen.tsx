import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";

import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component
import { useModelLoader } from "../hooks/useModelLoader"; // Import the custom hook

import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook

export default function ObjectRecognizeImagePickerScreen() {

  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress
  const model = useModelLoader("mobilenet");

  if (!model) {
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
