import { VIDEOS } from "@lib/paths";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const FADE_DURARTION = 300;
const REFLECTION_OPACITY = 0.25;
const SCREEN_SIZE = [6, 3];

const Screen = ({ activeVideoKey }) => {
  const videoRef = useRef(null);
  const materialRef = useRef(null);
  const targetColor = useRef(new THREE.Color(0, 0, 0));
  const fadeTimerRef = useRef();
  const reflectionMaterialRef = useRef();
  const [videoTexture, setVideoTexture] = useState(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("error", () => {
      console.error("Video laadfout:", video.error?.message, video.src);
    });

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;

    videoRef.current = video;
    setVideoTexture(texture);

    return () => video.pause();
  }, []);

  useEffect(() => {
    clearTimeout(fadeTimerRef.current);
    targetColor.current.set(0, 0, 0);

    const video = videoRef.current;
    let handleReady;

    fadeTimerRef.current = setTimeout(() => {
      if (!video) return;

      setIsVideoReady(false);

      if (activeVideoKey) {
        handleReady = () => {
          setIsVideoReady(true);
        };
        video.addEventListener("loadeddata", handleReady, { once: true });

        video.src = VIDEOS[activeVideoKey];
        video.play().catch((error) => {
          if (error.name !== "AbortError") console.error("Play() mislukt:", error);
        });
      } else {
        video.pause();
      }
    }, FADE_DURARTION);

    return () => {
      clearTimeout(fadeTimerRef.current);
      if (video && handleReady) video.removeEventListener("loadeddata", handleReady);
    };
  }, [activeVideoKey]);

  const reflectionTexture = useMemo(() => {
    if (!videoTexture) return null;

    const clone = videoTexture.clone();
    clone.repeat.y = -1;
    clone.offset.y = 1;

    return clone;
  }, [videoTexture]);

  // We zetten targetColor pas hier (na de React-commit, dus wanneer `map`
  // écht al gebonden is) en niet meteen in handleReady. Anders begint de
  // useFrame-lus de kleur al naar wit te lerpen terwijl `map` via JSX nog
  // steeds null is (React state-update is async), wat een witte flits geeft.
  useEffect(() => {
    if (isVideoReady) {
      targetColor.current.set(1, 1, 1);
      setHasLoadedOnce(true);
    }
  }, [isVideoReady]);

  // Shader hoeft maar één keer opnieuw te compileren: de eerste keer dat
  // `map` van null naar een echte texture gaat. Daarna blijft `map` altijd
  // gebonden (zie hasLoadedOnce hierboven), dus dit effect vuurt nooit meer.
  useEffect(() => {
    if (!hasLoadedOnce) return;
    if (materialRef.current) materialRef.current.needsUpdate = true;
    if (reflectionMaterialRef.current) reflectionMaterialRef.current.needsUpdate = true;
  }, [hasLoadedOnce]);

  useFrame(() => {
    if (materialRef.current) materialRef.current.color.lerp(targetColor.current, 0.1);
    if (reflectionMaterialRef.current) reflectionMaterialRef.current.color.lerp(targetColor.current, 0.1);
  });

  return (
    <group>
      <mesh position={[0, 1.5, -3]}>
        <planeGeometry args={SCREEN_SIZE} />
        <meshBasicMaterial
          ref={materialRef}
          color={[0, 0, 0]}
          map={hasLoadedOnce ? videoTexture : null}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry args={SCREEN_SIZE} />
        <meshBasicMaterial
          ref={reflectionMaterialRef}
          map={hasLoadedOnce ? reflectionTexture : null}
          color={[0, 0, 0]}
          transparent
          opacity={REFLECTION_OPACITY}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default Screen;
