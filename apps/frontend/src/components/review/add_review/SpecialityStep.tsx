import {
  FormControl,
  FormLabel,
  Box,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function SpecialityStep({ setReview }: { setReview: any }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <Checkbox
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.speciality.present = e.target.checked;
              return newReview;
            });
          }}
          value="speciality"
        >
          Has Speciality?
        </Checkbox>
        <FormLabel paddingTop={'2%'}>
          Thoughts on Speciality (If applicable)
        </FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.aspects.speciality.free_text = e.target.value;
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
            newReview.aspects.speciality.sub_rating = newRating;
            return newReview;
          });
        }}
        size={30}
        activeColor="#ffd700"
      />
    </Box>
  );
}
