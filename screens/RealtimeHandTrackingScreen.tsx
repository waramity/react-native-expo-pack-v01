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

  const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      if (model) {
        if (frame % computeRecognitionEveryNFrames === 0) {
          const nextImageTensor = images.next().value;
          if (nextImageTensor) {
            const objects = await model.classify(nextImageTensor);
            setClassifiedText(objects.map((object) => object.className));
            tf.dispose([nextImageTensor]);
          }
        }
        frame += 1;
        frame = frame % computeRecognitionEveryNFrames;
      }

      requestAnimationFrame(loop);
    };
    loop();
  };

  if (!model) {
    return <ProgressBar loadingProgress={loadingProgress} />;
  }

  const textureDims =
    Platform.OS === "ios"
      ? {
          height: 1920,
          width: 1080,
        }
      : {
          height: 1200,
          width: 1600,
        };

  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        onReady={handleCameraStream}
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
