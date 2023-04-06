import { Box, Center, Text } from "@chakra-ui/react";
import { ReviewModel } from "apps/backend/src/review/review.interface";
import { Review } from "./Review";

export default function ReviewList({reviews, subText} : { reviews: ReviewModel[], subText: string }) {
  return (
    <Center>
      <Box w={'70%'}>
        {reviews.length > 0 ? (
          reviews.map((review: ReviewModel, index) => (
            <Review key={index} review={review}></Review>
          ))
        ) : (
          <Center p='20px'>
            <Text>{subText}</Text>
          </Center>
        )}
      </Box>
    </Center>
  )
}
