import { FormControl, FormLabel, Input, Box, Checkbox } from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let cuisineRating = 0;
const ratingChanged = (newRating: number) => {
  cuisineRating = newRating;
};

export const cuisine = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <Checkbox value="food">Food option</Checkbox>
      <FormLabel paddingTop={'2%'}>
        Thoughts on Cuisine (If applicable)
      </FormLabel>
      <Input type="cuisine-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
