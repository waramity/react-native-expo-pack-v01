import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import CameraComponent from "../components/common/CameraComponent";

import { Camera, CameraType } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import * as tf from "@tensorflow/tfjs";

const TensorCamera = cameraWithTensors(Camera);

const TensorCameraScreen: React.FC = (): React.ReactElement => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
        onReady={() => {}}
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
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default TensorCameraScreen;
