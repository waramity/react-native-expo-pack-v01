import React from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerComponent({ onSelectImage }) {
  const selectImage = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
      });

      if (!response.cancelled) {
        onSelectImage(response.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Button title="Select Image" onPress={selectImage} />;
}
