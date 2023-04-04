import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { Location } from 'apps/backend/src/middle-ground/location.interface';
import { getMiddleGround } from '../../services/api_service';
import { CafeCard } from './CafeCard';

export function MiddleGdDrawer(props: { isOpen: boolean, onClose: () => void, setCenter: (newCenter: [number, number]) => void, onClear: () => void, drawCircle: (loc: [number, number], radius: number) => void, locations: Location[] }) {
  const [cafes, setCafes] = useState<CafePinModel[]>([]);

  const handleMid = async () => {
    const data = await getMiddleGround(props.locations);
    if (data === undefined || data === null) {
      console.error('Insufficient pins');
      return;
    }
    const newCenter: [number, number] = [data.midpoint.latitude, data.midpoint.longitude];
    setCafes(data.cafes);
    props.setCenter(newCenter);
    props.drawCircle(newCenter, data.radius);
  }

  return (
    <Drawer
      isOpen={props.isOpen}
      placement='right'
      onClose={props.onClose}
    >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader borderBottomWidth='1px'>Middle-ground Finder</DrawerHeader>

        <DrawerBody>
          <Heading as='h4' size='sm'>Pin Locations:</Heading>
          <Stack spacing='3px'>
            {props.locations.map((location) => (
              <Text key={location.latitude + ',' + location.longitude} pt='2' fontSize='sm'>
                Lat: {location.latitude}<br/>
                Lng: {location.longitude}
              </Text>
            ))}
          </Stack>
        </DrawerBody>

        {cafes.length > 0 &&
          <DrawerBody>
            <Heading as='h4' size='sm'>Cafes Found:</Heading>
            <Stack divider={<StackDivider/>} spacing='2'>
              {cafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe}/>
              ))}
            </Stack>
          </DrawerBody>
        }

        <DrawerFooter borderBottomWidth='1px'>
          <Button variant='outline' mr={3} onClick={props.onClear}>
            Clear all pins
          </Button>
          <Button colorScheme='blue' onClick={handleMid}>Calculate</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
