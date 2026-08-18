import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import FloppyDisk from "@functional/FloppyDisk/FloppyDisk";
import { STICKERS } from "@lib/paths";

const lerp = (from, to, amount) => from + (to - from) * amount;

function CarouselDriver({ slides, angleStep, animRef, ringRef, stageRef, titleRef }) {
  useFrame(() => {
    const a = animRef.current;
    a.currentRotation = lerp(a.currentRotation, a.targetRotation, a.smoothingRotation);
    a.currentTiltX = lerp(a.currentTiltX, a.targetTiltX, a.smoothingTilt);
    a.currentTiltY = lerp(a.currentTiltY, a.targetTiltY, a.smoothingTilt);

    if (ringRef.current) ringRef.current.rotation.y = a.currentRotation;
    if (stageRef.current) {
      stageRef.current.rotation.x = a.currentTiltX;
      stageRef.current.rotation.y = a.currentTiltY;
    }

    const steps = Math.round(-a.currentRotation / angleStep);
    const activeIndex = ((steps % slides.length) + slides.length) % slides.length;
    if (activeIndex !== a.shownIndex) {
      a.shownIndex = activeIndex;
      if (titleRef.current) titleRef.current.textContent = slides[activeIndex].title;
    }
  });

  return null;
}

function CarouselScene({ slides, angleStep, radius, diskScale, animRef, titleRef, onSelect }) {
  const stageRef = useRef(null);
  const ringRef = useRef(null);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={32} onUpdate={(self) => self.lookAt(0, -1.8, 0)} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />

      <group ref={stageRef}>
        <group ref={ringRef}>
          {slides.map((slide, i) => {
            const angle = i * angleStep;
            return (
              <FloppyDisk
                key={`${slide.title}-${i}`}
                texturePath={STICKERS[slide.key]}
                position={[Math.sin(angle) * radius, -2.5, Math.cos(angle) * radius]}
                rotationY={angle + Math.PI}
                scale={diskScale}
                floatOffset={i * 0.7}
                onSelect={() => onSelect(slide.route)}
              />
            );
          })}
        </group>
      </group>

      <CarouselDriver
        slides={slides}
        angleStep={angleStep}
        animRef={animRef}
        ringRef={ringRef}
        stageRef={stageRef}
        titleRef={titleRef}
      />
    </>
  );
}

export default CarouselScene;
