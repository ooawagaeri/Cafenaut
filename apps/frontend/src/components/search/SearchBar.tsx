import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  Collapse,
  useDisclosure,
  Stack,
  Button,
  HStack,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { CoffeeStep } from '../review/add_review/CoffeeStep';
import { TeaStep } from '../review/add_review/TeaStep';
import { AmbienceStep } from '../review/add_review/AmbienceStep';
import { WorkFriendlyStep } from '../review/add_review/WorkFriendlyStep';
import { PricingStep } from '../review/add_review/PricingStep';
import { CuisineStep } from '../review/add_review/CuisineStep';
import { SpecialityStep } from '../review/add_review/SpecialityStep';
import { PetStep } from '../review/add_review/PetStep';
import ExpandFilter from './ExpandFilter';
import { BsSliders2 } from 'react-icons/all';
import { searchReviews } from "../../services/api_service";

export default function SearchBar({setReviews}: { setReviews: (reviews: ReviewModel[]) => void }) {
  const {isOpen, onToggle} = useDisclosure();
  const [value, setValue] = React.useState('');

  const reviewSearch: ReviewModel = {
    title: '',
    body: '',
    user_uid: '',
    user_name: '',
    created_at: new Date(),
    aspects: {
      coffee: {
        beans: {
          arabica: false,
          robusta: false,
          excelsa: false,
          liberica: false,
        },
        milk: {
          low_fat: false,
          oat: false,
          soy: false,
          almond: false,
        },
        non_caffeinated: false,
        sub_rating: 0,
        free_text: '',
      },
      tea: {
        tea_leaves: {
          black: false,
          white: false,
          green: false,
          oolong: false,
          pu_erh: false,
        },
        milk: {
          low_fat: false,
          oat: false,
          soy: false,
          almond: false,
        },
        sub_rating: 0,
        free_text: '',
      },
      ambience: {
        lighting: '',
        alfresco: false,
        vibe: '',
        sub_rating: 0,
        free_text: '',
      },
      price: {
        student: false,
        elderly: false,
        avg_price: 0,
        sub_rating: 0,
        free_text: '',
      },
      work_friendly: {
        charging_ports: false,
        wifi: false,
        sub_rating: 0,
        free_text: '',
      },
      cuisine: {
        serve_food: false,
        sub_rating: 0,
        free_text: '',
      },
      speciality: {
        present: false,
        sub_rating: 0,
        free_text: '',
      },
      amenities: {
        sub_rating: 0,
        free_text: '',
      },
      pet: {
        friendly: false,
        sub_rating: 0,
        free_text: '',
      },
    },
    cafe_id: '',
    cafe_name: '',
    rating: {
      unweighted: 0,
      casual_coffee: 0,
      connoisseur_coffee: 0,
      casual_tea: 0,
      connoisseur_tea: 0,
    },
  };

  const [review, setReview] = useState(reviewSearch);
  const handleEnter = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    const reviews = await searchReviews(value, review);
    setReviews(reviews);
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Stack w={'50%'} spacing={0}>
        <HStack>
          <InputGroup>
            <Input value={value} placeholder='Search'
                   onChange={(e) => setValue(e.currentTarget.value)}
                   onKeyDown={handleEnter}/>
            <InputRightElement
              children={<IconButton icon={<SearchIcon color='gray.300'/>} aria-label={'Search'}
                                    variant='link' onClick={handleSearch}/>}
            />
          </InputGroup>
          <Button leftIcon={<BsSliders2/>} variant='ghost' onClick={onToggle}>
            Filters
          </Button>
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <Box p='3%' mt='10px' bg='gray.100' rounded='md' shadow='md'>
            <ExpandFilter name='Coffee'
                          child={<CoffeeStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Tea'
                          child={<TeaStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Ambience'
                          child={<AmbienceStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Work Friendly'
                          child={<WorkFriendlyStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Pricing'
                          child={<PricingStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Cuisine'
                          child={<CuisineStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Speciality'
                          child={<SpecialityStep setReview={setReview} isAdd={false}/>}/>
            <ExpandFilter name='Pet Friendly'
                          child={<PetStep setReview={setReview} isAdd={false}/>}/>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  )
}
