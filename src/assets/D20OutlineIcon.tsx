import { Box } from "@chakra-ui/react";

export const D20OutlineIcon = ({ color = "#FFFFFF", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 976 976"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Outline-copy">
      <path
        id="Polygon"
        fill="none"
        stroke={color}
        stroke-width="40"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 486.549774 42.070679 L 103.290436 265.05304 L 103.290436 711.0177 L 486.549774 934 L 869.809082 711.0177 L 869.809082 265.05304 Z"
      />
      <path
        id="Triangle"
        fill="none"
        stroke={color}
        stroke-width="40"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 488.521027 162.248413 L 219.442902 648.166077 L 757.599182 648.166077 Z M 485.564148 42.986633 L 487.5354 164.219666 L 868.97583 266.725647 L 757.599182 647.18042 L 868.97583 709.275391 M 219.442902 645.209167 L 488.521027 934 L 757.599182 648.166077 M 487.5354 164.219666 L 103.138054 265.73999 L 218.45726 647.18042 L 103.138054 710.260986"
      />
    </g>
  </svg>
);
