import React, { useEffect, useState } from 'react'
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps'
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
  PopoverTrigger,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import CafePin from './CafePin';
import ContextMenu from "./ContextMenu";
import { CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { Location } from 'apps/backend/src/middle-ground/location.interface';
import { MiddleGdDrawer } from "./MiddleGdDrawer";
import { useNavigate } from "react-router-dom";

const defaultProps = {
  center: {
    latitude: 1.2805134083679626,
    longitude: 103.8447570537589
  },
  zoom: 15
}

interface Type {
  data: CafePinModel[]
}

export function PigeonMap({data}: Type) {
  const [pinSize, setPinSize] = useState(defaultProps.zoom);
  const [mouseLatLong, setMouseLatLong] = useState([0, 0]);
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialState: Location[] = [];
  const [locations, setLocations] = useState(initialState);

  const handleRightClick = () => setRightClicked(false);
  const handleAppendLoc = (loc: Location) => {
    for (const item of locations) {
      if (item.latitude === loc.latitude && item.longitude === loc.longitude) {
        return;
      }
    }
    setLocations(current => [...current, loc]);
    onOpen();
  };
  const clearPins = () => setLocations(initialState);

  const navigate = useNavigate();

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
          defaultCenter={[defaultProps.center.latitude, defaultProps.center.longitude]}
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
            <Marker width={50} anchor={[mouseLatLong[0], mouseLatLong[1]]} onClick={() => setRightClicked(true)}/>
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
                  {cafe.logo && (
                    <Image src={cafe.logo} maxHeight='50px' maxWidth='100px' marginTop='9px'/>
                  )}
                  <PopoverHeader textAlign='center'>{cafe.name}</PopoverHeader>
                  <PopoverBody>
                    <Box display='flex' justifyContent='center'>
                      <ReactStars
                        count={5}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className='far fa-star'></i>}
                        halfIcon={<i className='fa fa-star-half-alt'></i>}
                        fullIcon={<i className='fa fa-star'></i>}
                        activeColor='#ffd700'
                        value={cafe.rating.unweighted}
                        edit={false}/>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                      <Tooltip label='Authenticity %' placement='right'>
                        <CircularProgress value={cafe.authenticity * 100}>
                          <CircularProgressLabel>{Math.round(cafe.authenticity * 100)}%</CircularProgressLabel>
                        </CircularProgress>
                      </Tooltip>
                    </Box>
                    <Box textAlign='center'>
                      <Tooltip label='Total no. of reviews' placement='right'>
                        <Text>Reviews: {cafe.popularity}</Text>
                      </Tooltip>
                    </Box>
                    <Button
                      mt={4}
                      colorScheme='blue'
                      onClick={() => navigate(`/cafe/${cafe.id}`, { state: cafe })}
                    >
                      Visit cafe!
                    </Button>
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
          onClick={() => handleAppendLoc({
            latitude: mouseLatLong[0],
            longitude: mouseLatLong[1],
          })}
          x={points.x}
          y={points.y}/>
      )}

      <MiddleGdDrawer isOpen={isOpen} onClose={onClose} clear={clearPins} locations={locations}/>
    </Box>
  )
}
