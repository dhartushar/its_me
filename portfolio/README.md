# Portfolio: the mystery room

An interactive 3D isometric stone room, built with Next.js, React Three Fiber and Tailwind.
Clicking the pedestal, the three pillars and the door opens the portfolio panels.

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
      MainRoom.tsx         The first room: assembles walls, floor, props and lights
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
   `LibraryRoom.tsx`. Reuse `StoneWall`, `StoneFloor`, `Interactive` and the
   shared `materials`, and give it its own `Lighting` if it needs different light.
2. Register it in `src/rooms/registry.ts` with an id, a background colour and
   camera settings (start angles, rotation limits and the size that must fit on
   screen). The main room's entry is the template.
3. Switch rooms by setting `currentRoomId` in `src/store/gameStore.ts`; the
   `CameraController` remounts with the new room's settings. The door in the
   main room is the natural place to trigger that change.

Each prop is an isolated component, so a procedural object can be swapped for a
GLB loaded with drei's `useGLTF` without touching the rest of the room.
