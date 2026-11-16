import type { ComponentType } from "react";

export interface RoomCameraConfig {
  /** Point the camera orbits around. */
  target: [number, number, number];
  /** Start angles in radians. Azimuth is measured around Y from the +Z axis. */
  azimuth: number;
  polar: number;
  /** Limits that keep the camera from seeing behind the walls. */
  azimuthRange: [number, number];
  polarRange: [number, number];
  /** World-space size that must fit in the viewport at the default zoom. */
  fit: { width: number; height: number };
  /** Allowed zoom, as multiples of the fitted zoom. */
  zoomRange: [number, number];
}

export interface RoomConfig {
  id: string;
  name: string;
  background: string;
  camera: RoomCameraConfig;
  /** Renders the room's geometry, lighting and interactive objects. */
  Component: ComponentType;
}
