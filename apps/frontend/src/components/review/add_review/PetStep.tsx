import {
  FormControl,
  FormLabel,
  Box,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function PetStep({ setReview }: { setReview: any }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <Checkbox
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.pet.friendly = e.target.checked;
              return newReview;
            });
          }}
          value="pet"
        >
          Pet Friendly?
        </Checkbox>
        <FormLabel paddingTop={'2%'}>Thoughts on Pet-Friendliness</FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.pet.free_text = e.target.value;
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
            newReview.aspects.pet.sub_rating = newRating;
            return newReview;
          });
        }}
        size={30}
        activeColor="#ffd700"
      />
    </Box>
  );
}
