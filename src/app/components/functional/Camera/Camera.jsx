import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Camera = () => {
  const camRef = useRef();

  useEffect(() => {
    camRef.current.lookAt(0, 0.7, 0);
  }, []);

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 1.1, 5]} fov={30} />;
};

export default Camera;
