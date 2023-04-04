import {
  FormControl,
  FormLabel,
  Box,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function PetStep({setReview, isAdd}: { setReview: any, isAdd: boolean }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <Checkbox
          colorScheme="green"
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = {...review};
              newReview.aspects.pet.friendly = e.target.checked;
              return newReview;
            });
          }}
          value="pet"
        >
          Pet Friendly?
        </Checkbox>
        {isAdd && (
          <><FormLabel paddingTop={'2%'}>Thoughts on Pet-Friendliness</FormLabel><Textarea
            onChange={(e) => {
              setReview((review: any) => {
                const newReview = {...review};
                newReview.aspects.pet.free_text = e.target.value;
                return newReview;
              });
            }}/></>
        )}
      </FormControl>
      {isAdd && (
        <ReactStars
          count={5}
          onChange={(newRating: number) => {
            setReview((review: any) => {
              const newReview = {...review};
              newReview.aspects.pet.sub_rating = newRating;
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
