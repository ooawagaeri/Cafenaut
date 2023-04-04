import { Flex, Button } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useContext, useEffect, useState } from 'react';

import { CoffeeStep } from './CoffeeStep';
import { SelectCafe } from './SelectCafeStep';
import { TeaStep } from './TeaStep';
import { AmbienceStep } from './AmbienceStep';
import { WorkFriendlyStep } from './WorkFriendlyStep';
import { PricingStep } from './PricingStep';
import { CuisineStep } from './CuisineStep';
import { SpecialityStep } from './SpecialityStep';
import { AmenitiesStep } from './AmenitiesStep';
import { PetStep } from './PetStep';
import { OverallStep } from './OverallStep';

import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { postReview } from '../../../services/api_service';
import UserContext from 'apps/frontend/src/common/UserContext';

export function AddReviewSteps({
  onAddReviewModalClose,
  setPostedReview
}: {
  onAddReviewModalClose: any;
  setPostedReview: any;
}) {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    setReview((review: any) => {
      const newReview = { ...review };
      newReview.user_uid = userDetails.uid;
      newReview.user_name = userDetails.name;
      return newReview;
    });
  }, []);

  const reviewOutput: ReviewModel = {
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
  const [review, setReview] = useState(reviewOutput);

  const steps = [
    {
      label: 'Select Cafe',
      content: <SelectCafe setReview={setReview}></SelectCafe>,
    },
    {
      label: 'Overall',
      content: <OverallStep setReview={setReview}></OverallStep>,
    },
    {
      label: 'Coffee',
      content: <CoffeeStep setReview={setReview} isAdd={true}></CoffeeStep>,
    },
    { label: 'Tea', content: <TeaStep setReview={setReview} isAdd={true}></TeaStep> },
    {
      label: 'Ambience',
      content: <AmbienceStep setReview={setReview} isAdd={true}></AmbienceStep>,
    },
    {
      label: 'Work/Study Friendly',
      content: <WorkFriendlyStep setReview={setReview} isAdd={true}></WorkFriendlyStep>,
    },
    {
      label: 'Pricing',
      content: <PricingStep setReview={setReview} isAdd={true}></PricingStep>,
    },
    {
      label: 'Cuisine',
      content: <CuisineStep setReview={setReview} isAdd={true}></CuisineStep>,
    },
    {
      label: 'Speciality',
      content: <SpecialityStep setReview={setReview} isAdd={true}></SpecialityStep>,
    },
    {
      label: 'Amenities',
      content: <AmenitiesStep setReview={setReview}></AmenitiesStep>,
    },
    {
      label: 'Pet-Friendliness',
      content: <PetStep setReview={setReview} isAdd={true}></PetStep>,
    },
  ];

  const createReview = async () => {
    console.log(review);
    await postReview(review).then((res) => {
      console.log(res);
      setPostedReview(true);
      onAddReviewModalClose();
    });
  };

  return (
    <Flex flexDir="column" width="94%">
      <Steps onClickStep={(step) => setStep(step)} activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx="auto" size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button
            size="sm"
            onClick={activeStep === steps.length - 1 ? createReview : nextStep}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
