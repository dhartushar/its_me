import type { ReactNode } from "react";

/** Icons drawn on a 12×12 pixel grid so they match the blocky theme. */
function Pixel({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 12 12" width="22" height="22" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      {children}
    </svg>
  );
}

export function MenuIcon() {
  return (
    <Pixel>
      <rect x="1" y="2" width="10" height="2" />
      <rect x="1" y="5" width="10" height="2" />
      <rect x="1" y="8" width="7" height="2" />
    </Pixel>
  );
}

export function HelpIcon() {
  return (
    <Pixel>
      <rect x="3" y="1" width="6" height="2" />
      <rect x="2" y="2" width="2" height="2" />
      <rect x="8" y="2" width="2" height="3" />
      <rect x="6" y="5" width="3" height="2" />
      <rect x="5" y="6" width="2" height="2" />
      <rect x="5" y="10" width="2" height="2" />
    </Pixel>
  );
}

export function ResetIcon() {
  return (
    <Pixel>
      {/* Counter-clockwise arrow. */}
      <rect x="4" y="1" width="5" height="2" />
      <rect x="9" y="2" width="2" height="5" />
      <rect x="2" y="3" width="2" height="2" />
      <rect x="1" y="5" width="2" height="2" />
      <rect x="2" y="7" width="2" height="2" />
      <rect x="4" y="9" width="5" height="2" />
      <rect x="9" y="7" width="2" height="2" />
      <rect x="3" y="1" width="2" height="2" />
      <rect x="1" y="1" width="2" height="2" />
    </Pixel>
  );
}

export function CloseIcon() {
  return (
    <Pixel>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={1 + i * 2} y={1 + i * 2} width="2" height="2" />
          <rect x={9 - i * 2} y={1 + i * 2} width="2" height="2" />
        </g>
      ))}
      <rect x="5" y="5" width="2" height="2" />
    </Pixel>
  );
}
