import tf from "@tensorflow/tfjs";
import { useLoadingProgress } from "./useLoadingProgress";

let frame = 0;
const computeRecognitionEveryNFrames = 60;

export function handleCameraStream(
  model: tf.GraphModel | null,
  images: IterableIterator<tf.Tensor3D>,
  processImage: () => void // Add this argument for the custom processing function
) {
  const loop = async () => {
    if (model) {
      if (frame % computeRecognitionEveryNFrames === 0) {
        const nextImageTensor = images.next().value;
        if (nextImageTensor) {
          processImage(nextImageTensor); // Call the custom processing function here
          // Run code only here

          tf.dispose([nextImageTensor]);
        }
      }
      frame += 1;
      frame = frame % computeRecognitionEveryNFrames;
    }

    requestAnimationFrame(loop);
  };
  loop();
}
