import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

export function useCameraPermission(): boolean | null {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return hasPermission;
}
