export const PILLARS = {
  stack: { name: "Red", color: "#f15957", bands: 4, direction: 2 },
  ember: { name: "Yellow", color: "#ffd15a", bands: 5, direction: 1 },
  ring: { name: "Blue", color: "#65a9ff", bands: 3, direction: 3 },
} as const;

export type PillarVariant = keyof typeof PILLARS;

// In the hall's default view, down starts at +X, followed by right, up and left.
export const DIRECTIONS = ["down", "right", "up", "left"] as const;
export const NOTE_ORDER = ["stack", "ember", "ring"] as const;
export const BEDCHAMBER_CODE = NOTE_ORDER.map((variant) => PILLARS[variant].bands).join("");

export function pillarHeading(turns: number): number {
  return (turns + 1) * Math.PI / 2;
}

export function cellarSolved(turns: Record<PillarVariant, number>): boolean {
  return NOTE_ORDER.every((variant) => turns[variant] % DIRECTIONS.length === PILLARS[variant].direction);
}
