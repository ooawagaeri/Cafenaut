import React, { useRef } from 'react'
import { Map, Overlay, ZoomControl } from 'pigeon-maps'
import {
  Box,
  Button, IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react';
import CafePin from './CafePin';

const defaultProps = {
  center: {
    latitude: 1.2805134083679626,
    longitude: 103.8447570537589
  },
  zoom: 15
}

export function PigeonMapComponent() {
  return (
    <Box h='calc(92.2vh)'>
      <Map
        defaultCenter={[defaultProps.center.latitude, defaultProps.center.longitude]}
        defaultZoom={defaultProps.zoom}
      >
        <ZoomControl/>
        <Overlay anchor={[1.2822635350501452, 103.84820255130276]} offset={[25, 25]}>
          <Popover placement='top'>
            <PopoverTrigger>
              <IconButton
                icon={<CafePin size={50}/>}
                variant='unstyled'
                aria-label=''
              />
            </PopoverTrigger>
            <PopoverContent w='150px' alignItems='center'>
              <PopoverArrow/>
              <PopoverCloseButton/>
              <PopoverHeader>Gather</PopoverHeader>
              <PopoverBody>
                <Button
                  mt={4}
                  colorScheme='blue'
                  onClick={() => null}
                >
                  Visit cafe!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Overlay>
      </Map>
    </Box>
  )
}
