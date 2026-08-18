import Floppy from "@functional/FloppyDisk/Floppy";
import { STICKERS } from "@lib/paths";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useNavigate } from "react-router";

const RADIUS = 1;
const SMOOTHING = 0.08;

const Carousel = ({ pages, activeIndex }) => {
  const groupRef = useRef(null);
  const navigate = useNavigate();
  const angleStep = (2 * Math.PI) / pages.length;
  const targetRotation = -activeIndex * angleStep;

  useFrame(() => {
    if (!groupRef.current) return;
    const current = groupRef.current.rotation.y;
    groupRef.current.rotation.y = current + (targetRotation - current) * SMOOTHING;
  });

  const floppyDisks = pages.map((page, index) => {
    const angle = index * ((2 * Math.PI) / pages.length);
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    return (
      <Floppy
        key={page.key}
        position={[x, 0, z]}
        rotation={[0, angle, 0]}
        floatOffset={index * 0.7}
        texturePath={STICKERS[page.key]}
        onSelect={() => navigate(page.route)}
      />
    );
  });

  return <group ref={groupRef}>{floppyDisks}</group>;
};

export default Carousel;
