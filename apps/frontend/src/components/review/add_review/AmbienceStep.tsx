import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

export function AmbienceStep({setReview, isAdd}: { setReview: any, isAdd: boolean }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <Checkbox
          colorScheme="green"
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = {...review};
              newReview.aspects.ambience.alfresco = e.target.checked;
              return newReview;
            });
          }}
          value="alfresco"
        >
          Alfresco option
        </Checkbox>
        {isAdd && (
          <><FormLabel paddingTop={'2%'}>Vibes</FormLabel>
            <Input
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.ambience.vibe = e.target.value;
                  return newReview;
                });
              }}
              type="vibe-free-text"
            />
            <FormLabel paddingTop={'2%'}>Lighting</FormLabel>
            <Input
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.ambience.lighting = e.target.value;
                  return newReview;
                });
              }}
              type="lighting-free-text"
            /><FormLabel paddingTop={'2%'}>Thoughts on Ambience</FormLabel><Textarea
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.ambience.free_text = e.target.value;
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
              newReview.aspects.ambience.sub_rating = newRating;
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
