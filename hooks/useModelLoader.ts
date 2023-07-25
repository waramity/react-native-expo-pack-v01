import { useEffect, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

import * as handpose from "@tensorflow-models/handpose";

export const useModelLoader = (modelType) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      let loadedModel = null;
      if (modelType === "mobilenet") {
        loadedModel = await mobilenet.load();
      } else if (modelType === "handpose") {
        loadedModel = await handpose.load();
      }
      setModel(loadedModel);
    };

    loadModel();
  }, [modelType]);

  return model;
};
