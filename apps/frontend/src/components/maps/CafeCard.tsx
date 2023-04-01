import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Tooltip
} from '@chakra-ui/react';
import React, { useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../common/UserContext';
import Authenticity from '../authenticity-senti/Authenticity'
import { Classification } from 'apps/backend/src/classifier/classification.interface';
import { Ratings } from 'apps/backend/src/rating/rating.interface';

export function CafeCard(props: { cafe: CafePinModel }) {
  const navigate = useNavigate();
  const {userDetails} = useContext(UserContext);

  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        {props.cafe.logo && (
          <Image src={props.cafe.logo} maxHeight='50px' maxWidth='100px' marginTop='9px'/>
        )}
      </Box>
      <Heading as='h5' size='sm' textAlign='center'>{props.cafe.name}</Heading>
      <Box display='flex' justifyContent='center'>
        <ReactStars
          count={5}
          size={24}
          isHalf={true}
          emptyIcon={<i className='far fa-star'></i>}
          halfIcon={<i className='fa fa-star-half-alt'></i>}
          fullIcon={<i className='fa fa-star'></i>}
          activeColor='#ffd700'
          value={
            props.cafe.rating[
              Classification[
                userDetails.classification
                ].toLowerCase() as keyof Ratings
              ]
          }
          edit={false}/>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Authenticity value={props.cafe.authenticity}/>
      </Box>
      <Box textAlign='center'>
        <Tooltip label='Total no. of reviews' placement='right'>
          <Text>Reviews: {props.cafe.popularity}</Text>
        </Tooltip>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Button
          mt={4}
          colorScheme='blue'
          onClick={() => navigate(`/cafe/${props.cafe.id}`, {state: props.cafe})}
        >
          Visit cafe!
        </Button>
      </Box>
    </Box>
  )
}
