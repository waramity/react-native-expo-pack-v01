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

const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4], // Thumb
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8], // Index
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12], // Middle
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16], // Ring
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20], // Pinky
];

const { width, height } = Dimensions.get("window");

export default function RealtimeHandTrackingScreen() {
  const model = useModelLoader("handpose");
  const loadingProgress = useLoadingProgress();

  let context = useRef<CanvasRenderingContext2D>();
  let canvas = useRef<Canvas>();

  async function imageProcessing(nextImageTensor) {
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

  function drawKeypoints(keypoints: any[][], ctx: CanvasRenderingContext2D) {
    keypoints.forEach((keypoint: any[]) => {
      ctx.beginPath();
      ctx.arc(keypoint[0], keypoint[1], 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });
  }

  function drawConnections(
    pairs: number[][][] | [any, any][],
    ctx: CanvasRenderingContext2D
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    pairs.forEach(([start, end]) => {
      ctx.moveTo(start[0], start[1]);
      ctx.lineTo(end[0], end[1]);
    });
    ctx.stroke();
  }

  function mapPoints(
    predictions: handpose.AnnotatedPrediction[],
    nextImageTensor: any
  ) {
    if (!context.current || !canvas.current) {
      console.log("no context or canvas");
      return;
    }

    const scaleWidth = width / nextImageTensor.shape[1];
    const scaleHeight = height / nextImageTensor.shape[0];

    const flipHorizontal = true;

    context.current.clearRect(0, 0, width, height);

    for (const prediction of predictions) {
      const keypoints = prediction.landmarks.map((landmark) => {
        const x = flipHorizontal
          ? canvas.current.width - landmark[0] * scaleWidth
          : landmark[0] * scaleWidth;
        const y = landmark[1] * scaleHeight;
        return [x, y];
      });

      drawKeypoints(keypoints, context.current);
      drawConnections(
        HAND_CONNECTIONS.map(([startIdx, endIdx]) => [
          keypoints[startIdx],
          keypoints[endIdx],
        ]),
        context.current
      );
    }
  }

  const handleCanvas = async (can: Canvas) => {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx: CanvasRenderingContext2D = can.getContext("2d");
      context.current = ctx;
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.lineWidth = 3;
      canvas.current = can;
    }
  };

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
        useCustomShadersToResize={false}
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
    width: "100%",
    height: "100%",
  },
});
