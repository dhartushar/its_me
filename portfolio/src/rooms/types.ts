import type { ComponentType } from "react";

export const DEFAULT_ROOM_ID = "main";
export type RoomId = typeof DEFAULT_ROOM_ID | "room-1" | "room-2";
export const ROOM_NAMES: Record<RoomId, string> = {
  main: "The Entry Hall",
  "room-1": "Bedchamber",
  "room-2": "Cellar",
};

export interface RoomCameraConfig {
  /** Point the camera orbits around. */
  target: [number, number, number];
  /** Start angles in radians. Azimuth is measured around Y from the +Z axis. */
  azimuth: number;
  polar: number;
  /** Limits that keep the camera from seeing behind the walls. */
  azimuthRange: [number, number];
  polarRange: [number, number];
  /** World-space size that must fit in the viewport. */
  fit: { width: number; height: number };
}

export interface RoomConfig {
  id: RoomId;
  name: string;
  background: string;
  camera: RoomCameraConfig;
  /** Renders the room's geometry, lighting and interactive objects. */
  Component: ComponentType;
}
