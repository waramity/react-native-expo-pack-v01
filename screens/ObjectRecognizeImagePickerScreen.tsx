import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, TextInput, Button } from "react-native";

import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component
import { useModelLoader } from "../hooks/useModelLoader"; // Import the custom hook
import { fetch as tfjsFetch, decodeJpeg } from "@tensorflow/tfjs-react-native";

import * as tf from "@tensorflow/tfjs";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook

export default function ObjectRecognizeImagePickerScreen() {
  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress
  const model = useModelLoader("mobilenet");

  const [image, setImage] = useState({
    uri: null,
  });
  const [predictions, setPredictions] = useState(null);

  if (!model) {
    return <ProgressBar loadingProgress={loadingProgress} />;
  }

  const classifyImage = async (imgUri) => {
    try {
      const fileUri = imgUri;
      const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const newData = new Uint8Array(imgBuffer);
      const imageTensor = decodeJpeg(newData); // transforms byte array into 3d tensor
      const prediction = await model.classify(imageTensor);
      setPredictions(prediction);
      console.info(prediction);
    } catch (error) {
      console.log(error);
    }
  };

  const clearPredictions = () => {
    setPredictions(null);
  };

  const selectImage = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        await setImage(source);
        classifyImage(response.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image.uri }}
        style={{ width: 200, height: 200, margin: 20 }}
      />

      <Text>Paste Image URI Here!</Text>
      <TextInput
        style={{
          marginBottom: 20,
          width: 200,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setImage({ uri: text })}
        value={image.uri}
      />
      <Button
        title="Predict"
        onPress={model ? selectImage : undefined}
        disabled={model ? false : true}
      />
      {predictions ? (
        <View style={styles.predictions}>
          <Text
            style={{
              marginBottom: 20,
            }}
          >
            I'm {predictions[0].probability.toFixed(2)}% sure it's a{" "}
            {predictions[0].className.toLowerCase()}
            {", "}
            it might also be a {predictions[1].className.toLowerCase()} or{" "}
            {predictions[2].className.toLowerCase()}
          </Text>
          <Button title="Clear" onPress={clearPredictions} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  predictions: {
    borderColor: "grey",
    borderWidth: 1,
    width: 300,
    padding: 20,
    margin: 20,
  },
});
