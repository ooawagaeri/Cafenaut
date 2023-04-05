import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

import Header from '../../common/Header';
import { getCafeReviews } from '../../services/api_service';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { ReviewList } from '../review/ReviewList';
import { Classification } from 'apps/backend/src/classifier/classification.interface';
import { Ratings } from 'apps/backend/src/rating/rating.interface';
import UserContext from '../../common/UserContext';
import Authenticity from "../authenticity-senti/Authenticity";

export function Cafe() {
  const {userDetails, setUserDetails} = useContext(UserContext);
  const {state} = useLocation();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    await getCafeReviews(state['id']).then((reviews) => setReviews(reviews));
  }

  return (
    <Box>
      <Header/>
      <Flex paddingTop={'5%'} paddingLeft={'10%'} paddingRight={'10%'} alignContent={"center"}
            justifyContent={"center"}>
        <Box w={'30%'} padding={'1%'}>
          <Card>
            <CardHeader>
              <Heading>{state['name']}</Heading>
            </CardHeader>
            <CardBody>
              {state['logo'] && (
                <Center
                  bg={'gray.100'}
                  mt={-5}
                  mx={-5}
                  mb={5}
                  position="relative"
                  maxH={'300px'}
                >
                  <Image src={state['logo']}/>
                </Center>
              )}
              <ReactStars
                count={5}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                value={
                  state['rating'][
                    Classification[
                      userDetails.classification
                      ].toLowerCase() as keyof Ratings
                    ]
                }
                edit={false}
              />
            </CardBody>
          </Card>
        </Box>
        <Box w={'60%'} padding={'1%'}>
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
