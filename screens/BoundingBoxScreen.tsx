
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text , Dimensions, Platform} from "react-native";
import Canvas from "react-native-canvas";


import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component
import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook
import {useCameraPermission} from "../services/useCameraPermission"; // Import the custom hook

import { useModelLoader } from "../hooks/useModelLoader"; // Import the custom hook

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";

import { handleCameraStream } from "../utils/cameraUtils"; // Import the function from the utils folder

import { textureDims } from "../utils/cameraConfig"; // Import the textureDims object

import { Camera, CameraType, CameraCapturedPicture } from "expo-camera";

const TensorCamera = cameraWithTensors(Camera);
const { width, height } = Dimensions.get("window");

import * as cocossd from "@tensorflow-models/coco-ssd";


export default function BoundingBoxScreen() {
  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress
  const hasPermission = useCameraPermission(); // Use the custom hook to get the camera permission const model = useModelLoader("cocossd");
  const model = useModelLoader("cocossd");
	let canvas = useRef<Canvas>();
let context = useRef<CanvasRenderingContext2D>();




  if (!model) {
    return <ProgressBar loadingProgress={loadingProgress} />;
  }

  if (hasPermission === false || hasPermission == null) {
    return <Text>No access to camera</Text>;
  }

	async function imageProcessing(nextImageTensor) {
      model
        .detect(nextImageTensor)
        .then((predictions) => {
          drawRectangle(predictions, nextImageTensor);
        })
        .catch((error) => {
          console.log(error);
        });


	}

function drawRectangle(
    predictions: cocossd.DetectedObject[],
    nextImageTensor: any,
  ) {
    if (!context.current || !canvas.current) return;

    const scaleWidth = width / nextImageTensor.shape[1];
    const scaleHeight = height / nextImageTensor.shape[0];

    const flipHorizontal = Platform.OS == "ios" ? false : true;

    context.current.clearRect(0, 0, width, height);

    for (const prediction of predictions) {
      const [x, y, width, height] = prediction.bbox;

      const boundingBoxX = flipHorizontal
        ? canvas.current.width - x * scaleWidth - width * scaleWidth
        : x * scaleWidth;

      const boundingBoxY = y * scaleHeight;

      context.current.strokeRect(
        boundingBoxX,
        boundingBoxY,
        width * scaleWidth,
        height * scaleHeight,
      );
	   context.current.font = '56px Arial';
	        context.current.fillStyle = 'purple';



      context.current.strokeText(
        prediction.class,
        boundingBoxX - 5,
        boundingBoxY - 5,
      );
    }
  }

  async function handleCanvas(can: Canvas) {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx: CanvasRenderingContext2D = can.getContext("2d");
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.lineWidth = 2;

      context.current = ctx;
      canvas.current = can;
    }
  }

  return (
    <View style={styles.container}>

      <TensorCamera
        style={styles.camera}
        onReady={(images) => handleCameraStream(model, images, imageProcessing)} // Use the function from the utils folder
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        useCustomShadersToResize={false} // Add this property
      />

      <Canvas style={styles.canvas} ref={handleCanvas} />
 
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
	  canvas: {
    position: "absolute",
    zIndex: 1000000,
  },
});
