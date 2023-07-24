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

const TensorCamera = cameraWithTensors(Camera);

export default function RealtimeObjectRecognizeScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [net, setNet] = useState<mobilenet.MobileNet>();
  const [classifiedText, setClassifiedText] = useState("Initial Text");

  const loadModel = async () => {
    const model = await mobilenet.load();
    setNet(model); // Set the loaded model to the state
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      setNet(await mobilenet.load());
    })();

    loadModel();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 0.9) {
          clearInterval(interval);
        }
        return prevProgress + 0.1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  let frame = 0;
  const computeRecognitionEveryNFrames = 60;

  const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      if (net) {
        if (frame % computeRecognitionEveryNFrames === 0) {
          const nextImageTensor = images.next().value;
          if (nextImageTensor) {
            const objects = await net.classify(nextImageTensor);
            console.log(objects.map((object) => object.className));
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

  const renderProgressBar = () => {
    if (Platform.OS === "ios") {
      return <ProgressViewIOS progress={loadingProgress} />;
    } else {
      return (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={loadingProgress}
        />
      );
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!net) {
    return renderProgressBar();
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
