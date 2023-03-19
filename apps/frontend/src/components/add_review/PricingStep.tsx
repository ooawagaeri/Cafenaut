import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

let pricingRating = 0;
const ratingChanged = (newRating: number) => {
  pricingRating = newRating;
};

export const pricing = (
  <Box padding="5%">
    <FormControl as="fieldset">
      <FormLabel as="legend">Special discounts</FormLabel>
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="student">Student</Checkbox>
          <Checkbox value="elderly">Elderly</Checkbox>
        </Stack>
      </CheckboxGroup>
      <FormLabel paddingTop={'2%'}>Average Price($)</FormLabel>
      <NumberInput min={1} defaultValue={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormLabel paddingTop={'2%'}>Thoughts on Price</FormLabel>
      <Input type="price-free-text" />
    </FormControl>
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      activeColor="#ffd700"
    />
  </Box>
);
