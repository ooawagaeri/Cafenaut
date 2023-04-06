import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Box } from '@chakra-ui/react';

import Header from '../common/Header';
import { getAllReviews } from '../services/api_service';
import UserContext from '../common/UserContext';
import SearchBar from '../components/search/SearchBar';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import ReviewList from "../components/review/ReviewList";

export function Explore() {
  const {userDetails, setUserDetails} = useContext(UserContext);
  const [postedReview, setPostedReview] = useState(false);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  async function getReviews() {
    await getAllReviews().then((reviews) => setReviews(reviews));
  }

  useEffect(() => {
    getReviews();
  }, [postedReview, userDetails]);

  return (
    <Box>
      <Header setPostedReview={setPostedReview}/>
      <Card>
        <CardBody>
          <SearchBar setReviews={(reviews) => setReviews(reviews)}/>
        </CardBody>
      </Card>
      <ReviewList reviews={reviews} subText={'No such review(s) found!'}/>
    </Box>
  );
}
