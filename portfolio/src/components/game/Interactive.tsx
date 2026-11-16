"use client";

import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { Color, MathUtils, Mesh, MeshStandardMaterial, type Group } from "three";
import { useGameStore } from "@/store/gameStore";

interface InteractiveProps {
  /** Shown as a caption while the object is hovered. */
  label: string;
  onActivate: () => void;
  position?: [number, number, number];
  rotationY?: number;
  children: ReactNode;
}

interface HighlightEntry {
  mesh: Mesh;
  original: MeshStandardMaterial;
  clone: MeshStandardMaterial;
  baseIntensity: number;
  glows: boolean;
}

const HIGHLIGHT = new Color("#ffcf96");
/** Pointer travel (px) above which a press counts as a camera drag, not a click. */
const DRAG_THRESHOLD = 6;

/**
 * Makes everything inside it hoverable and clickable. Hovering lifts the
 * emissive level of the object's own (cloned) materials and shows a pointer.
 */
export function Interactive({ label, onActivate, position, rotationY = 0, children }: InteractiveProps) {
  const group = useRef<Group>(null);
  const hovered = useRef(false);
  const level = useRef(0);
  /** Pushes a highlight level (0..1) into this object's materials. */
  const applyLevel = useRef<((value: number) => void) | null>(null);
  const setHovered = useGameStore((state) => state.setHovered);

  // Give this object private copies of its materials so the glow stays local.
  useLayoutEffect(() => {
    const root = group.current;
    if (!root) return;
    const found: HighlightEntry[] = [];
    root.traverse((child) => {
      if (!(child instanceof Mesh) || !(child.material instanceof MeshStandardMaterial)) return;
      const original = child.material;
      const clone = original.clone();
      const glows = original.emissive.getHex() !== 0 && original.emissiveIntensity > 0;
      if (!glows) {
        clone.emissive.copy(HIGHLIGHT);
        clone.emissiveIntensity = 0;
      }
      child.material = clone;
      found.push({ mesh: child, original, clone, baseIntensity: original.emissiveIntensity, glows });
    });
    applyLevel.current = (value) => {
      for (const entry of found) {
        entry.clone.emissiveIntensity = entry.glows ? entry.baseIntensity * (1 + value * 0.7) : value * 0.2;
      }
    };
    return () => {
      for (const entry of found) {
        entry.mesh.material = entry.original;
        entry.clone.dispose();
      }
      applyLevel.current = null;
    };
  }, []);

  useEffect(
    () => () => {
      if (!hovered.current) return;
      document.body.style.cursor = "";
      if (useGameStore.getState().hoveredLabel === label) setHovered(null);
    },
    [label, setHovered],
  );

  useFrame((_, delta) => {
    const target = hovered.current ? 1 : 0;
    if (Math.abs(level.current - target) < 0.002) return;
    level.current = MathUtils.damp(level.current, target, 12, delta);
    applyLevel.current?.(level.current);
  });

  const handleOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    hovered.current = true;
    document.body.style.cursor = "pointer";
    setHovered(label);
  };

  const handleOut = () => {
    hovered.current = false;
    document.body.style.cursor = "";
    if (useGameStore.getState().hoveredLabel === label) setHovered(null);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (event.delta > DRAG_THRESHOLD) return;
    onActivate();
  };

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      {children}
    </group>
  );
}
