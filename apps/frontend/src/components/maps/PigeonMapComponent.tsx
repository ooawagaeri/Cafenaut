import React, { useState } from 'react'
import { Map, Overlay, ZoomControl } from 'pigeon-maps'
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger, Text, Tooltip
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import CafePin from './CafePin';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CafePinModel } from "apps/backend/src/cafe/cafe.interface";

const defaultProps = {
  center: {
    latitude: 1.2805134083679626,
    longitude: 103.8447570537589
  },
  zoom: 15
}

interface PigeonMapType {
  data: CafePinModel[]
}

export function PigeonMapComponent({data}: PigeonMapType) {
  const [pinSize, setPinSize] = useState(defaultProps.zoom);
  return (
    <Box h='calc(92.2vh)'>
      <Map
        defaultCenter={[defaultProps.center.latitude, defaultProps.center.longitude]}
        defaultZoom={defaultProps.zoom}
        onBoundsChanged={(mapData) => setPinSize(mapData.zoom)}
      >
        <ZoomControl/>
        {data.map((cafe) => (
          <Overlay
            key={cafe.id}
            anchor={[cafe.location.latitude, cafe.location.longitude]}
            offset={[(pinSize + cafe.popularity), (pinSize + cafe.popularity)]}
          >
            <Popover placement='top'>
              <PopoverTrigger>
                <IconButton
                  icon={<CafePin authenticity={cafe.authenticity}
                                 size={(pinSize + cafe.popularity) * 2}/>}
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
                  <Box display='flex' justifyContent='center'>
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
                  </Box>
                  <Box display='flex' justifyContent='center'>
                    <Tooltip label="Authenticity %" placement='right'>
                      <CircularProgress value={cafe.authenticity * 100}>
                        <CircularProgressLabel>{Math.round(cafe.authenticity * 100)}%</CircularProgressLabel>
                      </CircularProgress>
                    </Tooltip>
                  </Box>
                  <Box textAlign='center'>
                    <Tooltip label="Total no. of reviews" placement='right'>
                      <Text>Reviews: {cafe.popularity}</Text>
                    </Tooltip>
                  </Box>
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
