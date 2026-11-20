"use client";

import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader } from "three";
import { contact } from "@/data/portfolio";
import { useGameStore } from "@/store/gameStore";
import { Interactive } from "./Interactive";

function ContactSymbols() {
  const openPanel = useGameStore((state) => state.openPanel);
  const [linkedin, github, gmail] = useLoader(TextureLoader, [
    "/icons/linkedin.svg",
    "/icons/github.svg",
    "/icons/gmail.png",
  ]);
  const symbols = [
    { label: "LinkedIn", x: -1.16, texture: linkedin, color: "#f3e7cf", activate: () => window.open(contact.linkedIn, "_blank", "noopener,noreferrer") },
    { label: "GitHub", x: 0, texture: github, color: "#f3e7cf", activate: () => window.open(contact.gitHub, "_blank", "noopener,noreferrer") },
    { label: "Gmail", x: 1.16, texture: gmail, color: "#ffffff", activate: () => openPanel("contact-email") },
  ];

  return symbols.map(({ label, x, texture, color, activate }) => (
    <Interactive key={label} label={label} position={[x, 0, 0]} onActivate={activate}>
      <mesh>
        <planeGeometry args={[0.87, 0.87]} />
        <meshBasicMaterial map={texture} color={color} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[1.1, 1.06]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
    </Interactive>
  ));
}

/** The icons sit flush with the brick face on the same plane as the name lettering. */
export function WallContacts({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <Suspense fallback={null}>
        <ContactSymbols />
      </Suspense>
    </group>
  );
}
