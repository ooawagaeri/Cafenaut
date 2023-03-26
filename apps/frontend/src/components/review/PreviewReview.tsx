import {
  Center,
  useColorModeValue,
  Stack,
  Heading,
  Avatar,
  Text,
  Image,
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
} from '@chakra-ui/react';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { ViewReview } from './ViewReview';

export function PreviewReview({ review }: { review: ReviewModel }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center py={6}>
      <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewReview review={review}></ViewReview>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        maxW={'60%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        cursor={'pointer'}
        onClick={onOpen}
      >
        {review.image_url && (
          <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} position="relative">
            <Image src={review.image_url} />
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
          value={review.rating?.unweighted}
          edit={false}
        />
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {review.cafe_name}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {review.title}
          </Heading>
          <Text color={'gray.500'}>{review.body}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{review.user_name}</Text>
            <Text color={'gray.500'}>{review.created_at.toLocaleDateString()}, {review.created_at.toLocaleTimeString()}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
