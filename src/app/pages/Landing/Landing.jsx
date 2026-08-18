import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "@functional/Carousel/Carousel";
import Screen from "@functional/Screen/Screen";
import Camera from "@functional/Camera/Camera";

const PAGES = [
  { title: "Vfx", key: "vfx", route: "/vfx" },
  { title: "Coding", key: "coding", route: "/coding" },
  { title: "About", key: "about", route: "/about" },
  { title: "Contact", key: "contact", route: "/contact" },
];

const SETTLE_DELAY = 1000;

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoKey, setActiveVideoKey] = useState(null);
  const videoTimerRef = useRef();

  const wrappedIndex = ((activeIndex % PAGES.length) + PAGES.length) % PAGES.length;
  const activePage = PAGES[wrappedIndex];

  const goNext = () => setActiveIndex((i) => i + 1);
  const goBack = () => setActiveIndex((i) => i - 1);

  useEffect(() => {
    clearTimeout(videoTimerRef.current);
    setActiveVideoKey(null);

    videoTimerRef.current = setTimeout(() => {
      setActiveVideoKey(activePage.key);
    }, SETTLE_DELAY);

    return () => clearTimeout(videoTimerRef.current);
  }, [activePage.key]);

  return (
    <>
      <Canvas className="carousel-canvas">
        <Camera />
        {/* <ambientLight intensity={0.5} /> */}

        <Suspense fallback={null}>
          <Carousel pages={PAGES} activeIndex={activeIndex} activePageIndex={wrappedIndex} />
          <Screen activeVideoKey={activeVideoKey} />
        </Suspense>
      </Canvas>

      <button onClick={goBack}>Prev</button>
      <button onClick={goNext}>Next</button>
    </>
  );
};

export default Landing;
