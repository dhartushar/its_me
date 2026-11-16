"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { materials } from "./materials";

export type PillarVariant = "ember" | "stack" | "ring";

const TOP = 1.7;

/** Short square pillar; the variant decides what sits on top of it. */
export function Pillar({ variant }: { variant: PillarVariant }) {
  return (
    <group>
      <mesh position={[0, 0.13, 0]} material={materials.pillarDark} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.26, 1.05]} />
      </mesh>
      <mesh position={[0, 0.83, 0]} material={materials.pillar} castShadow receiveShadow>
        <boxGeometry args={[0.72, 1.14, 0.72]} />
      </mesh>
      <mesh position={[0, 0.9, 0]} material={materials.pillarDark} castShadow>
        <boxGeometry args={[0.76, 0.1, 0.76]} />
      </mesh>
      <mesh position={[0, 1.5, 0]} material={materials.pillarDark} castShadow receiveShadow>
        <boxGeometry args={[0.92, 0.2, 0.92]} />
      </mesh>
      <group position={[0, TOP - 0.1, 0]}>
        {variant === "ember" && <EmberTop />}
        {variant === "stack" && <StackTop />}
        {variant === "ring" && <RingTop />}
      </group>
    </group>
  );
}

function EmberTop() {
  const ember = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    const mesh = ember.current;
    if (!mesh || reducedMotion) return;
    const t = clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 7.3) * 0.05 + Math.sin(t * 13.1) * 0.03;
    mesh.scale.setScalar(pulse);
    mesh.rotation.y = t * 0.4;
  });

  return (
    <group>
      <mesh position={[0, 0.18, 0]} rotation={[0, Math.PI / 8, 0]} material={materials.iron} castShadow>
        <cylinderGeometry args={[0.34, 0.2, 0.26, 8]} />
      </mesh>
      <mesh ref={ember} position={[0, 0.36, 0]} material={materials.ember}>
        <dodecahedronGeometry args={[0.2, 0]} />
      </mesh>
    </group>
  );
}

function StackTop() {
  const sizes: [number, number, number][] = [
    // size, y, rotation
    [0.44, 0.22, 0],
    [0.36, 0.62, 0.45],
    [0.28, 0.94, 0.9],
  ];
  return (
    <group>
      {sizes.map(([size, y, rotation], index) => (
        <mesh
          key={y}
          position={[0, y, 0]}
          rotation={[0, rotation, 0]}
          material={index === 1 ? materials.pillarDark : materials.pedestal}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[size, size, size]} />
        </mesh>
      ))}
    </group>
  );
}

function RingTop() {
  const ring = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }, delta) => {
    const group = ring.current;
    if (!group || reducedMotion) return;
    group.rotation.y += delta * 0.8;
    group.position.y = 0.6 + Math.sin(clock.elapsedTime * 1.7) * 0.06;
  });

  return (
    <group>
      <mesh position={[0, 0.08, 0]} material={materials.pedestal} castShadow>
        <cylinderGeometry args={[0.2, 0.28, 0.16, 6]} />
      </mesh>
      <group ref={ring} position={[0, 0.6, 0]}>
        <mesh rotation={[0.35, 0, 0]} material={materials.pedestal} castShadow>
          <torusGeometry args={[0.3, 0.06, 6, 16]} />
        </mesh>
        <mesh material={materials.rune}>
          <icosahedronGeometry args={[0.09, 0]} />
        </mesh>
      </group>
    </group>
  );
}
