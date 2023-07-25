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

import { handleCameraStream } from "../utils/cameraUtils"; // Import the function from the utils folder
import { textureDims } from "../utils/cameraConfig"; // Import the textureDims object

const TensorCamera = cameraWithTensors(Camera);

const MODEL_CONFIG = {
  detectionConfidence: 0.8,
  maxContinuousChecks: 10,
  maxNumBoxes: 20, // maximum boxes to detect
  iouThreshold: 0.5, // ioU thresho non-max suppression
  scoreThreshold: 0.8, // confidence
};

export default function RealtimeHandTrackingScreen() {
  const model = useModelLoader("handpose");
  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress

  async function imageProcessing(nextImageTensor) {
    // const objects = await model.classify(nextImageTensor);
    // setClassifiedText(objects.map((object) => object.className));

    console.log("kuy");

    model
      .estimateHands(nextImageTensor)
      .then((predictions) => {
        mapPoints(predictions, nextImageTensor);
        tf.dispose(nextImageTensor);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!model) {
    return <ProgressBar loadingProgress={loadingProgress} />;
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        onReady={(images) => handleCameraStream(model, images, imageProcessing)}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        useCustomShadersToResize={false} // Add this property
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
