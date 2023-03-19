import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let ambienceRating = 0;
const ratingChanged = (newRating: number) => {
  ambienceRating = newRating;
};

export const ambience = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <Checkbox value="alfresco">Alfresco option</Checkbox>
      <FormLabel paddingTop={'2%'}>Vibes</FormLabel>
      <Input type="vibe-free-text" />
      <FormLabel paddingTop={'2%'}>Lighting</FormLabel>
      <Input type="lighting-free-text" />
      <FormLabel paddingTop={'2%'}>Thoughts on Ambience</FormLabel>
      <Input type="ambience-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
