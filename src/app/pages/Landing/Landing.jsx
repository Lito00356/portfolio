import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "./landing.css";

const ORBIT_RADIUS = 400;
const MAX_TILT = 30;
const SMOOTHING = 0.05;

const lerp = (from, to, amount) => from + (to - from) * amount;

const SLIDES = [
  { title: "Silent Bloom", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Tin Vessel", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Iris Study", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Soft Static", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "The Observer", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Blue Descent", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Still Life No.7", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Nape", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Voltage", image: "https://placehold.co/600x400", route: "/vfx" },
  { title: "Distant Wall", image: "https://placehold.co/600x400", route: "/vfx" },
];

const ANGLE_STEP = 360 / SLIDES.length;

const Landing = () => {
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
  const previewImgRef = useRef(null);
  const titleRef = useRef(null);

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

  useEffect(() => {
    const slider = sliderRef.current;
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    const previewImg = previewImgRef.current;
    const titleEl = titleRef.current;
    const a = anim.current;

    const onWheel = (e) => {
      a.targetRotation -= e.deltaY * 0.2;
    };

    const onMouseMove = (e) => {
      a.targetTiltY = (e.clientX / window.innerWidth - 0.5) * MAX_TILT;
      a.targetTiltX = -(e.clientY / window.innerHeight - 0.5) * MAX_TILT;
    };

    const onMouseLeave = () => {
      a.targetTiltX = 0;
      a.targetTiltY = 0;
    };

    const showActiveSlide = () => {
      const steps = Math.round(-a.currentRotation / ANGLE_STEP);
      const activeIndex = ((steps % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (activeIndex !== a.shownIndex) {
        a.shownIndex = activeIndex;
        previewImg.src = SLIDES[activeIndex].image;
        titleEl.textContent = SLIDES[activeIndex].title;
      }
    };

    const tick = () => {
      a.currentRotation = lerp(a.currentRotation, a.targetRotation, SMOOTHING);
      a.currentTiltX = lerp(a.currentTiltX, a.targetTiltX, SMOOTHING);
      a.currentTiltY = lerp(a.currentTiltY, a.targetTiltY, SMOOTHING);

      orbit.style.transform = `translate(-50%, -50%) rotateY(${a.currentRotation}deg)`;
      stage.style.transform = `rotateX(${a.currentTiltX}deg) rotateY(${a.currentTiltY}deg)`;

      showActiveSlide();
      a.rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("mouseleave", onMouseLeave);
    a.rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(a.rafId);
    };
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      <div className="stage" ref={stageRef}>
        <div className="preview">
          <img className="preview-img" src={SLIDES[0].image} alt={SLIDES[0].title} ref={previewImgRef} />
        </div>

        <div className="orbit" ref={orbitRef}>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              className="panel"
              style={{ transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${ORBIT_RADIUS}px)` }}
              onClick={() => navigate(slide.route)}
            >
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
      </div>

      <span className="titleTag" ref={titleRef}>
        {SLIDES[0].title}
      </span>
    </div>
  );
};

export default Landing;
