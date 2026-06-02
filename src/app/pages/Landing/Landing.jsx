import { Canvas } from "@react-three/fiber";
import "./Landing.css";
import { Suspense } from "react";
import Player from "@functional/Player/Player";
import ParallaxCam from "../../components/functional/ParallaxCam/ParallaxCam";

const Landing = () => {
  return (
    <>
      <div className="canvas">
        <Canvas shadows>
          <spotLight position={[-5, 15, -28]} intensity={30} penumbra={25} distance={100} castShadow />
          <spotLight position={[5, 15, 0]} intensity={45} penumbra={25} distance={100} castShadow />
          <spotLight position={[15, 3, 0]} intensity={3} penumbra={1} />
          <Suspense fallback={null}>
            <mesh rotation={[Math.PI / 2, Math.PI / 1, 0]} scale={[80, 125, 1]} position={[-15, 0, -20]} receiveShadow>
              <planeGeometry />
              <shadowMaterial transparent opacity={0.4} />
            </mesh>
            <Player />
          </Suspense>
          <ParallaxCam />
        </Canvas>
      </div>
    </>
  );
};

export default Landing;
