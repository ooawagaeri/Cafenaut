import { FormControl, FormLabel, Input, Box, Checkbox } from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let amenitiesRating = 0;
const ratingChanged = (newRating: number) => {
  amenitiesRating = newRating;
};

export const amenities = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <FormLabel>Thoughts on Amenities</FormLabel>
      <Input type="amenities-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
