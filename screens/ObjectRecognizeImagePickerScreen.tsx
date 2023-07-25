import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, TextInput, Button } from "react-native";

import ProgressBar from "../components/loaders/ProgressBar"; // Import the ProgressBar component
import { useModelLoader } from "../hooks/useModelLoader"; // Import the custom hook
import * as ImagePicker from 'expo-image-picker';


import useLoadingProgress from "../utils/useLoadingProgress"; // Import the custom hook

export default function ObjectRecognizeImagePickerScreen() {

  const loadingProgress = useLoadingProgress(); // Use the custom hook to get the loading progress
  const model = useModelLoader("mobilenet");

	  const [image, setImage] = useState({
    uri: null,
  });

  if (!model) {
    return <ProgressBar loadingProgress={loadingProgress} />;
  }
	  const selectImage = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3]
      })

      if (!response.cancelled) {
        const source = { uri: response.uri }
        await setImage(source);
        classifyImage(response.uri);
      }
    } catch (error) {
      console.log(error)
    }
  }

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
          borderWidth: 1
        }}
        onChangeText={text => setImage({ uri: text })}
        value={image.uri}
      />
	      <Button
        title="Predict"
        onPress={model ? selectImage : undefined}
        disabled={model ? false : true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
