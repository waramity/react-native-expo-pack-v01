import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraComponent from '../components/common/CameraComponent'

import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const TensorCamera = cameraWithTensors(Camera);

interface Props {
  onReady: (
    images: IterableIterator<tf.Tensor3D>,
    updateCameraPreview: () => void,
    gl: ExpoWebGLRenderingContext,
    cameraTexture: WebGLTexture
  ) => void;
}

const ObjectDetectionCameraScreen = () => {

function handleCameraStream(images, updatePreview, gl) {
     const loop = async () => {
       const nextImageTensor = images.next().value

       //
       // do something with tensor here
       //

       // if autorender is false you need the following two lines.
       // updatePreview();
       // gl.endFrameEXP();

       requestAnimationFrame(loop);
     }
     loop();
   }
  return (
    <View style={styles.container}>
	  <CameraComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ObjectDetectionCameraScreen;
