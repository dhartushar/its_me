"use client";

import { useGameStore } from "@/store/gameStore";
import { CornerShade } from "./CornerShade";
import { LooseStones, RunePanel } from "./Decor";
import { Interactive } from "./Interactive";
import { ROOM } from "./layout";
import { Lighting } from "./Lighting";
import { MysteryDoor } from "./MysteryDoor";
import { Pedestal } from "./Pedestal";
import { Pillar } from "./Pillar";
import { StoneFloor } from "./StoneFloor";
import { StoneWall, type WallOpening } from "./StoneWall";
import { Torch } from "./Torch";

const { half, wallHeight, wallThickness, floorY, door } = ROOM;
const length = half * 2;

// The back wall starts behind the left wall so the corner is closed.
const BACK_WALL_OPENINGS: WallOpening[] = [
  { center: door.x + half + wallThickness, width: door.width, height: door.height },
];

/** The opening room: an L of brick walls around a flagstone floor. */
export function MainRoom() {
  const openPanel = useGameStore((state) => state.openPanel);

  return (
    <>
      <Lighting />

      <StoneFloor half={half} overhang={wallThickness} seed={7} />
      <StoneWall
        length={length + wallThickness}
        height={wallHeight}
        thickness={wallThickness}
        position={[-half - wallThickness, 0, -half]}
        openings={BACK_WALL_OPENINGS}
        seed={11}
      />
      <StoneWall
        length={length}
        height={wallHeight}
        thickness={wallThickness}
        position={[-half, 0, half]}
        rotationY={Math.PI / 2}
        seed={23}
      />
      <CornerShade />

      <Torch position={[1.2, 3.1, -half]} rotationY={0} phase={0} />
      <Torch position={[-half, 3.1, 2.2]} rotationY={Math.PI / 2} phase={2.7} />
      <RunePanel position={[-half, 2.7, -2.4]} rotationY={Math.PI / 2} />
      <LooseStones />

      <group position={[0, floorY, 0]}>
        <Interactive label="The pedestal" onActivate={() => openPanel("profile")}>
          <Pedestal />
        </Interactive>
        <Interactive label="The ember pillar" position={[-4, 0, 1.6]} onActivate={() => openPanel("about")}>
          <Pillar variant="ember" />
        </Interactive>
        <Interactive label="The stacked pillar" position={[-1.6, 0, -4]} onActivate={() => openPanel("projects")}>
          <Pillar variant="stack" />
        </Interactive>
        <Interactive label="The ring pillar" position={[4.3, 0, -0.9]} onActivate={() => openPanel("skills")}>
          <Pillar variant="ring" />
        </Interactive>
      </group>

      <MysteryDoor
        position={[door.x, 0, -half]}
        width={door.width}
        height={door.height}
        wallThickness={wallThickness}
      />
    </>
  );
}
