import { FormControl, FormLabel, Input, Box, Checkbox } from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let petRating = 0;
const ratingChanged = (newRating: number) => {
  petRating = newRating;
};

export const pet = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <Checkbox value="pet">Pet Friendly?</Checkbox>
      <FormLabel paddingTop={'2%'}>Thoughts on Pet-Friendliness</FormLabel>
      <Input type="pet-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
