import { MODELS } from "@lib/paths";
import { useGLTF } from "@react-three/drei";

export const Floppy = (props) => {
  const { scene } = useGLTF(MODELS.floppy);
  return <primitive object={scene} scale={1} {...props} />;
};

export default Floppy;
