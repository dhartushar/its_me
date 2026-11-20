import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PanelId } from "@/data/portfolio";
import { BEDCHAMBER_CODE, cellarSolved, type PillarVariant } from "@/data/puzzles";
import { DEFAULT_ROOM_ID, type RoomId } from "@/rooms/types";

type RoomTravel = {
  destination: RoomId;
  phase: "departing" | "loading" | "arriving";
};

interface GameState {
  /** Key into the room registry. */
  currentRoomId: RoomId;
  activePanel: PanelId | null;
  /** Label of the object under the pointer, shown as a caption. */
  hoveredLabel: string | null;
  travel: RoomTravel | null;
  stonesMoved: boolean;
  bedchamberUnlocked: boolean;
  cellarUnlocked: boolean;
  pillarTurns: Record<PillarVariant, number>;
  litTorches: Record<PillarVariant, boolean>;
  /** True once the 3D scene has been created. */
  ready: boolean;
  /** Incremented to ask the camera controller to return to its start pose. */
  resetNonce: number;

  openPanel: (panel: PanelId) => void;
  closePanel: () => void;
  setHovered: (label: string | null) => void;
  moveStones: () => void;
  submitBedchamberCode: (code: string) => boolean;
  turnPillar: (variant: PillarVariant) => void;
  lightTorch: (variant: PillarVariant) => void;
  beginRoomTravel: (destination: RoomId) => void;
  commitRoomTravel: () => void;
  roomRendered: (roomId: RoomId) => void;
  finishRoomTravel: () => void;
  resetCamera: () => void;
}

export const useGameStore = create<GameState>()(persist((set, get) => ({
  currentRoomId: DEFAULT_ROOM_ID,
  activePanel: null,
  hoveredLabel: null,
  travel: null,
  stonesMoved: false,
  bedchamberUnlocked: false,
  cellarUnlocked: false,
  pillarTurns: { stack: 0, ember: 0, ring: 0 },
  litTorches: { stack: false, ember: false, ring: false },
  ready: false,
  resetNonce: 0,

  openPanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null }),
  setHovered: (label) => set({ hoveredLabel: label }),
  moveStones: () => set({ stonesMoved: true, activePanel: null }),
  submitBedchamberCode: (code) => {
    if (code !== BEDCHAMBER_CODE) return false;
    set({ bedchamberUnlocked: true, activePanel: null, hoveredLabel: "Bedchamber" });
    return true;
  },
  turnPillar: (variant) => set((state) => {
    const pillarTurns = { ...state.pillarTurns, [variant]: state.pillarTurns[variant] + 1 };
    return { pillarTurns, cellarUnlocked: state.cellarUnlocked || cellarSolved(pillarTurns) };
  }),
  lightTorch: (variant) => set((state) => {
    if (state.litTorches[variant]) return state;
    return { litTorches: { ...state.litTorches, [variant]: true } };
  }),
  beginRoomTravel: (destination) => {
    const { currentRoomId, travel, bedchamberUnlocked, cellarUnlocked } = get();
    if (currentRoomId === destination || travel) return;
    if (destination === "room-1" && !bedchamberUnlocked) return;
    if (destination === "room-2" && !cellarUnlocked) return;
    set({ travel: { destination, phase: "departing" }, hoveredLabel: null });
  },
  commitRoomTravel: () => {
    const { travel } = get();
    if (travel?.phase !== "departing") return;
    set({
      currentRoomId: travel.destination,
      travel: { ...travel, phase: "loading" },
      activePanel: null,
      hoveredLabel: null,
    });
  },
  roomRendered: (roomId) => {
    const { currentRoomId, ready, travel } = get();
    if (roomId !== currentRoomId) return;
    if (travel?.phase === "loading") {
      set({ ready: true, travel: { ...travel, phase: "arriving" } });
    } else if (!ready) {
      set({ ready: true });
    }
  },
  finishRoomTravel: () => {
    if (get().travel?.phase === "arriving") set({ travel: null });
  },
  resetCamera: () => set((state) => ({ resetNonce: state.resetNonce + 1 })),
}), {
  name: "portfolio-room-progress",
  version: 1,
  migrate: (saved) => {
    const { currentRoomId, bedchamberUnlocked, cellarUnlocked, pillarTurns, litTorches } = saved as GameState;
    return { currentRoomId, stonesMoved: false, bedchamberUnlocked, cellarUnlocked, pillarTurns, litTorches };
  },
  storage: createJSONStorage(() => {
    const storage = window.localStorage;
    let saved: string | null = null;
    return {
      getItem(name) {
        saved = storage.getItem(name);
        return saved;
      },
      setItem(name, value) {
        if (value === saved) return;
        try {
          storage.setItem(name, value);
          saved = value;
        } catch {
          // Keep the current visit playable when browser storage is unavailable.
        }
      },
      removeItem: (name) => storage.removeItem(name),
    };
  }),
  partialize: ({ currentRoomId, stonesMoved, bedchamberUnlocked, cellarUnlocked, pillarTurns, litTorches }) => ({
    currentRoomId, stonesMoved, bedchamberUnlocked, cellarUnlocked, pillarTurns, litTorches,
  }),
}));
