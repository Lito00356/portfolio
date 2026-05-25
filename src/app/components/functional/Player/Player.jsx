import { useGLTF } from "@react-three/drei";
import "./Player.css";
import { useEffect } from "react";
import { MeshBasicMaterial } from "three";
import { MODELS } from "@lib/paths";

function Player({ scale, position }) {
  const { scene } = useGLTF(MODELS.player);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshBasicMaterial({ color: "yellow" });
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} position={position} />;
}

export default Player;
