import {
  Dimensions,
  LogBox,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Canvas from "react-native-canvas";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import React, { useEffect, useRef, useState } from "react";

import { useModelLoader } from "../hooks/useModelLoader"; // Import the custom hook
import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component

import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook

const TensorCamera = cameraWithTensors(Camera);

const MODEL_CONFIG = {
  detectionConfidence: 0.8,
  maxContinuousChecks: 10,
  maxNumBoxes: 20, // maximum boxes to detect
  iouThreshold: 0.5, // ioU thresho non-max suppression
  scoreThreshold: 0.8, // confidence
};

export default function RealtimeHandTrackingScreen() {
  const model = useModelLoader("mobilenet");
  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress

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
