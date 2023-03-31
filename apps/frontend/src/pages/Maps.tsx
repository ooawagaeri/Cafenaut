import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Box } from '@chakra-ui/layout';
import { PigeonMap } from "../components/maps/PigeonMap";
import { getAllCafesPins } from "../services/api_service";

const Maps = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    getAllCafesPins().then((cafes) => setCafes(cafes));
  }, []);

  return (
    <Box>
      <Header/>
      <PigeonMap data={cafes}/>
    </Box>
  )
};

export default Maps;
