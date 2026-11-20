"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";
import { NOTE_ORDER, PILLARS } from "@/data/puzzles";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useGameStore } from "@/store/gameStore";
import { Interactive } from "./Interactive";
import { materials } from "./materials";

/**
 * A carved panel on the left wall. Local +Z points out of the wall,
 * so the same component can be mounted on any wall.
 */
export function RunePanel({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, 0.12]} material={materials.pillarDark} receiveShadow>
        <boxGeometry args={[1.3, 1.3, 0.1]} />
      </mesh>
      <mesh position={[0, 0, 0.18]} material={materials.glyph}>
        <boxGeometry args={[1.08, 1.08, 0.04]} />
      </mesh>
      <mesh position={[0, 0, 0.21]} material={materials.pillar}>
        <torusGeometry args={[0.34, 0.045, 4, 16]} />
      </mesh>
      <mesh position={[0, 0, 0.21]} material={materials.pillar}>
        <boxGeometry args={[0.07, 0.9, 0.03]} />
      </mesh>
      <mesh position={[0, 0.02, 0.22]} rotation={[0, 0, Math.PI / 4]} material={materials.rune}>
        <boxGeometry args={[0.16, 0.16, 0.03]} />
      </mesh>
    </group>
  );
}

interface LooseStone {
  position: [number, number, number];
  size: [number, number, number];
  rotation: number;
}

const LEFT_PILE: (LooseStone & { displacement: [number, number, number] })[] = [
  { position: [-5.2, 0.28, 4.9], size: [0.7, 0.32, 0.5], rotation: 0.3, displacement: [-0.35, 0, -0.78] },
  { position: [-5.35, 0.62, 4.75], size: [0.42, 0.36, 0.38], rotation: -0.2, displacement: [0.75, -0.31, -0.27] },
  { position: [-4.5, 0.24, 5.3], size: [0.36, 0.24, 0.32], rotation: 0.8, displacement: [0.52, 0, 0.26] },
];
const RIGHT_PILE: LooseStone[] = [
  { position: [5.3, 0.27, 2.6], size: [0.62, 0.3, 0.55], rotation: -0.4 },
  { position: [4.8, 0.22, 3.1], size: [0.3, 0.2, 0.28], rotation: 0.5 },
];
function StoneBlocks({ stones }: { stones: LooseStone[] }) {
  return stones.map((stone) => (
    <mesh key={stone.position.join(":")} position={stone.position} rotation={[0, stone.rotation, 0]} material={materials.pillar} castShadow receiveShadow>
      <boxGeometry args={stone.size} />
    </mesh>
  ));
}

function NoteStones() {
  const moved = useGameStore((state) => state.stonesMoved);
  const moveStones = useGameStore((state) => state.moveStones);
  const openPanel = useGameStore((state) => state.openPanel);
  const reducedMotion = useReducedMotion();
  const pile = useRef<Group>(null);
  const slide = useRef(moved ? 1 : 0);
  const showNoteAfterSlide = useRef(false);

  const activate = () => {
    if (moved && slide.current >= 0.95) {
      openPanel("brick-note");
      return;
    }
    showNoteAfterSlide.current = true;
    if (!moved) moveStones();
  };

  useFrame((_, delta) => {
    const group = pile.current;
    if (!group) return;
    const target = moved ? 1 : 0;
    slide.current = reducedMotion ? target : MathUtils.damp(slide.current, target, 8, delta);
    const progress = slide.current;
    LEFT_PILE.forEach(({ position: [x, y, z], displacement: [dx, dy, dz] }, index) => {
      group.children[index]?.position.set(x + dx * progress, y + dy * progress, z + dz * progress);
    });
    if (showNoteAfterSlide.current && progress >= 0.95) {
      showNoteAfterSlide.current = false;
      openPanel("brick-note");
    }
  });

  return (
    <Interactive label={moved ? "Folded note" : "Loose stones"} onActivate={activate}>
      <group ref={pile}>
        <StoneBlocks stones={LEFT_PILE} />
      </group>
      <mesh position={[-5, 0.39, 4.98]}>
        <boxGeometry args={[1.5, 0.58, 1.0]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
      {moved && (
        <group position={[-5.16, 0.165, 4.94]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <planeGeometry args={[0.63, 0.36]} />
            <meshBasicMaterial color="#dbbf87" toneMapped={false} />
          </mesh>
          {NOTE_ORDER.map((variant, index) => (
            <mesh key={variant} position={[(index - 1) * 0.17, 0, 0.005]}>
              <planeGeometry args={[0.105, 0.105]} />
              <meshBasicMaterial color={PILLARS[variant].color} toneMapped={false} />
            </mesh>
          ))}
        </group>
      )}
    </Interactive>
  );
}

/** A few loose blocks so the room does not look freshly built. */
export function LooseStones({ hideNote }: { hideNote?: boolean }) {
  return (
    <group>
      {hideNote ? <NoteStones /> : <StoneBlocks stones={LEFT_PILE} />}
      <StoneBlocks stones={RIGHT_PILE} />
    </group>
  );
}
