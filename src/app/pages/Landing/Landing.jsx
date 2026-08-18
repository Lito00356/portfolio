import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "@functional/Carousel/Carousel";

const PAGES = [
  { title: "Vfx", key: "vfx", route: "/vfx" },
  { title: "Coding", key: "coding", route: "/coding" },
  { title: "About", key: "about", route: "/about" },
  { title: "Contact", key: "contact", route: "/contact" },
];

const HOVER_DELAY = 2000;

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [activeVideoKey, setActiveVideoKey] = useState(null);
  const hoverTimerRef = useRef();

  const wrappedIndex = ((activeIndex % PAGES.length) + PAGES.length) % PAGES.length;
  const activePage = PAGES[wrappedIndex];

  const goNext = () => setActiveIndex((i) => i + 1);
  const goBack = () => setActiveIndex((i) => i - 1);

  useEffect(() => {
    clearTimeout(hoverTimerRef.current);

    if (hoveredKey) {
      hoverTimerRef.current = setTimeout(() => {
        setActiveVideoKey(hoveredKey);
      }, HOVER_DELAY);
    } else {
      setActiveVideoKey(null);
    }

    return () => clearTimeout(hoverTimerRef.current);
  }, [hoveredKey]);

  return (
    <>
      <Canvas className="carousel-canvas" camera={{ position: [0, 2, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Carousel pages={PAGES} activeIndex={activeIndex} onHoveredPageChange={setHoveredKey} />
        </Suspense>
      </Canvas>

      <button onClick={goBack}>Prev</button>
      <button onClick={goNext}>Next</button>
    </>
  );
};

export default Landing;
