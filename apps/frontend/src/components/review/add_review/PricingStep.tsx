import {
  FormControl,
  FormLabel,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function PricingStep({ setReview }: { setReview: any }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel as="legend">Special discounts</FormLabel>
        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.price.student = e.target.checked;
                  return newReview;
                });
              }}
              value="student"
            >
              Student
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.price.elderly = e.target.checked;
                  return newReview;
                });
              }}
              value="elderly"
            >
              Elderly
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <FormLabel paddingTop={'2%'}>Average Price($)</FormLabel>
        <NumberInput
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.price.avg_price = e;
              return newReview;
            });
          }}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel paddingTop={'2%'}>Thoughts on Price</FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.price.free_text = e.target.value;
              return newReview;
            });
          }}
        />
      </FormControl>
      <ReactStars
        count={5}
        onChange={(newRating: number) => {
          setReview((review: any) => {
            const newReview = { ...review };
            newReview.aspects.price.sub_rating = newRating;
            return newReview;
          });
        }}
        size={30}
        activeColor="#ffd700"
      />
    </Box>
  );
}
