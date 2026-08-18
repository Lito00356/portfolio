import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Floppy from "@functional/FloppyDisk/Floppy";
import { STICKERS } from "@lib/paths";

const Landing = () => {
  return (
    <Canvas className="carousel-canvas" camera={{ position: [1, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Floppy position={[0, 0, 0]} texturePath={STICKERS.vfx} />
        <Floppy position={[1, 0, 0]} texturePath={STICKERS.coding} />
        <Floppy position={[-1, 0, 0]} texturePath={STICKERS.about} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Landing;
