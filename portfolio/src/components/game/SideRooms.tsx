"use client";

import { RunePanel } from "./Decor";
import { ROOM } from "./layout";
import { Pedestal } from "./Pedestal";
import { Pillar } from "./Pillar";
import { ReturnPavement } from "./ReturnPavement";
import { StoneRoom } from "./StoneRoom";

const { half, floorY, door } = ROOM;

export function FirstRoom() {
  return (
    <StoneRoom>
      <RunePanel position={[-2.4, 2.7, -half]} rotationY={0} />
      <group position={[0, floorY, 0]}>
        <Pedestal />
      </group>
      <ReturnPavement edge={[door.backX, 0, half + 0.08]} />
    </StoneRoom>
  );
}

export function SecondRoom() {
  return (
    <StoneRoom>
      <RunePanel position={[-half, 2.7, -2.4]} rotationY={Math.PI / 2} />
      <group position={[-2.8, floorY, -2.8]}>
        <Pillar variant="ring" />
      </group>
      <ReturnPavement edge={[half + 0.08, 0, door.leftZ]} rotationY={Math.PI / 2} />
    </StoneRoom>
  );
}
