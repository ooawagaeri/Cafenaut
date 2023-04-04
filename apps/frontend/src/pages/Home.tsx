import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Text, Box } from '@chakra-ui/react';

import Header from '../common/Header';
import { auth } from '../services/firebase';
import { ReviewList } from '../components/review/ReviewList';
import { getAllReviews, getFollowingReviews } from '../services/api_service';
import UserContext from '../common/UserContext';

export function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [postedReview, setPostedReview] = useState(false);

  const fetchFromBackend = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const options = {
      method: 'GET',
      headers: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Authorization: 'Bearer ' + user?.accessToken,
        Accept: 'application/json',
        'Content-Type': '*/*',
      },
    };
    fetch('/api/user', options)
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results);
        localStorage.setItem('user', JSON.stringify(results));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
    fetchFromBackend();
  }, [user, loading]);

  const [reviews, setReviews] = useState([]);

  async function getReviews() {
    if (
      userDetails.following !== undefined &&
      userDetails.following.length > 0
    ) {
      const include_own: string[] = [...userDetails.following]
      include_own.push(userDetails.uid);
      await getFollowingReviews(include_own).then((reviews) =>
        setReviews(reviews)
      );
    } else {
      await getAllReviews().then((reviews) => setReviews(reviews));
    }
  }

  useEffect(() => {
    getReviews();
  }, [postedReview, userDetails]);

  return (
    <Box>
      <Header setPostedReview={setPostedReview} />
      {(userDetails.following === undefined ||
        userDetails.following.length === 0) && (
        <Card>
          <CardBody>
            <Text align={'center'}>
              You are not following anyone yet, so we are showing you reviews
              posted by the community! 😁
            </Text>
          </CardBody>
        </Card>
      )}
      {reviews.map((review, index) => (
        <ReviewList key={index} review={review}></ReviewList>
      ))}
    </Box>
  );
}
