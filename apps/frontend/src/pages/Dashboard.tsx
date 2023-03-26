import { Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { auth, logout } from '../services/firebase';
import { ReviewList } from '../components/review/ReviewList';
import { getAllReviews } from '../services/api_service';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

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
        setName(results.name);
        localStorage.setItem('user', JSON.stringify(results));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    // fetchUserName();
    fetchFromBackend();
  }, [user, loading]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  // TODO: Change to view followers reviews, then move all reviews to an "Explore" tab
  async function getReviews() {
    await getAllReviews().then((reviews) => setReviews(reviews));
  }

  return (
    <Box>
      <Header />
      {reviews.map((review, index) => (
        <ReviewList key={index} review={review}></ReviewList>
      ))}
    </Box>
  );
}

export default Dashboard;
