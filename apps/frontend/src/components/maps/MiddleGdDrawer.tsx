import {
  Button, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay, Stack, StackDivider, Text
} from "@chakra-ui/react";
import React from "react";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Location } from "../../../../backend/src/middle-ground/location.interface";

export function MiddleGdDrawer(props: {isOpen: boolean, onClose: () => void, clear: () => void, locations: Location[]}) {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement='right'
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Middle-ground Finder</DrawerHeader>

        <DrawerBody>
          <Stack divider={<StackDivider/>} spacing='2'>
            {props.locations.map((location) => (
              <Text key={location.latitude + ',' + location.longitude} pt='2' fontSize='sm'>
                ({location.latitude}, {location.longitude})
              </Text>
            ))}
          </Stack>
        </DrawerBody>

        <DrawerFooter borderBottomWidth='1px'>
          <Button variant='outline' mr={3} onClick={props.clear}>
            Clear all pins
          </Button>
          <Button colorScheme='blue'>Calculate</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
