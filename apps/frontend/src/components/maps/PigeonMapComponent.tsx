import React, { useState } from "react"
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { Box } from "@chakra-ui/react";
import PinPopOver from "./PinPopOver";

const defaultProps = {
  center: {
    latitude: 1.2805134083679626,
    longitude: 103.8447570537589
  },
  zoom: 15
}

export function PigeonMapComponent() {
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  return (
    <Box h='calc(92.2vh)'>
      <Map
        defaultCenter={[defaultProps.center.latitude, defaultProps.center.longitude]}
        defaultZoom={defaultProps.zoom}
      >
        <ZoomControl/>
        <Marker
          width={50}
          anchor={[1.2822635350501452, 103.84820255130276]}
          color={color}
          onClick={PinPopOver}
        />
      </Map>
    </Box>
  )
}
