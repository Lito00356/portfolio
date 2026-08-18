import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Camera = () => {
  const camRef = useRef();

  useEffect(() => {
    camRef.current.lookAt(0, 0.6, 0);
  }, []);

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 0.8, 5]} fov={30} />;
};

export default Camera;
