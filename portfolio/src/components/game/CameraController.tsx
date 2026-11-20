"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { MathUtils, Spherical, Vector3, type OrthographicCamera } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import type { RoomCameraConfig } from "@/rooms/types";
import { useGameStore } from "@/store/gameStore";

const DISTANCE = 30;
/** Where the camera starts before easing in on first load. */
const INTRO_OFFSET = { azimuth: 0.35, polar: -0.08, zoom: 0.84 };
/** How far (px) the view slides when a panel opens. */
const PANEL_SHIFT = 210;

interface Pose {
  azimuth: number;
  polar: number;
  /** Multiple of the zoom that fits the room to the viewport. */
  zoom: number;
}

const offset = new Vector3();
const spherical = new Spherical();

/**
 * Orthographic isometric camera. Drag rotates within limits that keep the
 * outside of the walls hidden; the room is always fitted to the viewport,
 * and the reset button eases back to the start pose.
 */
export function CameraController({ config }: { config: RoomCameraConfig }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const goal = useRef<Pose | null>(null);
  const previousFit = useRef<number | null>(null);

  const get = useThree((state) => state.get);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const resetNonce = useGameStore((state) => state.resetNonce);
  const panelOpen = useGameStore((state) => state.activePanel !== null);
  const reducedMotion = useReducedMotion();
  // While a panel is open the room slides aside to stay uncovered:
  // left on wide screens (side panel), up on narrow ones (bottom sheet).
  const panelShift = useRef({ x: 0, y: 0 });
  const wide = width >= 640;
  const shiftTarget = {
    x: panelOpen && wide ? Math.min(PANEL_SHIFT, width * 0.16) : 0,
    y: panelOpen && !wide ? height * 0.2 : 0,
  };

  const target = useMemo(() => new Vector3(...config.target), [config.target]);
  const fitZoom = Math.min(width / config.fit.width, height / config.fit.height);
  const startPose = useMemo<Pose>(
    () => ({ azimuth: config.azimuth, polar: config.polar, zoom: 1 }),
    [config.azimuth, config.polar],
  );

  const camera = () => get().camera as OrthographicCamera;

  const applyPose = (pose: Pose) => {
    const cam = camera();
    spherical.set(DISTANCE, pose.polar, pose.azimuth);
    cam.position.setFromSpherical(spherical).add(target);
    cam.zoom = pose.zoom * fitZoom;
    cam.lookAt(target);
    cam.updateProjectionMatrix();
    controls.current?.update();
  };

  // Ease in on initial load. During travel, frame the new room while the screen is black.
  useLayoutEffect(() => {
    camera().clearViewOffset();
    if (reducedMotion || useGameStore.getState().travel) {
      applyPose(startPose);
    } else {
      applyPose({
        azimuth: startPose.azimuth + INTRO_OFFSET.azimuth,
        polar: startPose.polar + INTRO_OFFSET.polar,
        zoom: INTRO_OFFSET.zoom,
      });
      goal.current = startPose;
    }
    previousFit.current = fitZoom;
    // Runs on mount only; resizes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the same relative zoom when the viewport changes size.
  useLayoutEffect(() => {
    const previous = previousFit.current;
    if (previous === null || previous === fitZoom) return;
    const cam = camera();
    cam.zoom = (cam.zoom / previous) * fitZoom;
    cam.updateProjectionMatrix();
    previousFit.current = fitZoom;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitZoom]);

  useEffect(() => {
    if (resetNonce === 0) return;
    if (reducedMotion) {
      goal.current = null;
      applyPose(startPose);
    } else {
      goal.current = startPose;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetNonce]);

  useFrame((_, delta) => {
    const cam = camera();
    const step = Math.min(delta, 0.05);

    const shift = panelShift.current;
    if (Math.abs(shift.x - shiftTarget.x) > 0.1 || Math.abs(shift.y - shiftTarget.y) > 0.1) {
      shift.x = reducedMotion ? shiftTarget.x : MathUtils.damp(shift.x, shiftTarget.x, 6, step);
      shift.y = reducedMotion ? shiftTarget.y : MathUtils.damp(shift.y, shiftTarget.y, 6, step);
      if (Math.abs(shift.x - shiftTarget.x) <= 0.1) shift.x = shiftTarget.x;
      if (Math.abs(shift.y - shiftTarget.y) <= 0.1) shift.y = shiftTarget.y;
      if (shift.x === 0 && shift.y === 0) cam.clearViewOffset();
      else cam.setViewOffset(width, height, shift.x, shift.y, width, height);
      cam.updateProjectionMatrix();
    }

    const pose = goal.current;
    const orbit = controls.current;
    if (!pose || !orbit) return;
    offset.copy(cam.position).sub(target);
    spherical.setFromVector3(offset);
    const azimuth = MathUtils.damp(spherical.theta, pose.azimuth, 4, step);
    const polar = MathUtils.damp(spherical.phi, pose.polar, 4, step);
    const zoom = MathUtils.damp(cam.zoom / fitZoom, pose.zoom, 4, step);
    const done =
      Math.abs(azimuth - pose.azimuth) < 0.001 &&
      Math.abs(polar - pose.polar) < 0.001 &&
      Math.abs(zoom - pose.zoom) < 0.001;
    applyPose(done ? pose : { azimuth, polar, zoom });
    if (done) goal.current = null;
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={config.target}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      minAzimuthAngle={config.azimuthRange[0]}
      maxAzimuthAngle={config.azimuthRange[1]}
      minPolarAngle={config.polarRange[0]}
      maxPolarAngle={config.polarRange[1]}
      enableZoom={false}
      // Any manual drag cancels an eased transition.
      onStart={() => {
        goal.current = null;
      }}
    />
  );
}
