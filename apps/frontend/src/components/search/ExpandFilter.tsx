import { Button, Collapse, useDisclosure } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function ExpandFilter({name, child}: { name: string, child: ReactElement }) {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <>
      <Button colorScheme='teal' variant='outline' onClick={onToggle} m='5px'>{name}</Button>
      <Collapse
        in={isOpen} animateOpacity>
        {child}
      </Collapse>
    </>
  )
}
