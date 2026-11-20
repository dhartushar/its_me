/** Shared measurements for the main room, in world units. */
export const ROOM = {
  /** The floor spans -half..half on X and Z. */
  half: 6,
  wallHeight: 5,
  wallThickness: 0.4,
  /** Approximate height of the floor tiles' top surface. */
  floorY: 0.12,
  door: { backX: 3.1, leftZ: -2.7, width: 1.5, height: 2.6 },
} as const;
