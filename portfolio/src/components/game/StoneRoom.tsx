"use client";

import type { ReactNode } from "react";
import { CornerShade } from "./CornerShade";
import { LooseStones } from "./Decor";
import { ROOM } from "./layout";
import { Lighting } from "./Lighting";
import { StoneFloor } from "./StoneFloor";
import { StoneWall, type WallOpening } from "./StoneWall";
import { Torch } from "./Torch";

const { half, wallHeight, wallThickness } = ROOM;
const length = half * 2;
const SOLID_WALL: WallOpening[] = [];

interface StoneRoomProps {
  backOpenings?: WallOpening[];
  leftOpenings?: WallOpening[];
  hideNoteUnderStones?: boolean;
  torches?: ReactNode;
  children: ReactNode;
}

export function StoneRoom({ backOpenings = SOLID_WALL, leftOpenings = SOLID_WALL, hideNoteUnderStones, torches, children }: StoneRoomProps) {
  return (
    <>
      <Lighting />
      <StoneFloor half={half} overhang={wallThickness} seed={7} />
      {/* Extend the back wall behind the left wall to close the corner. */}
      <StoneWall
        length={length + wallThickness}
        height={wallHeight}
        thickness={wallThickness}
        position={[-half - wallThickness, 0, -half]}
        openings={backOpenings}
        seed={11}
      />
      <StoneWall
        length={length}
        height={wallHeight}
        thickness={wallThickness}
        position={[-half, 0, half]}
        rotationY={Math.PI / 2}
        openings={leftOpenings}
        seed={23}
      />
      <CornerShade />
      {torches ?? (
        <>
          <Torch position={[1.2, 3.1, -half]} rotationY={0} phase={0} />
          <Torch position={[-half, 3.1, 2.2]} rotationY={Math.PI / 2} phase={2.7} />
        </>
      )}
      <LooseStones hideNote={hideNoteUnderStones} />
      {children}
    </>
  );
}
