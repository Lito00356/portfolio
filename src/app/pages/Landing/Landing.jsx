import { Canvas } from "@react-three/fiber";
import "./Landing.css";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Player from "@functional/Player/Player";

const Landing = () => {
  return (
    <>
      <Canvas camera={{ position: [20, 15, 20], fov: 50 }}>
        <OrbitControls />
        {/* <ambientLight intensity={0.5} color={"#e8f0ff"} /> */}
        {/* <directionalLight position={[3, 3, 3]} intensity={0.5} /> */}
        <Suspense fallback={null}>
          <mesh rotation={[Math.PI / 2, Math.PI / 1, 0]} scale={[25, 25, 25]}>
            <planeGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
          <Player />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Landing;
