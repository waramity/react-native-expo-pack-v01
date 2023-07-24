import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import CameraComponent from "../components/common/CameraComponent";

import { Camera, CameraType } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const TensorCamera = cameraWithTensors(Camera);

export default function RealtimeObjectRecognizeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [net, setNet] = useState<mobilenet.MobileNet>();


  const loadModel = async () => {
    console.log("Load model");
    const model = await mobilenet.load();
    console.log("Type of model:", typeof model);
    setNet(model); // Set the loaded model to the state
    console.log("model loaded");
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      console.log("set permission");
	  setNet(await mobilenet.load());

    console.log("model loaded");

    })();

    loadModel();
  }, []);

  let frame = 0;
  const computeRecognitionEveryNFrames = 60;

  const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
    console.log("handle camera stream is on");
    const loop = async () => {
      console.log("loop is stared");
      if (net) {
        console.log("net model is on");
        if (frame % computeRecognitionEveryNFrames === 0) {
          console.log("start compute every frame");
          const nextImageTensor = images.next().value;
          console.log("send next image tensor");
          if (nextImageTensor) {
            console.log("next image tensor is not null");
            const objects = await net.classify(nextImageTensor);
            console.log(objects.map((object) => object.className));
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
    console.log("permission is null");
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!net) {
    return <Text>Model not loaded</Text>;
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
