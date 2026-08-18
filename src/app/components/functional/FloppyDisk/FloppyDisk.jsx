import { useRef, useMemo, useEffect, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MODELS } from "@lib/paths";

const STICKER_MATERIAL_NAME = "Sticker";
const FLOAT_AMPLITUDE = 0.05;
const TILT_AMPLITUDE = 0.05;
const HOVER_SCALE = 1.05;

// The exported model renders upside down in this scene; flip it right-side up.
// Flipping on X also reverses the front/back facing, which is compensated
// for in CarouselScene by adding Math.PI to each disk's ring yaw rotation.
const MODEL_ROTATION_CORRECTION = [Math.PI, 0, 0];

function FloppyDisk({ texturePath, position, rotationY, scale = 1, floatOffset = 0, onSelect }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(MODELS.floppy);
  const stickerTexture = useTexture(texturePath);
  const [hovered, setHovered] = useState(false);

  // Each disk needs its own Sticker material instance, otherwise every disk
  // ends up sharing the same (cached) material and shows the same texture.
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material?.name === STICKER_MATERIAL_NAME) {
          child.material = child.material.clone();
        }
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material?.name === STICKER_MATERIAL_NAME) {
        child.material.map = stickerTexture;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, stickerTexture]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t + floatOffset) * FLOAT_AMPLITUDE;
    groupRef.current.rotation.z = Math.sin(t * 0.6 + floatOffset) * TILT_AMPLITUDE;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={hovered ? scale * HOVER_SCALE : scale}
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
    >
      <group rotation={MODEL_ROTATION_CORRECTION}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODELS.floppy);

export default FloppyDisk;
