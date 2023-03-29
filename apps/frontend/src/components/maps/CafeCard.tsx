import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel, Heading, Image,
  Text,
  Tooltip
} from '@chakra-ui/react';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { useNavigate } from 'react-router-dom';

export function CafeCard(props: { cafe: CafePinModel }) {
  const navigate = useNavigate();

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
          value={props.cafe.rating.unweighted}
          edit={false}/>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Tooltip label='Authenticity %' placement='right'>
          <CircularProgress value={props.cafe.authenticity * 100}>
            <CircularProgressLabel>{Math.round(props.cafe.authenticity * 100)}%</CircularProgressLabel>
          </CircularProgress>
        </Tooltip>
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
