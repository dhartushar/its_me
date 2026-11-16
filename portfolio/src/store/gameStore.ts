import { create } from "zustand";
import type { PanelId } from "@/data/portfolio";

interface GameState {
  /** Key into the room registry. */
  currentRoomId: string;
  activePanel: PanelId | null;
  /** Label of the object under the pointer, shown as a caption. */
  hoveredLabel: string | null;
  doorOpen: boolean;
  /** True once the 3D scene has been created. */
  ready: boolean;
  /** Incremented to ask the camera controller to return to its start pose. */
  resetNonce: number;

  openPanel: (panel: PanelId) => void;
  closePanel: () => void;
  setHovered: (label: string | null) => void;
  openDoor: () => void;
  setReady: () => void;
  resetCamera: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentRoomId: "main",
  activePanel: null,
  hoveredLabel: null,
  doorOpen: false,
  ready: false,
  resetNonce: 0,

  openPanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null }),
  setHovered: (label) => set({ hoveredLabel: label }),
  openDoor: () => set({ doorOpen: true }),
  setReady: () => set({ ready: true }),
  resetCamera: () => set((state) => ({ resetNonce: state.resetNonce + 1 })),
}));
