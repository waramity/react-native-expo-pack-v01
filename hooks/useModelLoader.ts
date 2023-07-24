import { useEffect, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

export const useModelLoader = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  return model;
};
