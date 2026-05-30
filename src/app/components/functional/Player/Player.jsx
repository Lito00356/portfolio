import { useGLTF } from "@react-three/drei";
import "./Player.css";
import { useEffect, useRef } from "react";
import { MeshStandardMaterial } from "three";
import { MODELS } from "@lib/paths";
import { useFrame } from "@react-three/fiber";

const BUTTON_NAMES = ["Button_left", "Button_middle", "Button_right"];

const BUTTON_HOVER_COLORS = {
  Button_left: "#ff6666",
  Button_middle: "#66ff66",
  Button_right: "#6666ff",
};

const DEFAULT_COLOR = "yellow";

function Player({ scale, position }) {
  const { scene } = useGLTF(MODELS.player);
  const materialsRef = useRef({});
  const clickAnimRef = useRef({});

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const mat = new MeshStandardMaterial({ color: DEFAULT_COLOR });
        child.material = mat;
        if (BUTTON_NAMES.includes(child.name)) {
          materialsRef.current[child.name] = mat;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    Object.entries(clickAnimRef.current).forEach(([name, anim]) => {
      if (!anim.mesh) return;

      anim.t += delta * anim.dir * 5;

      if (anim.t >= 1) {
        anim.t = 1;
        anim.dir = -1;
      }
      if (anim.t <= 0) {
        anim.mesh.scale.setScalar(1);
        delete clickAnimRef.current[name];
        return;
      }

      const s = 1 + Math.sin(anim.t * Math.PI) * 0.3;
      anim.mesh.scale.setScalar(s);
    });
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    const name = e.object.name;
    if (!BUTTON_NAMES.includes(name)) return;
    const mat = materialsRef.current[name];
    if (mat) mat.color.set(BUTTON_HOVER_COLORS[name]);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    const name = e.object.name;
    if (!BUTTON_NAMES.includes(name)) return;
    const mat = materialsRef.current[name];
    if (mat) mat.color.set(DEFAULT_COLOR);
    document.body.style.cursor = "auto";
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const mesh = e.object;
    if (!BUTTON_NAMES.includes(mesh.name)) return;
    clickAnimRef.current[mesh.name] = { mesh, t: 0, dir: 1 };
  };

  return (
    <group scale={scale} position={position}>
      <primitive
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
    </group>
  );
}

export default Player;
