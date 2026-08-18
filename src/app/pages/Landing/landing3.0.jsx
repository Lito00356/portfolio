import { useRef, useEffect, Suspense } from "react";
import { useNavigate } from "react-router";
import { Canvas } from "@react-three/fiber";
import CarouselScene from "./CarouselScene";
import { STICKERS } from "@lib/paths";
import "./landing.css";

const MAX_TILT_X_DEG = 5;
const MAX_TILT_Y_DEG = 8;
const SMOOTHING_ROTATION = 0.08;
const SMOOTHING_TILT = 0.06;
const PREVIEW_DELAY_MS = 1500;
const RING_RADIUS = 4.5;
const DISK_SCALE = 2;

const degToRad = (deg) => (deg * Math.PI) / 180;

const PAGES = [
  { title: "Vfx", key: "vfx", route: "/vfx" },
  { title: "Coding", key: "coding", route: "/coding" },
  { title: "About", key: "about", route: "/about" },
  { title: "Contact", key: "contact", route: "/contact" },
];

// doubled so the ring is always populated, no matter which route you land on
const SLIDES = [...PAGES, ...PAGES];
const ANGLE_STEP = (Math.PI * 2) / SLIDES.length;

const Landing = () => {
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const previewBoxRef = useRef(null);
  const previewImgRef = useRef(null);
  const titleRef = useRef(null);
  const previewTimerRef = useRef(null);

  const anim = useRef({
    targetRotation: 0,
    currentRotation: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    smoothingRotation: SMOOTHING_ROTATION,
    smoothingTilt: SMOOTHING_TILT,
    shownIndex: 0,
  });

  const getActiveIndex = (targetRotation) => {
    const steps = Math.round(-targetRotation / ANGLE_STEP);
    return ((steps % SLIDES.length) + SLIDES.length) % SLIDES.length;
  };

  const triggerPreviewDelay = (index) => {
    clearTimeout(previewTimerRef.current);
    if (previewBoxRef.current) previewBoxRef.current.style.opacity = "0";

    previewTimerRef.current = setTimeout(() => {
      if (previewImgRef.current) previewImgRef.current.src = STICKERS[SLIDES[index].key];
      if (previewBoxRef.current) previewBoxRef.current.style.opacity = "1";
    }, PREVIEW_DELAY_MS);
  };

  const goNext = () => {
    anim.current.targetRotation -= ANGLE_STEP;
    triggerPreviewDelay(getActiveIndex(anim.current.targetRotation));
  };

  const goBack = () => {
    anim.current.targetRotation += ANGLE_STEP;
    triggerPreviewDelay(getActiveIndex(anim.current.targetRotation));
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const a = anim.current;

    const onMouseMove = (e) => {
      a.targetTiltY = (e.clientX / window.innerWidth - 0.5) * degToRad(MAX_TILT_Y_DEG);
      a.targetTiltX = -(e.clientY / window.innerHeight - 0.5) * degToRad(MAX_TILT_X_DEG);
    };

    const onMouseLeave = () => {
      a.targetTiltX = 0;
      a.targetTiltY = 0;
    };

    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("mouseleave", onMouseLeave);

    triggerPreviewDelay(0);

    return () => {
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(previewTimerRef.current);
    };
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      <Canvas shadows className="carousel-canvas">
        <Suspense fallback={null}>
          <CarouselScene
            slides={SLIDES}
            angleStep={ANGLE_STEP}
            radius={RING_RADIUS}
            diskScale={DISK_SCALE}
            animRef={anim}
            titleRef={titleRef}
            onSelect={(route) => navigate(route)}
          />
        </Suspense>
      </Canvas>

      <div className="preview" ref={previewBoxRef}>
        <img className="preview-img" src={STICKERS[SLIDES[0].key]} alt={SLIDES[0].title} ref={previewImgRef} />
      </div>

      <button className="carousel-btn carousel-btn--left" onClick={goBack} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button className="carousel-btn carousel-btn--right" onClick={goNext} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className="titleTag" ref={titleRef}>
        {SLIDES[0].title}
      </span>
    </div>
  );
};

export default Landing;
