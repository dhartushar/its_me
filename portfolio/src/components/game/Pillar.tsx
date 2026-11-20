"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group, type Mesh } from "three";
import { PILLARS, pillarHeading, type PillarVariant } from "@/data/puzzles";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useGameStore } from "@/store/gameStore";
import { Interactive } from "./Interactive";
import { materials } from "./materials";

/** Short square pillar; the variant decides what sits on top of it. */
export function Pillar({ variant, turns }: { variant: PillarVariant; turns?: number }) {
  const rotating = useRef<Group>(null);
  const reducedMotion = useReducedMotion();
  const angle = useRef(pillarHeading(turns ?? 0));
  const puzzle = PILLARS[variant];

  useFrame((_, delta) => {
    if (!rotating.current || turns === undefined) return;
    const target = pillarHeading(turns);
    angle.current = reducedMotion ? target : MathUtils.damp(angle.current, target, 12, delta);
    rotating.current.rotation.y = angle.current;
  });

  return (
    <group ref={rotating}>
      <mesh position={[0, 0.13, 0]} material={materials.pillarDark} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.26, 1.05]} />
      </mesh>
      <mesh position={[0, 0.83, 0]} material={materials.pillar} castShadow receiveShadow>
        <boxGeometry args={[0.72, 1.14, 0.72]} />
      </mesh>
      {turns === undefined ? (
        <mesh position={[0, 0.9, 0]} material={materials.pillarDark} castShadow>
          <boxGeometry args={[0.76, 0.1, 0.76]} />
        </mesh>
      ) : Array.from({ length: puzzle.bands }, (_, band) => (
        <mesh key={band} position={[0, 0.83 + (band - (puzzle.bands - 1) / 2) * 0.2, 0]} material={materials.pillarDark} castShadow>
          <boxGeometry args={[0.8, 0.095, 0.8]} />
        </mesh>
      ))}
      <mesh position={[0, 1.5, 0]} material={materials.pillarDark} castShadow receiveShadow>
        <boxGeometry args={[0.92, 0.2, 0.92]} />
      </mesh>
      {turns !== undefined && <SculptedFace />}
      <group position={[0, turns === undefined ? 1.6 : 2.21, 0]} scale={turns === undefined ? 1 : 0.72}>
        {variant === "ember" && <EmberTop puzzle={turns !== undefined} />}
        {variant === "stack" && <StackTop puzzle={turns !== undefined} />}
        {variant === "ring" && <RingTop puzzle={turns !== undefined} />}
      </group>
    </group>
  );
}

export function PuzzlePillar({ variant, position }: { variant: PillarVariant; position: [number, number, number] }) {
  const turns = useGameStore((state) => state.pillarTurns[variant]);
  const turnPillar = useGameStore((state) => state.turnPillar);

  return (
    <Interactive label="Pillar" position={position} onActivate={() => turnPillar(variant)}>
      <Pillar variant={variant} turns={turns} />
    </Interactive>
  );
}

/** Block-carved face with a pronounced nose and brow on its +Z side. */
function SculptedFace() {
  return (
    <group position={[0, 1.9, 0]}>
      <mesh material={materials.pedestal} castShadow receiveShadow>
        <boxGeometry args={[0.64, 0.57, 0.56]} />
      </mesh>
      <mesh position={[0, -0.18, 0.29]} material={materials.pillar} castShadow>
        <boxGeometry args={[0.44, 0.2, 0.13]} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.165, 0, 0.282]}>
          <mesh position={[0, 0.075, 0.01]} material={materials.pillarDark}>
            <boxGeometry args={[0.15, 0.068, 0.028]} />
          </mesh>
          <mesh position={[0, 0.135, 0.035]} rotation={[0, 0, side * 0.12]} material={materials.pedestalDark}>
            <boxGeometry args={[0.22, 0.08, 0.11]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.015, 0.35]} rotation={[0.18, 0, 0]} material={materials.pedestal} castShadow>
        <boxGeometry args={[0.13, 0.24, 0.19]} />
      </mesh>
      <mesh position={[0, -0.174, 0.36]} material={materials.pillarDark}>
        <boxGeometry args={[0.23, 0.032, 0.026]} />
      </mesh>
    </group>
  );
}

function EmberTop({ puzzle }: { puzzle: boolean }) {
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
      <mesh ref={ember} position={[0, 0.36, 0]} material={puzzle ? undefined : materials.ember}>
        <dodecahedronGeometry args={[0.2, 0]} />
        {puzzle && <meshStandardMaterial color={PILLARS.ember.color} emissive={PILLARS.ember.color} emissiveIntensity={0.8} />}
      </mesh>
    </group>
  );
}

function StackTop({ puzzle }: { puzzle: boolean }) {
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
          material={puzzle && index === sizes.length - 1 ? undefined : index === 1 ? materials.pillarDark : materials.pedestal}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[size, size, size]} />
          {puzzle && index === sizes.length - 1 && <meshStandardMaterial color={PILLARS.stack.color} roughness={0.78} />}
        </mesh>
      ))}
    </group>
  );
}

function RingTop({ puzzle }: { puzzle: boolean }) {
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
        <mesh rotation={[0.35, 0, 0]} material={puzzle ? undefined : materials.pedestal} castShadow>
          <torusGeometry args={[0.3, 0.06, 6, 16]} />
          {puzzle && <meshStandardMaterial color={PILLARS.ring.color} roughness={0.72} />}
        </mesh>
        <mesh material={materials.rune}>
          <icosahedronGeometry args={[0.09, 0]} />
        </mesh>
      </group>
    </group>
  );
}
