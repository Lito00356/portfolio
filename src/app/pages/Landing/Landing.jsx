import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Carousel from "@functional/Carousel/Carousel";

const Landing = () => {
  return (
    <Canvas className="carousel-canvas" camera={{ position: [1, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Carousel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Landing;
