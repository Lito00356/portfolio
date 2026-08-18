import { MODELS } from "@lib/paths";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { SRGBColorSpace } from "three";

const floppyScale = 1;
const HOVER_SCALE = 1.03;
const FLOAT_AMPLITUDE = 0.02;
const TILT_AMPLITUDE = 0.02;
const PAN_AMPLITUDE = 0.08;

export const Floppy = ({ texturePath, onSelect, onHover, position, rotation, floatOffset = 0, ...props }) => {
  const { scene } = useGLTF(MODELS.floppy);
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const stickerTexture = useTexture(texturePath, (texture) => {
    texture.flipY = false;
    texture.colorSpace = SRGBColorSpace;
  });

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material.name === "Sticker") {
        child.material = child.material.clone();
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material.name === "Sticker") {
        child.material.map = stickerTexture;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, stickerTexture]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.elapsedTime;

    ref.current.position.y = position[1] + Math.sin(time + floatOffset) * FLOAT_AMPLITUDE;
    ref.current.rotation.z = Math.sin(time * 1 + floatOffset) * TILT_AMPLITUDE;
    ref.current.rotation.x = Math.cos(time * 0.8 + floatOffset) * PAN_AMPLITUDE;
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={hovered ? HOVER_SCALE : floppyScale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
        onHover?.(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
        onHover?.(false);
      }}
      {...props}
    />
  );
};

export default Floppy;
