import React from "react";

interface Type {
  authenticity: number;
  size: number;
}

export default function CafePin({authenticity, size}: Type) {
  // TEAL-GREEN: 130deg
  // ORANGE-RED: 0deg
  const hue = `hue-rotate(${120 * authenticity}deg)`;

  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" filter={hue}>
      <image href="/coffee.png" height={size} width={size}/>
    </svg>
  )
}
