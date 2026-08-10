import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "./landing.css";

const ORBIT_RADIUS = 400;
const MAX_TILT_X = 10;
const MAX_TILT_Y = 5;
const SMOOTHING_ROTATION = 0.05;
const SMOOTHING_X = 0.05;
const SMOOTHING_Y = 0.05;
const PREVIEW_DELAY_MS = 1500;

const lerp = (from, to, amount) => from + (to - from) * amount;

const SLIDES = [
  { title: "Vfx", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Coding", image: "https://placehold.co/600x400", route: "/coding" },
  { title: "About", image: "https://placehold.co/600x400", route: "/about" },
  { title: "Contact", image: "https://placehold.co/600x400", route: "/contact" },
  { title: "Vfx", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Coding", image: "https://placehold.co/600x400", route: "/coding" },
  { title: "About", image: "https://placehold.co/600x400", route: "/about" },
  { title: "Contact", image: "https://placehold.co/600x400", route: "/contact" },
];

const ANGLE_STEP = 360 / SLIDES.length;

const Landing = () => {
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
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
    shownIndex: 0,
    rafId: null,
  });

  const getActiveIndex = (targetRotation) => {
    const steps = Math.round(-targetRotation / ANGLE_STEP);
    return ((steps % SLIDES.length) + SLIDES.length) % SLIDES.length;
  };

  const triggerPreviewDelay = (index) => {
    clearTimeout(previewTimerRef.current);
    if (previewBoxRef.current) previewBoxRef.current.style.opacity = "0";

    previewTimerRef.current = setTimeout(() => {
      if (previewImgRef.current) previewImgRef.current.src = SLIDES[index].image;
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
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    const titleEl = titleRef.current;
    const a = anim.current;

    const onMouseMove = (e) => {
      a.targetTiltY = (e.clientX / window.innerWidth - 0.5) * MAX_TILT_Y;
      a.targetTiltX = -(e.clientY / window.innerHeight - 0.5) * MAX_TILT_X;
    };

    const onMouseLeave = () => {
      a.targetTiltX = 0;
      a.targetTiltY = 0;
    };

    const tick = () => {
      a.currentRotation = lerp(a.currentRotation, a.targetRotation, SMOOTHING_ROTATION);
      a.currentTiltX = lerp(a.currentTiltX, a.targetTiltX, SMOOTHING_X);
      a.currentTiltY = lerp(a.currentTiltY, a.targetTiltY, SMOOTHING_Y);

      orbit.style.transform = `translate(-50%, -50%) rotateY(${a.currentRotation}deg)`;
      stage.style.transform = `rotateX(${a.currentTiltX}deg) rotateY(${a.currentTiltY}deg)`;

      const steps = Math.round(-a.currentRotation / ANGLE_STEP);
      const activeIndex = ((steps % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (activeIndex !== a.shownIndex) {
        a.shownIndex = activeIndex;
        titleEl.textContent = SLIDES[activeIndex].title;
      }

      a.rafId = requestAnimationFrame(tick);
    };

    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("mouseleave", onMouseLeave);
    a.rafId = requestAnimationFrame(tick);

    triggerPreviewDelay(0);

    return () => {
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(a.rafId);
      clearTimeout(previewTimerRef.current);
    };
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      <div className="stage" ref={stageRef}>
        <div className="preview" ref={previewBoxRef}>
          <img className="preview-img" src={SLIDES[0].image} alt={SLIDES[0].title} ref={previewImgRef} />
        </div>

        <div className="orbit" ref={orbitRef}>
          {SLIDES.map((slide, i) => (
            <div
              key={`${slide.title}-${i}`}
              className="panel"
              style={{ transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${ORBIT_RADIUS}px)` }}
              onClick={() => navigate(slide.route)}
            >
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
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
