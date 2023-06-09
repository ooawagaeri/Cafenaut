import {
  Center,
  useColorModeValue,
  Stack,
  Heading,
  Avatar,
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { Classification } from 'apps/backend/src/classifier/classification.interface';
import { Ratings } from 'apps/backend/src/rating/rating.interface';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import UserContext from '../../common/UserContext';
import { followUser, getUserDetail } from '../../services/api_service';
import { ReviewCard } from './ReviewCard';
import Authenticity from '../authenticity-senti/Authenticity';
import Sentiment from '../authenticity-senti/Sentiment';
import { ImageSlider } from './ImageSlider';

export function Review({ review }: { review: ReviewModel }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const toast = useToast();

  const follow = () => {
    followUser(userDetails.uid, review.user_uid).then(() =>
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

  const userClass =
    Classification[userDetails.classification] === undefined
      ? 'unweighted'
      : Classification[userDetails.classification];
  const ratingKey = review.rating[userClass.toLowerCase() as keyof Ratings];

  return (
    <Center py={6}>
      <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewCard review={review}></ReviewCard>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={'16px'} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        maxW={'70%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        cursor={'pointer'}
      >
        <ImageSlider images={review.image_url}></ImageSlider>
        <Flex>
          <ReactStars
            count={5}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            value={ratingKey}
            edit={false}
          />
          <Spacer />
          {userDetails.uid !== review.user_uid &&
            (userDetails.following === undefined ||
              !userDetails.following.includes(review.user_uid)) && (
              <Button
                colorScheme="green"
                onClick={() => follow()}
                variant="ghost"
                size="md"
              >
                + Follow {review.user_name}
              </Button>
            )}
        </Flex>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
            onClick={onOpen}
          >
            {review.cafe_name}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            onClick={onOpen}
          >
            {review.title}
          </Heading>
          <Text color={'gray.500'} onClick={onOpen}>
            {review.body}
          </Text>
        </Stack>
        <Stack
          mt={6}
          direction={'row'}
          spacing={4}
          align={'center'}
          onClick={onOpen}
        >
          <Avatar name={review.user_name} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{review.user_name}</Text>
            <Text color={'gray.500'}>
              {review.created_at.toLocaleDateString()},{' '}
              {review.created_at.toLocaleTimeString()}
            </Text>
          </Stack>
          <Spacer />
          <Sentiment value={review.sentiment} />
          <Spacer />
          <Authenticity value={review.authenticity} />
        </Stack>
      </Box>
    </Center>
  );
}
