import React, { useEffect, useState } from 'react'
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps'
import {
  Box,
  Button,
  Circle,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import CafePin from './CafePin';
import ContextMenu from './ContextMenu';
import { CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { Location } from 'apps/backend/src/middle-ground/location.interface';
import { MiddleGdDrawer } from './MiddleGdDrawer';
import { CafeCard } from './CafeCard';
import Instructions from "./Instructions";

const defaultProps = {
  center: {
    latitude: 1.2805134083679626,
    longitude: 103.8447570537589
  },
  zoom: 15
}

const defaultCenter: [number, number] = [defaultProps.center.latitude, defaultProps.center.longitude]

interface Type {
  data: CafePinModel[]
}

export function PigeonMap({data}: Type) {
  // Map Attributes
  const [center, setCenter] = useState(defaultCenter)
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const [pinSize, setPinSize] = useState(defaultProps.zoom);
  const handleCenter = (newCenter: [number, number]) => {
    setCenter(newCenter);
    setZoom(defaultProps.zoom);
  };

  // Mouse Events Attributes
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const handleRightClick = () => setRightClicked(false);

  // Middle-ground Pins
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [mouseLatLng, setMouseLatLng] = useState<[number, number]>([0, 0]);
  const [contextMenuPos, setContextMenuPos] = useState({x: 0, y: 0});
  const [pins, setPins] = useState<Location[]>([]);
  const [circleLatLng, setCircleLatLng] = useState<[number, number]>([0, 0]);
  const [circleRadius, setCircleRadius] = useState(0);
  const clearPins = () => {
    setPins([]);
    setCircleRadius(0);
  };
  const handleAppendPin = (loc: Location) => {
    for (const item of pins) {
      if (item.latitude === loc.latitude && item.longitude === loc.longitude) {
        return;
      }
    }
    setPins(current => [...current, loc]);
  };
  const handleCircle = (loc: [number, number], radius: number) => {
    setCircleLatLng(loc);
    setCircleRadius(radius * 3);
  };

  useEffect(() => {
    window.addEventListener('click', handleRightClick);
    return () => {
      window.removeEventListener('click', handleRightClick);
    };
  }, []);

  return (
    <Box>
      <Box h='calc(92.2vh)'
           onClick={(e) => {
             e.preventDefault();
             setLeftClicked(true);
             setContextMenuPos({x: e.pageX, y: e.pageY});
           }}
           onContextMenu={(e) => {
             e.preventDefault();
             setRightClicked(true);
           }}>
        <Map
          center={center}
          zoom={zoom}
          defaultCenter={defaultCenter}
          defaultZoom={defaultProps.zoom}
          onBoundsChanged={(mapData) => {
            setPinSize(mapData.zoom);
            handleRightClick();
          }}
          onClick={(pointData) => {
            setMouseLatLng(pointData.latLng);
          }}>
          <ZoomControl/>

          {leftClicked && (
            // Left-click Marker
            <Marker width={50} anchor={mouseLatLng}
                    onClick={() => setRightClicked(true)}/>
          )}

          {circleRadius !== 0 && (
            // Search circle
            <Overlay key='mid-circle' anchor={circleLatLng}
                     offset={[circleRadius / 2 ** (19 - pinSize), circleRadius / 2 ** (19 - pinSize)]}>
              <Circle size={`${circleRadius * 2 / 2 ** (19 - pinSize)}px`} bg='teal.300'
                      opacity={0.3}/>
            </Overlay>
          )}

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
                    _focus={{boxShadow: 'none'}}/>
                </PopoverTrigger>
                <PopoverContent w='150px' alignItems='center'>
                  <PopoverArrow/>
                  <PopoverCloseButton/>
                  <PopoverBody>
                    <CafeCard cafe={cafe}/>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Overlay>))}


          {pins.map((loc: Location) => (
            <Marker key={loc.latitude} width={50} anchor={[loc.latitude, loc.longitude]}
                    color='red' onClick={onOpen}/>
          ))}
        </Map>
      </Box>

      {rightClicked && (
        <ContextMenu
          onAppendPin={() => handleAppendPin({
            latitude: mouseLatLng[0],
            longitude: mouseLatLng[1],
          })}
          onClear={clearPins}
          x={contextMenuPos.x}
          y={contextMenuPos.y}/>
      )}

      <Box style={{
        position: 'absolute',
        left: '30px',
        bottom: '30px',
        zIndex: 'sticky',
      }}>
        <Button onClick={onOpen} colorScheme='green' size='lg'>
          Open finder
        </Button>
      </Box>

      <Instructions/>

      <MiddleGdDrawer isOpen={isOpen} onClose={onClose} setCenter={handleCenter} onClear={clearPins}
                      locations={pins} drawCircle={handleCircle}/>
    </Box>
  )
}
