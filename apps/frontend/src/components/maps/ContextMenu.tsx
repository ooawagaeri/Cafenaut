import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";

const ContextMenu = (props: { onClickPin: () => void, onClickOpen: () => void, x: number, y: number }) => {
  return (
    <Box style={{
      position: 'absolute',
      left: `${props.x}px`,
      top: `${props.y}px`,
      zIndex: "sticky"
    }}>
      <Stack spacing='3px'>
        <Button onClick={props.onClickPin}>
          Add to pin
        </Button>
        <Button onClick={props.onClickOpen}>
          Open finder
        </Button>
      </Stack>
    </Box>
  );
};
export default ContextMenu;
