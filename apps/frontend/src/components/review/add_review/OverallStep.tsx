import { FormControl, FormLabel, Input, Box, Textarea } from '@chakra-ui/react';
// @ts-ignore

export function OverallStep({ setReview }: { setReview: any }) {
  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel>Review Title</FormLabel>
        <Input
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.title = e.target.value;
              return newReview;
            });
          }}
          type="vibe-free-text"
        />
        <FormLabel paddingTop={'2%'}>Overall Thoughts</FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.body = e.target.value;
              return newReview;
            });
          }}
        />
      </FormControl>
    </Box>
  );
}
