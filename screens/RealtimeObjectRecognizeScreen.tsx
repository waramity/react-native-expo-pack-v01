import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  ProgressBarAndroid,
  ProgressViewIOS,
} from "react-native";
import CameraComponent from "../components/common/CameraComponent";

import { Camera, CameraType } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component
import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook

import { useModelLoader } from "../hooks/useModelLoader"; // Import the custom hook
import { useCameraPermission } from "../services/useCameraPermission"; // Import the custom hook

const TensorCamera = cameraWithTensors(Camera);

export default function RealtimeObjectRecognizeScreen() {
  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress
  const hasPermission = useCameraPermission(); // Use the custom hook to get the camera permission
  const model = useModelLoader("mobilenet");
  const [classifiedText, setClassifiedText] = useState("Initial Text");

  let frame = 0;
  const computeRecognitionEveryNFrames = 60;

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

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
      <Text style={styles.classifiedText}>{classifiedText}</Text>
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
  classifiedText: {
    height: 50,
  },
});
