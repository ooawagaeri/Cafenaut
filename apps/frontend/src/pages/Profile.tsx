import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Image,
  Text,
  Card,
  CardBody,
  CardHeader,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../common/Header';
import { User } from '../../../backend/src/user/user.interface';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { Review } from '../components/review/Review';
import {
  followUser,
  getUserDetail,
  getUserReviews,
  unfollowUser,
} from '../services/api_service';
import { Classification } from '../../../backend/src/classifier/classification.interface';
import UserContext from '../common/UserContext';
import { Users } from '../components/profile/Users';

export function Profile() {
  const { state } = useLocation();
  const [reviews, setReviews] = useState([]);
  const [postedReview, setPostedReview] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [user, setUser] = useState<User>({
    uid: '',
    email: '',
    name: '',
    following: [],
    followers: [],
    classification: 0,
  });
  const toast = useToast();
  const {
    isOpen: isFollowingOpen,
    onOpen: onFollowingOpen,
    onClose: onFollowingClose,
  } = useDisclosure();
  const {
    isOpen: isFollowersOpen,
    onOpen: onFollowersOpen,
    onClose: onFollowersClose,
  } = useDisclosure();

  const follow = () => {
    followUser(userDetails.uid, state.uid).then(() =>
      getUserDetail(userDetails.uid).then((result) => {
        setUserDetails(result);
        localStorage.setItem('user', JSON.stringify(result));
      })
    );
    toast({
      title: 'Followed!',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const unfollow = () => {
    unfollowUser(userDetails.uid, state.uid).then(() =>
      getUserDetail(userDetails.uid).then((result) => {
        setUserDetails(result);
        localStorage.setItem('user', JSON.stringify(result));
      })
    );
    toast({
      title: 'Unfollowed',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (state === null) {
      // own profile
      setUser(userDetails);
    } else {
      getDetails(state.uid);
    }
  }, [state, userDetails]);

  const getDetails = async (uid: string) => {
    await getUserDetail(uid).then((user) => setUser(user));
  };

  useEffect(() => {
    getReviews(user.uid);
  }, [postedReview, user]);

  async function getReviews(uid: string) {
    await getUserReviews(uid).then((reviews) => setReviews(reviews));
  }

  return (
    <Box>
      <Header />

      <Modal isOpen={isFollowingOpen} onClose={onFollowingClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Users
              users_uid={user.following ? user.following : []}
              onClose={onFollowingClose}
            ></Users>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onFollowingClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isFollowersOpen} onClose={onFollowersClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Users
              users_uid={user.followers ? user.followers : []}
              onClose={onFollowersClose}
            ></Users>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onFollowersClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Center py={6}>
        <Box
          maxW={'60%'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              name={user.name}
              size={'xl'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {user.name}
              </Heading>
              {Classification[user.classification] === 'CASUAL_COFFEE' && (
                <Text color={'gray.500'}>☕️ Casual Coffee</Text>
              )}
              {Classification[user.classification] === 'CONNOISSEUR_COFFEE' && (
                <Text color={'gray.500'}>☕️ Coffee Connoisseur</Text>
              )}
              {Classification[user.classification] === 'CASUAL_TEA' && (
                <Text color={'gray.500'}>🫖 Casual Tea</Text>
              )}
              {Classification[user.classification] === 'CONNOISSEUR_TEA' && (
                <Text color={'gray.500'}>🫖 Tea Connoisseur</Text>
              )}
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack
                onClick={() => onFollowingOpen()}
                cursor={'pointer'}
                spacing={0}
                align={'center'}
              >
                <Text fontWeight={600}>
                  {user.following ? user.following.length : 0}
                </Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Following
                </Text>
              </Stack>
              <Stack
                onClick={() => onFollowersOpen()}
                cursor={'pointer'}
                spacing={0}
                align={'center'}
              >
                <Text fontWeight={600}>
                  {user.followers ? user.followers.length : 0}
                </Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
            </Stack>

            {state !== null &&
              state.uid !== userDetails.uid &&
              (userDetails.following === undefined ||
                !userDetails.following.includes(state.uid)) && (
                <Button
                  w={'full'}
                  mt={8}
                  colorScheme="blue"
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  onClick={() => follow()}
                >
                  + Follow
                </Button>
              )}

            {state !== null &&
              userDetails.following !== undefined &&
              userDetails.following.includes(state.uid) && (
                <Button
                  w={'full'}
                  mt={8}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  colorScheme="red"
                  onClick={() => unfollow()}
                >
                  Unfollow
                </Button>
              )}
          </Box>
        </Box>
      </Center>

      <Center py={6}>
        <Box w={'60%'}>
          <Card>
            <CardHeader>
              <Heading>Reviews posted by {user.name}</Heading>
            </CardHeader>
            <CardBody>
              {reviews.length > 0 ? (
                reviews.map((review: ReviewModel, index) => (
                  <Review key={index} review={review}></Review>
                ))
              ) : (
                <Text>{user.name} has not posted any reviews 😔</Text>
              )}
            </CardBody>
          </Card>
        </Box>
      </Center>
    </Box>
  );
}
