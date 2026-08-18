import { SpotLight } from "@react-three/drei";

const Spotlight = (radius) => {
  const FRONT_POSITION = [0, 0.2, radius];

  return (
    <SpotLight
      position={[0, 3, radius + 2]}
      target-position={FRONT_POSITION}
      angle={0.4}
      penumbra={0.5}
      intensity={2}
      distance={6}
    />
  );
};

export default Spotlight;
