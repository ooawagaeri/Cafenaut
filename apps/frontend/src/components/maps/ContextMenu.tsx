import React from "react";
import { Box, Button } from "@chakra-ui/react";

const ContextMenu = (props: { onClick: () => void, x: number, y: number }) => {
  return (
    <Box style={{
      position: 'absolute',
      left: `${props.x}px`,
      top: `${props.y}px`,
      zIndex: "sticky"
    }}>
      <Button onClick={props.onClick}>
        Add to middle ground finder
      </Button>
    </Box>
  );
};
export default ContextMenu;
