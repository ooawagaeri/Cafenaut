import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Box } from '@chakra-ui/layout';
import { PigeonMapComponent } from "../components/maps/PigeonMapComponent";
import { getAllCafesPins } from "../services/api_service";

const Explore = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    getAllCafesPins().then((cafes) => setCafes(cafes));
  }, []);

  return (
    <Box>
      <Header/>
      <PigeonMapComponent data={cafes}/>
    </Box>
  )
};

export default Explore;
