"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, InstancedMesh, Object3D } from "three";
import { materials } from "./materials";

export interface Block {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

const unitBox = new BoxGeometry(1, 1, 1);

interface InstancedBlocksProps {
  blocks: Block[];
  castShadow?: boolean;
}

/** Draws many boxes in one draw call, each with its own size and colour. */
export function InstancedBlocks({ blocks, castShadow = false }: InstancedBlocksProps) {
  const mesh = useRef<InstancedMesh>(null);
  const colors = useMemo(() => blocks.map((block) => new Color(block.color)), [blocks]);

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const dummy = new Object3D();
    blocks.forEach((block, index) => {
      dummy.position.set(...block.position);
      dummy.scale.set(...block.size);
      dummy.updateMatrix();
      instanced.setMatrixAt(index, dummy.matrix);
      const color = colors[index];
      if (color) instanced.setColorAt(index, color);
    });
    instanced.instanceMatrix.needsUpdate = true;
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
    instanced.computeBoundingSphere();
  }, [blocks, colors]);

  return (
    <instancedMesh
      ref={mesh}
      args={[unitBox, materials.instanced, blocks.length]}
      castShadow={castShadow}
      receiveShadow
    />
  );
}
