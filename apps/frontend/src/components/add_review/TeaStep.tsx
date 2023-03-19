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

let teaRating = 0;
const ratingChanged = (newRating: number) => {
  teaRating = newRating;
};

export const tea = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <FormLabel as="legend">Tea Leaves Selection</FormLabel>
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="Black">Black</Checkbox>
          <Checkbox value="Green">Green</Checkbox>
          <Checkbox value="Oolong">Oolong</Checkbox>
          <Checkbox value="Puerh">Pu-erh</Checkbox>
          <Checkbox value="White">White</Checkbox>
        </Stack>
      </CheckboxGroup>
      <FormLabel paddingTop={'2%'} as="legend">
        Milk Selection
      </FormLabel>
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="Lowfat">Low-fat</Checkbox>
          <Checkbox value="Almond">Almond</Checkbox>
          <Checkbox value="Oat">Oat</Checkbox>
          <Checkbox value="Soy">Soy</Checkbox>
        </Stack>
      </CheckboxGroup>
      <FormLabel paddingTop={'2%'}>Thoughts on Tea</FormLabel>
      <Input type="tea-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
