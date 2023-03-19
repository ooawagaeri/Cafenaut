import { FormControl, FormLabel, Input, Box, Checkbox } from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let specialityRating = 0;
const ratingChanged = (newRating: number) => {
    specialityRating = newRating;
};

export const speciality = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <Checkbox value="speciality">Has Speciality</Checkbox>
      <FormLabel paddingTop={'2%'}>
        Thoughts on Speciality (If applicable)
      </FormLabel>
      <Input type="speciality-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
