import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "@functional/Carousel/Carousel";
import Screen from "@functional/Screen/Screen";
import Camera from "@functional/Camera/Camera";
import "./Landing.css";

const PAGES = [
  { title: "Home", key: "home", route: "/" },
  { title: "Vfx", key: "vfx", route: "/vfx" },
  { title: "Coding", key: "coding", route: "/coding" },
  { title: "About", key: "about", route: "/about" },
  { title: "Contact", key: "contact", route: "/contact" },
];

const SETTLE_DELAY = 1000;
const RADIUS = 1;

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
        <spotLight intensity={1} />
        <Suspense fallback={null}>
          <Carousel pages={PAGES} activeIndex={activeIndex} activePageIndex={wrappedIndex} radius={RADIUS} />
          <Screen activeVideoKey={activeVideoKey} />
        </Suspense>
      </Canvas>

      <button className="ps1-btn ps1-btn--left" onClick={goBack} aria-label="Previous page">
        <span className="ps1-arrow" />
      </button>
      <button className="ps1-btn ps1-btn--right" onClick={goNext} aria-label="Next page">
        <span className="ps1-arrow ps1-arrow--right" />
      </button>
      <div>
        <h1>Tomasz Liksza</h1>
        <div>
          <span>Full-stack developer</span>
          <span>Engineering elegant, performant, and powerful web applications.</span>
        </div>
      </div>
    </>
  );
};

export default Landing;
