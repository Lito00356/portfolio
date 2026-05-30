import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

function ParallaxCam() {
  const cameraRef = useRef();
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });

  useFrame(({ pointer }) => {
    const orbitRadius = 5;
    const orbitStrength = 0.5;
    const baseAngle = Math.PI / 4;
    const height = 2.5;

    const angle = baseAngle - pointer.x * orbitStrength;

    targetPosition.current.x = 20 + Math.cos(angle) * orbitRadius;
    targetPosition.current.z = 18 + Math.sin(angle) * orbitRadius;
    targetPosition.current.y = 8 + height + pointer.y * 1.25;

    if (!cameraRef.current) return;

    cameraRef.current.position.x += (targetPosition.current.x - cameraRef.current.position.x) * 0.08;
    cameraRef.current.position.y += (targetPosition.current.y - cameraRef.current.position.y) * 0.08;
    cameraRef.current.position.z += (targetPosition.current.z - cameraRef.current.position.z) * 0.08;

    cameraRef.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[5, 2.5, 5]} fov={50} />;
}

export default ParallaxCam;
