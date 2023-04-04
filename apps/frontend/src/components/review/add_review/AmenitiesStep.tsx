import { FormControl, FormLabel, Box, Textarea } from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function AmenitiesStep({ setReview }: { setReview: any }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel>Thoughts on Amenities provided in the Cafe</FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.amenities.free_text = e.target.value;
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
            newReview.aspects.amenities.sub_rating = newRating;
            return newReview;
          });
        }}
        size={30}
        activeColor="#ffd700"
      />
    </Box>
  );
}
