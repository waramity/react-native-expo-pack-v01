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

export { textureDims };
