import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import CameraComponent from "../components/common/CameraComponent";

import { Camera, CameraType } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import * as tf from "@tensorflow/tfjs";

import Tflite from "tflite-react-native";

let tflite = new Tflite();

const height = 350;
const width = 350;
const blue = "#25d5fd";
const mobile = "MobileNet";
const ssd = "SSD MobileNet";
const yolo = "Tiny YOLOv2";
const deeplab = "Deeplab";
const posenet = "PoseNet";

const TfliteReactNativeScreen: React.FC = (): React.ReactElement => {
  const [model, setModel] = useState(null);
  const [source, setSource] = useState(null);
  const [imageHeight, setImageHeight] = useState(height);
  const [imageWidth, setImageWidth] = useState(width);

  function onSelectModel(model) {
    setModel({ model });
    switch (model) {
      case ssd:
        var modelFile = "models/ssd_mobilenet.tflite";
        var labelsFile = "models/ssd_mobilenet.txt";
        break;
      case yolo:
        var modelFile = "models/yolov2_tiny.tflite";
        var labelsFile = "models/yolov2_tiny.txt";
        break;
      case deeplab:
        var modelFile = "models/deeplabv3_257_mv_gpu.tflite";
        var labelsFile = "models/deeplabv3_257_mv_gpu.txt";
        break;
      case posenet:
        var modelFile = "models/posenet_mv1_075_float_from_checkpoints.tflite";
        var labelsFile = "";
        break;
      default:
        var modelFile = "models/mobilenet_v1_1.0_224.tflite";
        var labelsFile = "models/mobilenet_v1_1.0_224.txt";
    }
    tflite.loadModel(
      {
        model: modelFile,
        labels: labelsFile,
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      }
    );
  }

  const renderButton = (model: string) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onSelectModel(model)}>
        <Text style={styles.buttonText}>{m}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {model ? (
        <TouchableOpacity
          style={[
            styles.imageContainer,
            {
              height: imageHeight,
              width: imageWidth,
              borderWidth: source ? 0 : 2,
            },
          ]}
          onPress={this.onSelectImage.bind(this)}
        >
          {source ? (
            <Image
              source={source}
              style={{
                height: imageHeight,
                width: imageWidth,
              }}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.text}>Select Picture</Text>
          )}
          <View style={styles.boxes}>{this.renderResults()}</View>
        </TouchableOpacity>
      ) : (
        <View>
          {renderButton(mobile)}
          {renderButton(ssd)}
          {renderButton(yolo)}
          {renderButton(deeplab)}
          {renderButton(posenet)}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    borderColor: blue,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: blue,
  },
  button: {
    width: 200,
    backgroundColor: blue,
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  box: {
    position: "absolute",
    borderColor: blue,
    borderWidth: 2,
  },
  boxes: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default TfliteReactNativeScreen;
