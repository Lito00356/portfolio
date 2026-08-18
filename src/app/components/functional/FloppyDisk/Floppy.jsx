import { MODELS } from "@lib/paths";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { SRGBColorSpace } from "three";

const floppyScale = 1;
const HOVER_SCALE = 1.03;

export const Floppy = ({ texturePath, onSelect, ...props }) => {
  const { scene } = useGLTF(MODELS.floppy);
  const [hovered, setHovered] = useState(false);
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

  return (
    <primitive
      object={clonedScene}
      scale={hovered ? HOVER_SCALE : floppyScale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      {...props}
    />
  );
};

export default Floppy;
