import Floppy from "@functional/FloppyDisk/Floppy";
import Shield from "@functional/Shield/Shield";
import { STICKERS } from "@lib/paths";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useNavigate } from "react-router";

const SMOOTHING = 0.08;
const SHIELD_Z_OFFSET = 0.3;

const Carousel = ({ pages, activeIndex, activePageIndex, radius }) => {
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
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    return (
      <Floppy
        key={page.key}
        position={[x, 0.2, z]}
        rotation={[0, angle, 0]}
        floatOffset={index * 0.7}
        texturePath={STICKERS[page.key]}
        isActive={index === activePageIndex}
        onSelect={() => navigate(page.route)}
      />
    );
  });

  return (
    <>
      <Shield radius={radius} shieldOffset={SHIELD_Z_OFFSET} />
      <group ref={groupRef}>{floppyDisks}</group>
    </>
  );
};

export default Carousel;
