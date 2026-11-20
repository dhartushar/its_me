import { MainRoom } from "@/components/game/MainRoom";
import { FirstRoom, SecondRoom } from "@/components/game/SideRooms";
import { ROOM_NAMES, type RoomCameraConfig, type RoomConfig, type RoomId } from "./types";

const degrees = (value: number) => (value * Math.PI) / 180;
const stoneRoomCamera: RoomCameraConfig = {
  target: [0, 2.1, 0],
  azimuth: degrees(45),
  polar: degrees(57),
  azimuthRange: [degrees(8), degrees(82)],
  polarRange: [degrees(48), degrees(66)],
  fit: { width: 16.2, height: 15.4 },
};
const sideRoomCamera: RoomCameraConfig = {
  ...stoneRoomCamera,
  fit: { width: 18.6, height: 16 },
};

/**
 * Every room the game can show. To add one: build a component under
 * components/game, then register it here with its own camera settings.
 */
export const rooms: Record<RoomId, RoomConfig> = {
  main: {
    id: "main",
    name: ROOM_NAMES.main,
    background: "#17181c",
    Component: MainRoom,
    camera: stoneRoomCamera,
  },
  "room-1": {
    id: "room-1",
    name: ROOM_NAMES["room-1"],
    background: "#17181c",
    Component: FirstRoom,
    camera: sideRoomCamera,
  },
  "room-2": {
    id: "room-2",
    name: ROOM_NAMES["room-2"],
    background: "#17181c",
    Component: SecondRoom,
    camera: sideRoomCamera,
  },
};

export function getRoom(id: RoomId): RoomConfig {
  return rooms[id];
}
