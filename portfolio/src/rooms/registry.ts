import { MainRoom } from "@/components/game/MainRoom";
import type { RoomConfig } from "./types";

const degrees = (value: number) => (value * Math.PI) / 180;

/**
 * Every room the game can show. To add one: build a component under
 * components/game, then register it here with its own camera settings.
 */
export const rooms: Record<string, RoomConfig> = {
  main: {
    id: "main",
    name: "The Entry Hall",
    background: "#17181c",
    Component: MainRoom,
    camera: {
      target: [0, 2.1, 0],
      azimuth: degrees(45),
      polar: degrees(57),
      azimuthRange: [degrees(8), degrees(82)],
      polarRange: [degrees(48), degrees(66)],
      fit: { width: 16.2, height: 15.4 },
    },
  },
};

export const DEFAULT_ROOM_ID = "main";

export function getRoom(id: string): RoomConfig {
  const room = rooms[id] ?? rooms[DEFAULT_ROOM_ID];
  if (!room) throw new Error("Room registry is empty");
  return room;
}
