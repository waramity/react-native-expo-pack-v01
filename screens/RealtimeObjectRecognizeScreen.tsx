import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import CameraComponent from "../components/common/CameraComponent";

import { Camera, CameraType } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import * as tf from "@tensorflow/tfjs-core";
import * as mobilenet from "@tensorflow-models/mobilenet";

const TensorCamera = cameraWithTensors(Camera);

export default function RealtimeObjectRecognizeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [net, setNet] = useState<mobilenet.MobileNet>();

  const loadModel = async () => {
    try {
      setNet(async () => await mobilenet.load());
      console.log("model loaded");
    } catch (err) {
      console.log("model not loaded");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      console.log("set permission");
    })();
    loadModel();
  }, []);

  if (hasPermission === null) {
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

  const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      if (net) {
        const nextImageTensor = images.next().value;
        if (nextImageTensor) {
          const objects = await net.classify(nextImageTensor);
          console.log(objects.map((object) => object.className));
          tf.dispose([nextImageTensor]);
        }
      }
      requestAnimationFrame(loop);
    };
    loop();
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
