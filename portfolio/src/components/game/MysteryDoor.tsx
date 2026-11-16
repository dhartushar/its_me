"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color, MathUtils, type Group, type MeshBasicMaterial, type PointLight } from "three";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useGameStore } from "@/store/gameStore";
import { Interactive } from "./Interactive";
import { materials } from "./materials";

interface MysteryDoorProps {
  /** Centre of the doorway at floor level, on the wall's room-facing plane. */
  position: [number, number, number];
  width: number;
  height: number;
  wallThickness: number;
}

const OPEN_ANGLE = 1.45;
const PANEL_DELAY_MS = 850;
const GLOW_OFF = new Color("#0b0a09");
const GLOW_ON = new Color("#ffcf8f");

/** Box walls (x, y, z, sizeX, sizeY, sizeZ) enclosing the passage on every side but the front. */
function passageWalls(width: number, height: number, depth: number): [number, number, number, number, number, number][] {
  const t = 0.1;
  const inner = width + 0.2;
  return [
    [-(inner + t) / 2, height / 2, 0, t, height, depth],
    [(inner + t) / 2, height / 2, 0, t, height, depth],
    [0, height + t / 2, 0, inner + 2 * t, t, depth],
    [0, -t / 2 + 0.02, 0, inner + 2 * t, t, depth],
    [0, height / 2, -depth / 2 + t / 2, inner + 2 * t, height + t, t],
  ];
}

/** A wooden door set in a stone frame, with a lit passage behind it. */
export function MysteryDoor({ position, width, height, wallThickness }: MysteryDoorProps) {
  const leaf = useRef<Group>(null);
  const light = useRef<PointLight>(null);
  const glow = useRef<MeshBasicMaterial>(null);
  const openness = useRef(0);
  const timer = useRef<number | null>(null);

  const doorOpen = useGameStore((state) => state.doorOpen);
  const openDoor = useGameStore((state) => state.openDoor);
  const openPanel = useGameStore((state) => state.openPanel);
  const reducedMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const activate = () => {
    if (doorOpen || reducedMotion) {
      openDoor();
      openPanel("door");
      return;
    }
    openDoor();
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => openPanel("door"), PANEL_DELAY_MS);
  };

  useFrame((_, delta) => {
    const target = doorOpen ? 1 : 0;
    if (Math.abs(openness.current - target) < 0.001) return;
    openness.current = reducedMotion ? target : MathUtils.damp(openness.current, target, 3.2, delta);
    const amount = openness.current;
    if (leaf.current) leaf.current.rotation.y = amount * OPEN_ANGLE;
    if (light.current) light.current.intensity = amount * 9;
    if (glow.current) glow.current.color.lerpColors(GLOW_OFF, GLOW_ON, amount);
  });

  const depth = 2;
  const frameDepth = wallThickness + 0.18;
  const leafWidth = width - 0.04;
  const leafHeight = height - 0.03;
  const leafThickness = 0.1;

  return (
    <group position={position}>
      {/* Passage behind the doorway, only visible through the opening. */}
      <group position={[0, 0, -wallThickness - depth / 2]}>
        {passageWalls(width, height, depth).map(([x, y, z, sx, sy, sz]) => (
          <mesh key={`${x}:${y}:${z}`} position={[x, y, z]} material={materials.trim} receiveShadow>
            <boxGeometry args={[sx, sy, sz]} />
          </mesh>
        ))}
        <mesh position={[0, height / 2, -depth / 2 + 0.11]}>
          <planeGeometry args={[width + 0.2, height]} />
          <meshBasicMaterial ref={glow} color={GLOW_OFF} toneMapped={false} />
        </mesh>
        <pointLight ref={light} position={[0, height * 0.55, 0.2]} color="#ffb067" intensity={0} distance={6} decay={2} />
      </group>

      <Interactive label="The sealed door" onActivate={activate}>
        {/* Stone frame. */}
        <group position={[0, 0, -wallThickness / 2 + 0.09]}>
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[side * (width / 2 + 0.17), (height + 0.3) / 2, 0]}
              material={materials.pillar}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.34, height + 0.3, frameDepth]} />
            </mesh>
          ))}
          <mesh position={[0, height + 0.2, 0]} material={materials.pillarDark} castShadow receiveShadow>
            <boxGeometry args={[width + 0.75, 0.4, frameDepth + 0.04]} />
          </mesh>
          <mesh position={[0, height + 0.22, frameDepth / 2 + 0.03]} material={materials.rune}>
            <boxGeometry args={[0.22, 0.22, 0.04]} />
          </mesh>
        </group>

        {/* Door leaf, hinged on its left edge. */}
        <group ref={leaf} position={[-width / 2 + 0.02, 0.01, -wallThickness / 2]}>
          <group position={[leafWidth / 2, leafHeight / 2, 0]}>
            <mesh material={materials.wood} castShadow receiveShadow>
              <boxGeometry args={[leafWidth, leafHeight, leafThickness]} />
            </mesh>
            {[-0.25, 0.25].map((x) => (
              <mesh key={x} position={[x * leafWidth, 0, leafThickness / 2 + 0.005]} material={materials.woodDark}>
                <boxGeometry args={[0.04, leafHeight - 0.1, 0.02]} />
              </mesh>
            ))}
            {[-0.32, 0.3].map((y) => (
              <mesh key={y} position={[0, y * leafHeight, leafThickness / 2 + 0.02]} material={materials.iron} castShadow>
                <boxGeometry args={[leafWidth - 0.06, 0.1, 0.03]} />
              </mesh>
            ))}
            <mesh position={[leafWidth * 0.32, -0.05, leafThickness / 2 + 0.06]} material={materials.iron}>
              <torusGeometry args={[0.09, 0.022, 6, 12]} />
            </mesh>
          </group>
        </group>
      </Interactive>
    </group>
  );
}
