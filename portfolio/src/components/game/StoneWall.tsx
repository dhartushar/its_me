"use client";

import { useMemo } from "react";
import { seededRandom } from "@/lib/random";
import { InstancedBlocks, type Block } from "./InstancedBlocks";
import { materials } from "./materials";

export interface WallOpening {
  /** Centre of the opening along the wall, in local units from the wall's start. */
  center: number;
  width: number;
  height: number;
}

interface StoneWallProps {
  length: number;
  height: number;
  thickness: number;
  position: [number, number, number];
  rotationY?: number;
  openings?: WallOpening[];
  seed: number;
}

const ROW_HEIGHT = 0.5;
const GAP = 0.05;
const BRICK_COLORS = ["#86847a", "#8e8c82", "#96948a", "#7f7d73", "#8a8880", "#75736a"];

/**
 * A brick wall. Locally it runs along +X from 0 to `length`, rises along +Y,
 * and its room-facing side is the plane z = 0 (the core sits behind it).
 */
export function StoneWall({
  length,
  height,
  thickness,
  position,
  rotationY = 0,
  openings = [],
  seed,
}: StoneWallProps) {
  const bricks = useMemo(() => buildBricks(length, height, openings, seed), [length, height, openings, seed]);
  const core = useMemo(() => buildCore(length, height, openings), [length, height, openings]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {core.map((segment, index) => (
        <mesh
          key={index}
          position={[segment.x + segment.width / 2, segment.y + segment.height / 2, -thickness / 2]}
          material={materials.mortar}
          receiveShadow
        >
          <boxGeometry args={[segment.width, segment.height, thickness]} />
        </mesh>
      ))}
      <InstancedBlocks blocks={bricks} />
      {/* Dark cap that outlines the cut-away edge like a diorama. */}
      <mesh position={[length / 2, height + 0.06, -thickness / 2 + 0.04]} material={materials.trim}>
        <boxGeometry args={[length + 0.02, 0.12, thickness + 0.1]} />
      </mesh>
    </group>
  );
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function buildCore(length: number, height: number, openings: WallOpening[]): Rect[] {
  if (openings.length === 0) return [{ x: 0, y: 0, width: length, height }];
  const sorted = [...openings].sort((a, b) => a.center - b.center);
  const rects: Rect[] = [];
  let cursor = 0;
  for (const opening of sorted) {
    const start = opening.center - opening.width / 2;
    const end = opening.center + opening.width / 2;
    if (start > cursor) rects.push({ x: cursor, y: 0, width: start - cursor, height });
    rects.push({ x: start, y: opening.height, width: end - start, height: height - opening.height });
    cursor = end;
  }
  if (cursor < length) rects.push({ x: cursor, y: 0, width: length - cursor, height });
  return rects;
}

function buildBricks(length: number, height: number, openings: WallOpening[], seed: number): Block[] {
  const random = seededRandom(seed);
  const blocks: Block[] = [];
  const rows = Math.round(height / ROW_HEIGHT);

  for (let row = 0; row < rows; row++) {
    const y0 = row * ROW_HEIGHT;
    const blockingOpenings = openings.filter((opening) => y0 < opening.height);
    let x = row % 2 === 0 ? 0 : -0.45 - random() * 0.3;

    while (x < length) {
      const brickLength = 0.75 + random() * 0.6;
      let start = Math.max(x, 0);
      let end = Math.min(x + brickLength, length);
      x += brickLength;

      for (const opening of blockingOpenings) {
        const openStart = opening.center - opening.width / 2;
        const openEnd = opening.center + opening.width / 2;
        if (end <= openStart || start >= openEnd) continue;
        // Keep whichever side of the brick lies outside the opening.
        if (start < openStart) end = openStart;
        else if (end > openEnd) start = openEnd;
        else end = start;
      }

      const width = end - start - GAP;
      if (width < 0.18) continue;

      const depth = 0.05 + random() * 0.09;
      const shade = random();
      const color =
        shade > 0.93 ? "#66655d" : (BRICK_COLORS[Math.floor(random() * BRICK_COLORS.length)] ?? "#86847a");
      blocks.push({
        position: [start + GAP / 2 + width / 2, y0 + ROW_HEIGHT / 2, depth / 2 - 0.02],
        size: [width, ROW_HEIGHT - GAP - random() * 0.03, depth + 0.02],
        color,
      });
    }
  }
  return blocks;
}
