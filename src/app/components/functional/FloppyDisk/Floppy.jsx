import { MODELS } from "@lib/paths";
import { useCursor, useEnvironment, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { SRGBColorSpace } from "three";

const FLOPPY_SCALE = 0.5;
const HOVER_SCALE = 0.52;
const FLOAT_AMPLITUDE = 0.02;
const TILT_AMPLITUDE = 0.02;
const PAN_AMPLITUDE = 0.08;
const ENV_MAP_INTENSITY = 0.5;

export const Floppy = ({ texturePath, onSelect, position, rotation, isActive, floatOffset = 0, ...props }) => {
  const { scene } = useGLTF(MODELS.floppy);
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const stickerTexture = useTexture(texturePath, (texture) => {
    texture.flipY = false;
    texture.colorSpace = SRGBColorSpace;
  });
  const environmentTexture = useEnvironment({ preset: "studio" });

  useCursor(hovered);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
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

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMap = isActive ? environmentTexture : null;
        child.material.envMapIntensity = isActive ? ENV_MAP_INTENSITY : 0;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, isActive, environmentTexture]);

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={hovered ? HOVER_SCALE : FLOPPY_SCALE}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(isActive ? true : false);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      {...props}
    />
  );
};

export default Floppy;
