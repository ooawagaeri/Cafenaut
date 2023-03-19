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

let coffeeRating = 0;
const ratingChanged = (newRating: number) => {
  coffeeRating = newRating;
};

export const coffee = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <FormLabel as="legend">Coffee Beans Selection</FormLabel>
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="Arabica">Arabica</Checkbox>
          <Checkbox value="Excelsa">Excelsa</Checkbox>
          <Checkbox value="Liberica">Liberica</Checkbox>
          <Checkbox value="Robusta">Robusta</Checkbox>
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
      <FormLabel paddingTop={'2%'}>Thoughts on Coffee</FormLabel>
      <Input type="coffee-free-text" />
    </FormControl>

    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
