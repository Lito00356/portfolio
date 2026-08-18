import { MODELS } from "@lib/paths";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { SRGBColorSpace } from "three";

const floppyScale = 1;

export const Floppy = ({ texturePath, ...props }) => {
  const { scene } = useGLTF(MODELS.floppy);
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

  return <primitive object={clonedScene} scale={floppyScale} {...props} />;
};

export default Floppy;
