import React, { useEffect, useState } from 'react'
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps'
import {
  Box,
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
import ContextMenu from "./ContextMenu";
import { CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { Location } from 'apps/backend/src/middle-ground/location.interface';
import { MiddleGdDrawer } from "./MiddleGdDrawer";
import { CafeFound } from "./CafeFound";

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
  const [mouseLatLong, setMouseLatLong] = useState([0, 0]);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const initialState: Location[] = [];
  const [locations, setLocations] = useState(initialState);
  const handleAppendPin = (loc: Location) => {
    for (const item of locations) {
      if (item.latitude === loc.latitude && item.longitude === loc.longitude) {
        return;
      }
    }
    setLocations(current => [...current, loc]);
  };
  const clearPins = () => setLocations(initialState);

  useEffect(() => {
    window.addEventListener("click", handleRightClick);
    return () => {
      window.removeEventListener("click", handleRightClick);
    };
  }, []);

  return (
    <Box>
      <Box h='calc(92.2vh)'
           onClick={(e) => {
             e.preventDefault();
             setLeftClicked(true);
             setPoints({
               x: e.pageX,
               y: e.pageY,
             });
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
            setMouseLatLong(pointData.latLng);
          }}>
          <ZoomControl/>

          {leftClicked && (
            // Left-click Marker
            <Marker width={50} anchor={[mouseLatLong[0], mouseLatLong[1]]}
                    onClick={() => setRightClicked(true)}/>
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
                    <CafeFound cafe={cafe}/>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Overlay>))}


          {locations.map((loc: Location) => (
            <Marker key={loc.latitude} width={50} anchor={[loc.latitude, loc.longitude]}
                    color='red' onClick={onOpen}/>
          ))}
        </Map>
      </Box>

      {rightClicked && (
        <ContextMenu
          onClickPin={() => handleAppendPin({
            latitude: mouseLatLong[0],
            longitude: mouseLatLong[1],
          })}
          onClickOpen={onOpen}
          x={points.x}
          y={points.y}/>
      )}

      <MiddleGdDrawer isOpen={isOpen} onClose={onClose} setCenter={handleCenter} clear={clearPins}
                      locations={locations}/>
    </Box>
  )
}
