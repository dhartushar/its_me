"use client";

import { useLayoutEffect, useRef } from "react";
import { CanvasTexture, SRGBColorSpace, type MeshBasicMaterial } from "three";

interface WallLetteringProps {
  text: string;
  position: [number, number, number];
  rotationY?: number;
}

export function WallLettering({ text, position, rotationY = 0 }: WallLetteringProps) {
  const material = useRef<MeshBasicMaterial>(null);

  useLayoutEffect(() => {
    const surface = material.current;
    if (!surface) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 192;
    const context = canvas.getContext("2d");
    if (!context) return;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    const family = getComputedStyle(document.body).getPropertyValue("--font-pixel-sans").trim();
    const font = `600 136px ${family || '"Courier New", monospace'}`;
    let mounted = true;

    const paint = () => {
      if (!mounted) return;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const width = canvas.width - 28;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = font;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.strokeStyle = "#302115";
      context.lineWidth = 8;
      context.strokeText(text, x, y, width);
      context.fillStyle = "#e3b860";
      context.fillText(text, x, y, width);
      texture.needsUpdate = true;
    };

    paint();
    surface.map = texture;
    surface.visible = true;
    surface.needsUpdate = true;
    void document.fonts.load(font, text).then(paint, () => {});
    return () => {
      mounted = false;
      texture.dispose();
    };
  }, [text]);

  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[5.7, 1.07]} />
      <meshBasicMaterial ref={material} visible={false} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
