import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let workFriendlyRating = 0;
const ratingChanged = (newRating: number) => {
  workFriendlyRating = newRating;
};

export const workFriendly = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <FormLabel as="legend">Availability</FormLabel>
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="charging">Charging ports</Checkbox>
          <Checkbox value="wifi">WiFi</Checkbox>
        </Stack>
      </CheckboxGroup>
      <FormLabel paddingTop={'2%'}>
        Thoughts on Working/Studying in the Cafe
      </FormLabel>
      <Input type="work-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
