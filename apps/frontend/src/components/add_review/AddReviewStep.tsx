import { Flex, Button } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import { ambience } from './AmbienceStep';
import { amenities } from './AmenitiesStep';
import { coffee } from './CoffeeStep';
import { cuisine } from './CuisineStep';
import { pet } from './PetStep';
import { pricing } from './PricingStep';
import { selectCafe } from './SelectCafeStep';
import { speciality } from './specialityStep';
import { tea } from './TeaStep';
import { workFriendly } from './WorkFriendlyStep';

const steps = [
  { label: 'Select Cafe', content: selectCafe },
  { label: 'Coffee', content: coffee },
  { label: 'Tea', content: tea },
  { label: 'Ambience', content: ambience },
  { label: 'Work/Study Friendly', content: workFriendly },
  { label: 'Pricing', content: pricing },
  { label: 'Cuisine', content: cuisine },
  { label: 'Speciality', content: speciality },
  { label: 'Amenities', content: amenities },
  { label: 'Pet-Friendliness', content: pet },
];

export const AddReviewSteps = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" width="100%">
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
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
