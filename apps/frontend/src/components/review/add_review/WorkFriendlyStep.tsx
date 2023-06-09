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

export function WorkFriendlyStep({setReview, isAdd}: { setReview: any, isAdd: boolean }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel as="legend">Availability</FormLabel>
        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.work_friendly.charging_ports =
                    e.target.checked;
                  return newReview;
                });
              }}
              value="charging"
            >
              Charging ports
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setReview((review: any) => {
                  const newReview = {...review};
                  newReview.aspects.work_friendly.wifi = e.target.checked;
                  return newReview;
                });
              }}
              value="wifi"
            >
              WiFi
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        {isAdd && (
          <><FormLabel paddingTop={'2%'}>
            Thoughts on Working/Studying in the Cafe
          </FormLabel><Textarea
            onChange={(e) => {
              setReview((review: any) => {
                const newReview = {...review};
                newReview.aspects.work_friendly.free_text = e.target.value;
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
              newReview.aspects.work_friendly.sub_rating = newRating;
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
