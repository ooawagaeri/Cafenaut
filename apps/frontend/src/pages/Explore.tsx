import { Box } from '@chakra-ui/layout';
import React from 'react';
import Header from '../common/Header';
import { PigeonMapComponent } from "../components/maps/PigeonMapComponent";

const Explore = () => {
  return (
    <Box>
      <Header/>
      <PigeonMapComponent/>
    </Box>
  )
};

export default Explore;
