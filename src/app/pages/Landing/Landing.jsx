import { Canvas } from "@react-three/fiber";
import "./Landing.css";
import { OrbitControls } from "@react-three/drei";

const Landing = () => {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={1} color={"#e8f0ff"} />

        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </Canvas>
    </>
  );
};

export default Landing;
