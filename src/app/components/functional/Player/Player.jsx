import { useGLTF, useAnimations } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import "./Player.css";
import { useEffect, useState } from "react";
import { MeshStandardMaterial, LoopOnce } from "three";
import { MODELS } from "@lib/paths";
import { useNavigate } from "react-router";

const BUTTON_CONFIG = {
  Button_01: { animation: "Play_btn1", route: "/vfx" },
  Button_02: { animation: "Play_btn2", route: "/coding" },
  Button_03: { animation: "Play_btn3", route: "/about" },
  Button_04: { animation: "Play_btn4", route: "/contact" },
};

const BUTTON_NAMES = Object.keys(BUTTON_CONFIG);
const DEFAULT_COLOR = "yellow";

function Player({ scale, position }) {
  const { scene, animations } = useGLTF(MODELS.player);
  const { actions } = useAnimations(animations, scene);
  const navigate = useNavigate();
  const [hoveredMesh, setHoveredMesh] = useState(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({ color: DEFAULT_COLOR });
        child.castShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    BUTTON_NAMES.forEach((name) => {
      const action = actions[BUTTON_CONFIG[name].animation];
      if (action) {
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;
      }
    });
  }, [actions]);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (!BUTTON_NAMES.includes(e.object.name)) return;
    setHoveredMesh(e.object);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    if (!BUTTON_NAMES.includes(e.object.name)) return;
    setHoveredMesh(null);
    document.body.style.cursor = "auto";
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const name = e.object.name;
    if (!BUTTON_CONFIG[name]) return;

    const { animation, route } = BUTTON_CONFIG[name];
    const action = actions[animation];
    if (action) {
      action.reset().play();
    }

    setTimeout(() => navigate(route), 300);
  };

  return (
    <>
      <group scale={scale} position={position}>
        <primitive object={scene} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick} />
      </group>
      <EffectComposer autoClear={false}>
        <Outline
          selection={hoveredMesh ? [hoveredMesh] : []}
          edgeStrength={5}
          visibleEdgeColor={0xffffff}
          hiddenEdgeColor={0x000000}
          xRay={false}
        />
      </EffectComposer>
    </>
  );
}

export default Player;
