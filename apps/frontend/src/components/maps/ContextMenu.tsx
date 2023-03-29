import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

const ContextMenu = (props: { onAppendPin: () => void, onClear: () => void, x: number, y: number }) => {
  return (
    <Box style={{
      position: 'absolute',
      left: `${props.x}px`,
      top: `${props.y}px`,
      zIndex: 'sticky'
    }}>
      <Stack spacing='3px'>
        <Button onClick={props.onAppendPin}>
          Add finder pin
        </Button>
        <Button onClick={props.onClear}>
          Clear pins
        </Button>
      </Stack>
    </Box>
  );
};
export default ContextMenu;
