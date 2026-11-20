# Portfolio: the mystery room

An interactive 3D isometric portfolio, built with Next.js, React Three Fiber and Tailwind.
Click the pedestal or use the menu to open portfolio panels. Solve the Entry Hall puzzles to reach the Bedchamber and Cellar, and use the white pavement arrows to return.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run lint
npm run typecheck
npm run build      # production build, served with `npm run start`
```

Node 20 or newer is expected.

## Deploying on Vercel

The project used to be a Create React App. After this version is merged, set the
Vercel project's **Framework Preset** to **Next.js** (the build command becomes
`next build` and the output directory `.next`). The root directory stays `portfolio`.

## Where things live

```text
src/
  app/              Next.js App Router entry: layout, page, global CSS
  components/
    Experience.tsx  Loads the canvas client-side, wraps the HUD and loading screen
    game/           Everything rendered inside the <Canvas>
      GameCanvas.tsx       Canvas setup, renderer options, click-away handling
      CameraController.tsx Orthographic isometric camera, limits, reset, panel shift
      StoneRoom.tsx        Shared walls, floor and lighting
      MainRoom/SideRooms   Entry Hall and explorable rooms
      StoneWall/StoneFloor Procedural instanced brick and flagstone geometry
      Pedestal/Pillar/MysteryDoor/Torch/Decor  Room props
      Interactive.tsx      Hover highlight, cursor and click handling for any prop
      materials.ts         Shared materials
    ui/             HTML overlays: HUD buttons, menu, info panels, loading screen
  data/portfolio.ts All text content (profile, about, projects, skills, help)
  rooms/            Room registry and types
  store/            Zustand store shared by the canvas and the HTML UI
  hooks/            Media-query hooks (reduced motion, mobile)
public/models/      Drop Blender GLB exports here when replacing procedural props
```

Editing text: everything the panels show is in `src/data/portfolio.ts`.

## Adding another room

1. Build the room as a component under `src/components/game/`, for example
   `LibraryRoom.tsx`. Use `StoneRoom` for the existing stone layout and lighting.
2. Add the room ID and name to `src/rooms/types.ts`. Register it in `src/rooms/registry.ts` with a background colour and
   camera settings (start angles, rotation limits and the size that must fit on
   screen). The main room's entry is the template.
3. Set the new room as a door's `destination`. The door starts room travel and
   the camera loads the destination's settings while the screen is black.

Each prop is an isolated component, so a procedural object can be swapped for a
GLB loaded with drei's `useGLTF` without touching the rest of the room.
