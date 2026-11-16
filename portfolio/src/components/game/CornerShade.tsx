"use client";

import { useEffect, useMemo } from "react";
import { CanvasTexture, DoubleSide } from "three";
import { ROOM } from "./layout";

/**
 * Cheap stand-in for ambient occlusion: soft dark gradients where the walls
 * meet the floor and each other. The dark end of each gradient is the
 * plane's local +Y edge.
 */
export function CornerShade() {
  const alpha = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (context) {
      // alphaMap reads brightness: lighter means more opaque.
      const gradient = context.createLinearGradient(0, 0, 0, 128);
      gradient.addColorStop(0, "rgb(165,165,165)");
      gradient.addColorStop(0.4, "rgb(55,55,55)");
      gradient.addColorStop(1, "rgb(0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 4, 128);
    }
    return new CanvasTexture(canvas);
  }, []);

  useEffect(() => () => alpha.dispose(), [alpha]);

  const { half, floorY, wallHeight } = ROOM;
  const length = half * 2;
  const floorBand = 1.8;
  const cornerBand = 1.4;
  const lift = floorY + 0.05;

  const shade = (
    <meshBasicMaterial color="#000000" alphaMap={alpha} transparent depthWrite={false} side={DoubleSide} />
  );

  return (
    <group>
      {/* Floor along the back wall. */}
      <mesh position={[0, lift, -half + floorBand / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, floorBand]} />
        {shade}
      </mesh>
      {/* Floor along the left wall. */}
      <mesh position={[-half + floorBand / 2, lift, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[length, floorBand]} />
        {shade}
      </mesh>
      {/* Back wall, next to the corner. */}
      <mesh position={[-half + cornerBand / 2, wallHeight / 2, -half + 0.16]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[wallHeight, cornerBand]} />
        {shade}
      </mesh>
      {/* Left wall, next to the corner. */}
      <mesh
        position={[-half + 0.16, wallHeight / 2, -half + cornerBand / 2]}
        rotation={[0, Math.PI / 2, -Math.PI / 2]}
      >
        <planeGeometry args={[wallHeight, cornerBand]} />
        {shade}
      </mesh>
    </group>
  );
}
