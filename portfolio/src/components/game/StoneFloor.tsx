"use client";

import { useMemo } from "react";
import { seededRandom } from "@/lib/random";
import { InstancedBlocks, type Block } from "./InstancedBlocks";
import { materials } from "./materials";

interface StoneFloorProps {
  /** The floor covers -half..half on X and Z. */
  half: number;
  /** Extra slab under the walls, so the base reaches their outer faces. */
  overhang: number;
  seed: number;
}

const GAP = 0.07;
const TILE_COLORS = ["#6b6962", "#726f68", "#605e58", "#78756d", "#67655e", "#6f6c65"];

/** Irregular flagstones on a dark base slab. */
export function StoneFloor({ half, overhang, seed }: StoneFloorProps) {
  const tiles = useMemo(() => buildTiles(half * 2, seed), [half, seed]);
  const slabSize = half * 2 + overhang;
  const slabCenter = -overhang / 2;

  return (
    <group>
      <mesh position={[slabCenter, -0.3, slabCenter]} material={materials.mortar} receiveShadow>
        <boxGeometry args={[slabSize, 0.6, slabSize]} />
      </mesh>
      {/* Thin dark rim along the two open edges. */}
      <mesh position={[slabCenter, -0.3, half + 0.04]} material={materials.trim}>
        <boxGeometry args={[slabSize + 0.02, 0.64, 0.08]} />
      </mesh>
      <mesh position={[half + 0.04, -0.3, slabCenter]} material={materials.trim}>
        <boxGeometry args={[0.08, 0.64, slabSize + 0.1]} />
      </mesh>
      <group position={[-half, 0, -half]}>
        <InstancedBlocks blocks={tiles} />
      </group>
    </group>
  );
}

function buildTiles(size: number, seed: number): Block[] {
  const random = seededRandom(seed);
  const tiles: Block[] = [];
  let z = 0;
  while (z < size - 0.2) {
    const rowDepth = Math.min(0.95 + random() * 0.6, size - z);
    let x = -random() * 0.8;
    while (x < size) {
      const tileLength = 0.9 + random() * 1.2;
      const start = Math.max(x, 0);
      const end = Math.min(x + tileLength, size);
      x += tileLength;
      const width = end - start - GAP;
      if (width < 0.2) continue;
      const height = 0.1 + random() * 0.05;
      tiles.push({
        position: [start + GAP / 2 + width / 2, height / 2, z + GAP / 2 + (rowDepth - GAP) / 2],
        size: [width, height, rowDepth - GAP],
        color: TILE_COLORS[Math.floor(random() * TILE_COLORS.length)] ?? "#6b6962",
      });
    }
    z += rowDepth;
  }
  return tiles;
}
