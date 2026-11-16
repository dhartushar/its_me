"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * Dim cool fill plus one warm key light from the upper right that casts
 * the room's shadows. Local glows (torches, crystal, passage) live with
 * their objects.
 */
export function Lighting() {
  const isMobile = useIsMobile();
  const mapSize = isMobile ? 1024 : 2048;

  return (
    <>
      <hemisphereLight args={["#aab4cc", "#1f1d1a", 0.55]} />
      <ambientLight intensity={0.08} color="#c9d2e6" />
      <directionalLight
        position={[9, 13, 3.5]}
        intensity={1.9}
        color="#ffe2bf"
        castShadow
        shadow-mapSize-width={mapSize}
        shadow-mapSize-height={mapSize}
        shadow-camera-left={-11}
        shadow-camera-right={11}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />
    </>
  );
}
