import {
  FormControl,
  FormLabel,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function CoffeeStep({setReview, isAdd}: { setReview: any, isAdd: boolean }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel as="legend">Coffee Beans Selection</FormLabel>
        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.beans.arabica = e.target.checked;
                  return newReview;
                });
              }}
              value="arabica"
            >
              Arabica
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.beans.excelsa = e.target.checked;
                  return newReview;
                });
              }}
              value="excelsa"
            >
              Excelsa
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.beans.liberica = e.target.checked;
                  return newReview;
                });
              }}
              value="liberica"
            >
              Liberica
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.beans.robusta = e.target.checked;
                  return newReview;
                });
              }}
              value="robusta"
            >
              Robusta
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
                  const newReview = {...review};
                  newReview.aspects.coffee.milk.low_fat = e.target.checked;
                  return newReview;
                });
              }}
              value="low_fat"
            >
              Low-fat
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.milk.almond = e.target.checked;
                  return newReview;
                });
              }}
              value="almond"
            >
              Almond
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.milk.oat = e.target.checked;
                  return newReview;
                });
              }}
              value="oat"
            >
              Oat
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.milk.soy = e.target.checked;
                  return newReview;
                });
              }}
              value="soy"
            >
              Soy
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <Checkbox
          colorScheme="green"
          paddingTop="3%"
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = {...review};
              newReview.aspects.coffee.non_caffeinated = e.target.checked;
              return newReview;
            });
          }}
          value="Caffeine"
        >
          Caffeine-free Option
        </Checkbox>
        {isAdd && (
          <><FormLabel paddingTop={'2%'}>Thoughts on Coffee</FormLabel>
            <Textarea
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.coffee.free_text = e.target.value;
                  return newReview;
                });
              }}
              placeholder="Coffee!"
            /></>
        )}
      </FormControl>
      {isAdd && (
        <ReactStars
          count={5}
          onChange={(newRating: number) => {
            setReview((review: any) => {
              const newReview = {...review};
              newReview.aspects.coffee.sub_rating = newRating;
              return newReview;
            });
          }}
          size={30}
          activeColor="#ffd700"
        />
      )}
    </Box>
  );
}
