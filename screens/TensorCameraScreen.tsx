import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import CameraComponent from "../components/common/CameraComponent";

import { Camera, CameraType } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import * as tf from "@tensorflow/tfjs-core";

const TensorCamera = cameraWithTensors(Camera);

export default function TensorCameraScreen() {
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

//class ObjectDetectionCameraScreen extends React.Component<{}> {
//  handleCameraStream = (
//    images: IterableIterator<tf.Tensor3D>,
//    updatePreview: () => void,
//    gl: WebGLRenderingContext
//  ) => {
//    const loop = async () => {
//      const nextImageTensor = images.next().value;

//      //
//      // do something with tensor here
//      //

//      // if autorender is false you need the following two lines.
//      // updatePreview();
//      // gl.endFrameEXP();

//      requestAnimationFrame(loop);
//    };
//    loop();
//  };

//  render() {
//    // Currently expo does not support automatically determining the
//    // resolution of the camera texture used. So it must be determined
//    // empirically for the supported devices and preview size.

//    let textureDims;
//    if (Platform.OS === 'ios') {
//      textureDims = {
//        height: 1920,
//        width: 1080,
//      };
//    } else {
//      textureDims = {
//        height: 1200,
//        width: 1600,
//      };
//    }

//    return (
//      <View>
//        <TensorCamera
//          style={styles.camera}
//          type={0}
//          cameraTextureHeight={textureDims.height}
//          cameraTextureWidth={textureDims.width}
//          resizeHeight={200}
//          resizeWidth={152}
//          resizeDepth={3}
//          onReady={this.handleCameraStream}
//          useCustomShadersToResize={false} // Add this property
//          autorender={true}
//        />
//      </View>
//    );
//  }
//}

//const styles = {
//  camera: {
//    // Your camera styles here
//  },
//};

//export default ObjectDetectionCameraScreen;
