"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { materials } from "./materials";

const EIGHTH = Math.PI / 8;

/** Stepped octagonal plinth with a column and a slowly turning crystal. */
export function Pedestal() {
  const crystal = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }, delta) => {
    const mesh = crystal.current;
    if (!mesh || reducedMotion) return;
    mesh.rotation.y += delta * 0.6;
    mesh.position.y = 4.05 + Math.sin(clock.elapsedTime * 1.4) * 0.08;
  });

  const steps: [number, number, number, number][] = [
    // top radius, bottom radius, centre height, material index
    [2.05, 2.15, 0.14, 1],
    [1.62, 1.72, 0.42, 0],
    [1.2, 1.3, 0.7, 1],
  ];

  return (
    <group>
      {steps.map(([top, bottom, y, tone]) => (
        <mesh
          key={y}
          position={[0, y, 0]}
          rotation={[0, EIGHTH, 0]}
          material={tone === 0 ? materials.pedestal : materials.pedestalDark}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[top, bottom, 0.28, 8]} />
        </mesh>
      ))}
      <mesh position={[0, 0.99, 0]} rotation={[0, EIGHTH, 0]} material={materials.pedestal} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.72, 0.3, 8]} />
      </mesh>
      <mesh position={[0, 2.14, 0]} rotation={[0, EIGHTH, 0]} material={materials.pedestal} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.52, 2.0, 8]} />
      </mesh>
      {/* Carved band around the shaft. */}
      <mesh position={[0, 2.55, 0]} rotation={[0, EIGHTH, 0]} material={materials.pedestalDark} castShadow>
        <cylinderGeometry args={[0.45, 0.46, 0.12, 8]} />
      </mesh>
      <mesh position={[0, 3.29, 0]} rotation={[0, EIGHTH, 0]} material={materials.pedestal} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.52, 0.3, 8]} />
      </mesh>
      <mesh position={[0, 3.5, 0]} rotation={[0, EIGHTH, 0]} material={materials.pedestalDark} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.7, 0.12, 8]} />
      </mesh>
      <mesh ref={crystal} position={[0, 4.05, 0]} scale={[1, 1.5, 1]} material={materials.crystal} castShadow>
        <octahedronGeometry args={[0.32, 0]} />
      </mesh>
      <pointLight position={[0, 4.1, 0]} color="#62d2f2" intensity={5} distance={6} decay={2} />
    </group>
  );
}
