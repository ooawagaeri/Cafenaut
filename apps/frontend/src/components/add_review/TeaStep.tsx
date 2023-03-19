import {
  FormControl,
  FormLabel,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function TeaStep({ setReview }: { setReview: any }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel as="legend">Tea Leaves Selection</FormLabel>
        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.tea_leaves.black = e.target.checked;
                  return newReview;
                });
              }}
              value="Black"
            >
              Black
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.tea_leaves.green = e.target.checked;
                  return newReview;
                });
              }}
              value="Green"
            >
              Green
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.tea_leaves.oolong = e.target.checked;
                  return newReview;
                });
              }}
              value="Oolong"
            >
              Oolong
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.tea_leaves.pu_erh = e.target.checked;
                  return newReview;
                });
              }}
              value="Puerh"
            >
              Pu-erh
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.tea_leaves.white = e.target.checked;
                  return newReview;
                });
              }}
              value="White"
            >
              White
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <FormLabel paddingTop={'2%'} as="legend">
          Milk Selection
        </FormLabel>
        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.milk.low_fat = e.target.checked;
                  return newReview;
                });
              }}
              value="Lowfat"
            >
              Low-fat
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.milk.almond = e.target.checked;
                  return newReview;
                });
              }}
              value="Almond"
            >
              Almond
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.milk.oat = e.target.checked;
                  return newReview;
                });
              }}
              value="Oat"
            >
              Oat
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = { ...review };
                  newReview.aspects.tea.milk.soy = e.target.checked;
                  return newReview;
                });
              }}
              value="Soy"
            >
              Soy
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <FormLabel paddingTop={'2%'}>Thoughts on Tea</FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.tea.free_text = e.target.value;
              return newReview;
            });
          }}
          placeholder="Tea!"
        />
      </FormControl>
      <ReactStars
        count={5}
        onChange={(newRating: number) => {
          setReview((review: any) => {
            const newReview = { ...review };
            newReview.aspects.tea.sub_rating = newRating;
            return newReview;
          });
        }}
        size={30}
        activeColor="#ffd700"
      />
    </Box>
  );
}
