import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  ProgressBarAndroid,
  ProgressViewIOS,
} from "react-native";

import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

export default function LoadModelScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [net, setNet] = useState<mobilenet.MobileNet>();

  const loadModel = async () => {
    const model = await mobilenet.load();
    setNet(model); // Set the loaded model to the state
  };

  useEffect(() => {
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

  if (!net) {
    return renderProgressBar();
  }

  return (
    <View style={styles.container}>
      <Text>Model load success</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
