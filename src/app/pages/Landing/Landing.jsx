import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useState } from "react";
import Carousel from "@functional/Carousel/Carousel";

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => i + 1);
  const goBack = () => setActiveIndex((i) => i - 1);

  return (
    <>
      <Canvas className="carousel-canvas" camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Carousel activeIndex={activeIndex} />
        </Suspense>
      </Canvas>
      <button onClick={goBack}>Prev</button>
      <button onClick={goNext}>Next</button>
    </>
  );
};

export default Landing;
