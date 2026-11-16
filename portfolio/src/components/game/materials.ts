import { MeshBasicMaterial, MeshStandardMaterial } from "three";

/**
 * Materials are created once and shared by every mesh that uses them.
 * Interactive objects clone what they need for hover highlighting.
 */
function stone(color: string, roughness = 0.92): MeshStandardMaterial {
  return new MeshStandardMaterial({ color, roughness, metalness: 0, flatShading: true });
}

export const materials = {
  /** White base so per-instance colours show unchanged. */
  instanced: stone("#ffffff"),
  mortar: stone("#2a2926"),
  trim: stone("#121215"),
  pedestal: stone("#b5af9f"),
  pedestalDark: stone("#7f7a6e"),
  pillar: stone("#a39d8e"),
  pillarDark: stone("#69655c"),
  wood: stone("#5d3c24", 0.85),
  woodDark: stone("#38231a", 0.9),
  iron: new MeshStandardMaterial({ color: "#2d2d31", roughness: 0.55, metalness: 0.6, flatShading: true }),
  glyph: stone("#34322e"),
  rune: new MeshStandardMaterial({
    color: "#7fd8ef",
    emissive: "#3ab7d8",
    emissiveIntensity: 0.9,
    roughness: 0.4,
    flatShading: true,
  }),
  crystal: new MeshStandardMaterial({
    color: "#a6ecff",
    emissive: "#46c6ee",
    emissiveIntensity: 1.5,
    roughness: 0.2,
    flatShading: true,
  }),
  ember: new MeshStandardMaterial({
    color: "#ffb15c",
    emissive: "#ff7417",
    emissiveIntensity: 2.2,
    roughness: 0.6,
    flatShading: true,
  }),
  flame: new MeshBasicMaterial({ color: "#ffc070", toneMapped: false }),
};
