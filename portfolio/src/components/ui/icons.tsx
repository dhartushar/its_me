import type { SVGProps } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function MenuIcon() {
  return (
    <Icon>
      <path d="M5 7h14M5 12h14M5 17h9" />
    </Icon>
  );
}

export function HelpIcon() {
  return (
    <Icon>
      <path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4" />
      <path d="M12 17.6h.01" />
      <circle cx="12" cy="12" r="8.6" />
    </Icon>
  );
}

export function ResetIcon() {
  return (
    <Icon>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.3 4.5v3.4h3.4" />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </Icon>
  );
}
