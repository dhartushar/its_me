"use client";

import { useGameStore } from "@/store/gameStore";
import { RunePanel } from "./Decor";
import { Interactive } from "./Interactive";
import { ROOM } from "./layout";
import { MysteryDoor } from "./MysteryDoor";
import { Pedestal } from "./Pedestal";
import { PuzzlePillar } from "./Pillar";
import { StoneRoom } from "./StoneRoom";
import type { WallOpening } from "./StoneWall";
import { PuzzleTorch } from "./Torch";
import { WallContacts } from "./WallContacts";
import { WallLettering } from "./WallLettering";

const { half, wallThickness, floorY, door } = ROOM;
const leftWallFace = -half + 0.16;
// Overlap the frame with the masonry so the jamb and lintel faces don't share a plane.
const FRAME_OVERLAP = 0.04;
const roughOpening = { width: door.width + FRAME_OVERLAP * 2, height: door.height + FRAME_OVERLAP };

// The back wall starts behind the left wall so the corner is closed.
const BACK_WALL_OPENINGS: WallOpening[] = [
  { center: door.backX + half + wallThickness, ...roughOpening },
];

const LEFT_WALL_OPENINGS: WallOpening[] = [
  { center: half - door.leftZ, ...roughOpening },
];

/** The opening room: an L of brick walls around a flagstone floor. */
export function MainRoom() {
  const openPanel = useGameStore((state) => state.openPanel);

  return (
    <StoneRoom
      backOpenings={BACK_WALL_OPENINGS}
      leftOpenings={LEFT_WALL_OPENINGS}
      hideNoteUnderStones
      torches={(
        <>
          <PuzzleTorch variant="stack" position={[-half, 3.1, 2.2]} rotationY={Math.PI / 2} phase={0} />
          <PuzzleTorch variant="ember" position={[-half, 3.45, -4.3]} rotationY={Math.PI / 2} phase={1.4} />
          <PuzzleTorch variant="ring" position={[1.2, 3.1, -half]} rotationY={0} phase={2.7} />
        </>
      )}
    >
      <WallLettering text="Tushar Dhar" position={[leftWallFace, 4.4, 0]} rotationY={Math.PI / 2} />
      <WallContacts position={[leftWallFace, 3.42, 0]} />
      <WallLettering text="AI Engineer" position={[1.3, 4.4, -half + 0.16]} />
      <RunePanel position={[-2.4, 2.7, -half]} rotationY={0} />

      <group position={[0, floorY, 0]}>
        <Interactive label="The pedestal" onActivate={() => openPanel("profile")}>
          <Pedestal />
        </Interactive>
        <PuzzlePillar variant="ember" position={[-4, 0, 1.6]} />
        <PuzzlePillar variant="stack" position={[-1.6, 0, -4]} />
        <PuzzlePillar variant="ring" position={[4.3, 0, -0.9]} />
      </group>

      <MysteryDoor
        position={[door.backX, 0, -half]}
        width={door.width}
        height={door.height}
        wallThickness={wallThickness}
        destination="room-1"
      />
      <MysteryDoor
        position={[-half, 0, door.leftZ]}
        rotationY={Math.PI / 2}
        width={door.width}
        height={door.height}
        wallThickness={wallThickness}
        destination="room-2"
      />
    </StoneRoom>
  );
}
