import React from "react";
import { Platform, ProgressBarAndroid, ProgressViewIOS } from "react-native";

const ProgressBar = ({ loadingProgress }) => {
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

export default ProgressBar;
