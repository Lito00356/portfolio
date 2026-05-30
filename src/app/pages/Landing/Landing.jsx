import { Canvas } from "@react-three/fiber";
import "./Landing.css";
import { Suspense } from "react";
import Player from "@functional/Player/Player";
import ParallaxCam from "../../components/functional/ParallaxCam/ParallaxCam";

const Landing = () => {
  return (
    <>
      <Canvas shadows>
        <ambientLight intensity={0.5} color={"#e8f0ff"} />
        <directionalLight position={[-3, 3, 0]} intensity={2} castShadow />
        <Suspense fallback={null}>
          <mesh rotation={[Math.PI / 2, Math.PI / 1, 0]} scale={[25, 25, 25]} receiveShadow>
            <planeGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
          <Player />
        </Suspense>
        <ParallaxCam />
      </Canvas>
    </>
  );
};

export default Landing;
