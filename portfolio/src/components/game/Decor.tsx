"use client";

import { materials } from "./materials";

/**
 * A carved panel on the left wall. Local +Z points out of the wall,
 * so the same component can be mounted on any wall.
 */
export function RunePanel({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, 0.12]} material={materials.pillarDark} receiveShadow>
        <boxGeometry args={[1.3, 1.3, 0.1]} />
      </mesh>
      <mesh position={[0, 0, 0.18]} material={materials.glyph}>
        <boxGeometry args={[1.08, 1.08, 0.04]} />
      </mesh>
      <mesh position={[0, 0, 0.21]} material={materials.pillar}>
        <torusGeometry args={[0.34, 0.045, 4, 16]} />
      </mesh>
      <mesh position={[0, 0, 0.21]} material={materials.pillar}>
        <boxGeometry args={[0.07, 0.9, 0.03]} />
      </mesh>
      <mesh position={[0, 0.02, 0.22]} rotation={[0, 0, Math.PI / 4]} material={materials.rune}>
        <boxGeometry args={[0.16, 0.16, 0.03]} />
      </mesh>
    </group>
  );
}

const STONES: { position: [number, number, number]; size: [number, number, number]; rotation: number }[] = [
  { position: [-5.2, 0.28, 4.9], size: [0.7, 0.32, 0.5], rotation: 0.3 },
  { position: [-5.35, 0.62, 4.75], size: [0.42, 0.36, 0.38], rotation: -0.2 },
  { position: [-4.5, 0.24, 5.3], size: [0.36, 0.24, 0.32], rotation: 0.8 },
  { position: [5.3, 0.27, 2.6], size: [0.62, 0.3, 0.55], rotation: -0.4 },
  { position: [4.8, 0.22, 3.1], size: [0.3, 0.2, 0.28], rotation: 0.5 },
];

/** A few loose blocks so the room does not look freshly built. */
export function LooseStones() {
  return (
    <group>
      {STONES.map((stone) => (
        <mesh
          key={stone.position.join(":")}
          position={stone.position}
          rotation={[0, stone.rotation, 0]}
          material={materials.pillar}
          castShadow
          receiveShadow
        >
          <boxGeometry args={stone.size} />
        </mesh>
      ))}
    </group>
  );
}
