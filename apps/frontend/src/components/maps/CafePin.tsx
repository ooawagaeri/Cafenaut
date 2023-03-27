import React from "react";

interface Type {
  size: number;
}

export default function CafePin({size}: Type) {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" onClick={() => null}>
      <image href="/coffee.png" height={size} width={size}/>
    </svg>
  )
}
