import { VIDEOS } from "@lib/paths";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FADE_DURARTION = 300;

const Screen = ({ activeVideoKey }) => {
  const videoRef = useRef(null);
  const materialRef = useRef(null);
  const targetColor = useRef(new THREE.Color(0, 0, 0));
  const fadeTimerRef = useRef();
  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const texture = new THREE.VideoTexture(video);
    videoRef.current = video;
    setVideoTexture(texture);

    return () => video.pause();
  }, []);

  useEffect(() => {
    clearTimeout(fadeTimerRef.current);
    targetColor.current.set(0, 0, 0);

    fadeTimerRef.current = setTimeout(() => {
      if (!videoRef.current) return;

      if (activeVideoKey) {
        videoRef.current.src = VIDEOS[activeVideoKey];
        videoRef.current.play();
        targetColor.current.set(1, 1, 1);
      } else {
        videoRef.current.pause();
      }
    }, FADE_DURARTION);

    return () => clearTimeout(fadeTimerRef.current);
  }, [activeVideoKey]);

  useFrame(() => {
    if (!materialRef.current) return;
    materialRef.current.color.lerp(targetColor.current, 0.1);
  });

  return (
    <mesh position={[0, 1, -3]}>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial ref={materialRef} color={[0, 0, 0]} map={videoTexture} toneMapped={false} />
    </mesh>
  );
};

export default Screen;
