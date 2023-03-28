import React, { useState } from 'react'
import { Map, Overlay, ZoomControl } from 'pigeon-maps'
import {
  Box,
  Button, IconButton, Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import CafePin from './CafePin';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CafeModel } from "apps/backend/src/cafe/cafe.interface";

const defaultProps = {
  center: {
    latitude: 1.2805134083679626,
    longitude: 103.8447570537589
  },
  zoom: 15
}

interface PigeonMapType {
  data: CafeModel[]
}

export function PigeonMapComponent({data}: PigeonMapType) {
  const [pinSize, setPinSize] = useState(defaultProps.zoom);
  return (
    <Box h='calc(92.2vh)'>
      <Map
        defaultCenter={[defaultProps.center.latitude, defaultProps.center.longitude]}
        defaultZoom={defaultProps.zoom}
        onBoundsChanged={(mapData) => setPinSize(mapData.zoom * 2)}
      >
        <ZoomControl/>
        {data.map((cafe) => (
          <Overlay
            key={cafe.id}
            anchor={[cafe.location.latitude, cafe.location.longitude]}
            offset={[pinSize / 2, pinSize / 2]}
          >
            <Popover placement='top'>
              <PopoverTrigger>
                <IconButton
                  icon={<CafePin authenticity={0.9} size={pinSize}/>}
                  variant='unstyled'
                  aria-label=''
                  _focus={{boxShadow: "none"}}
                />
              </PopoverTrigger>
              <PopoverContent w='150px' alignItems='center'>
                <PopoverArrow/>
                <PopoverCloseButton/>
                {cafe.logo && (
                  <Image src={cafe.logo} maxHeight='50px' maxWidth='auto' marginTop='9px'/>
                )}
                <PopoverHeader>{cafe.name}</PopoverHeader>
                <PopoverBody>
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    value={cafe.rating.unweighted}
                    edit={false}
                  />
                  <Button
                    mt={4}
                    colorScheme='blue'
                    onClick={() => console.log('View Cafe @chenler')}
                  >
                    Visit cafe!
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Overlay>))};
      </Map>
    </Box>
  )
}
