import { Canvas } from "@react-three/fiber";
import "./Landing.css";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { MODELS } from "@lib/paths";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF(MODELS.player);
  return (
    <>
      <primitive object={scene} />;
      <meshBasicMaterial color="yellow" />
    </>
  );
}

const Landing = () => {
  return (
    <>
      <Canvas camera={{ position: [10, 6, 10], fov: 50 }}>
        <OrbitControls />
        <ambientLight intensity={1} color={"#e8f0ff"} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Landing;
