import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

import Header from '../../common/Header';
import { useState, useEffect } from 'react';
import { getCafeReviews } from '../../services/api_service';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { ReviewList } from '../review/ReviewList';

export function Cafe() {
  const { state } = useLocation();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    await getCafeReviews(state['id']).then((reviews) => setReviews(reviews));
  }

  return (
    <Box>
      <Header />
      <Flex paddingTop={'5%'} paddingLeft={'10%'} paddingRight={'10%'}>
        <Box w="70%" padding={'1%'}>
          <Card>
            <CardHeader>
              <Heading>{state['name']}</Heading>
            </CardHeader>
            <CardBody>
              {state['logo'] && (
                <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} position="relative">
                  <Image src={state['logo']} />
                </Box>
              )}
              <ReactStars
                count={5}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                value={state['rating']['unweighted']}
                edit={false}
              />
            </CardBody>
          </Card>
        </Box>
        <Box w="130%" padding={'1%'}>
          <Card>
            <CardHeader>
              <Heading>Reviews for {state['name']}</Heading>
            </CardHeader>
            <CardBody>
              {reviews.length > 0 ? (
                reviews.map((review: ReviewModel, index) => (
                  <ReviewList key={index} review={review}></ReviewList>
                ))
              ) : (
                <Text>No Reviews for this Cafe 😔</Text>
              )}
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
