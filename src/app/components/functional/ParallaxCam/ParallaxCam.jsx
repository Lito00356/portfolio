import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

function ParallaxCam() {
  const cameraRef = useRef();
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });

  useFrame(({ pointer }) => {
    const orbitRadius = 5;
    const orbitStrength = 0.2;
    const baseAngle = Math.PI / 4;
    const height = 2.5;
    const multiplier = 0.08;

    const angle = baseAngle - pointer.x * orbitStrength;

    targetPosition.current.x = 23 + Math.cos(angle) * orbitRadius;
    targetPosition.current.z = 8 + Math.sin(angle) * orbitRadius;
    targetPosition.current.y = 6 + height + pointer.y * 1.25;

    if (!cameraRef.current) return;

    cameraRef.current.position.x += (targetPosition.current.x - cameraRef.current.position.x) * multiplier;
    cameraRef.current.position.y += (targetPosition.current.y - cameraRef.current.position.y) * multiplier;
    cameraRef.current.position.z += (targetPosition.current.z - cameraRef.current.position.z) * multiplier;

    cameraRef.current.lookAt(5, 2, -2);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[5, 2.5, 5]} fov={50} />;
}

export default ParallaxCam;
