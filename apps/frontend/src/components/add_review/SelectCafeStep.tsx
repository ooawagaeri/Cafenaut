import { FormControl, FormLabel, Select, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { CafeModel } from '../../../../backend/src/cafe/cafe.interface';
import { getCafes } from '../../services/api_service';

export function SelectCafe({ setReview }: { setReview: any }) {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    getAllCafes();
  }, []);

  async function getAllCafes() {
    await getCafes().then((cafes) => setCafes(cafes));
  }

  return (
    <Box padding="5%">
      <FormControl>
        <FormLabel>Cafe</FormLabel>
        <Select
          onChange={(e) => {
            setReview((review: any) => {
              const cafe: CafeModel = cafes.filter(
                (cafe: CafeModel) => cafe.name == e.target.value
              )[0];
              const newReview = { ...review };
              newReview.cafe_id = cafe.id;
              return newReview;
            });
          }}
          placeholder="Select cafe"
        >
          {cafes.map((cafe: CafeModel, index) => (
            <option key={index}>{cafe.name}</option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
