import {
  Box,
  Text,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  Image,
  Link,
  HStack,
} from '@chakra-ui/react';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { useEffect, useState } from 'react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { getCafeDetail } from '../../services/api_service';

export function ViewReview({ review }: { review: ReviewModel }) {
  const [cafeLogo, setCafeLogo] = useState('');
  const [cafeDetails, setCafeDetails] = useState({});

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const cafe_details = await getCafeDetail(review.cafe_id);
    setCafeDetails(cafe_details);
    setCafeLogo(cafe_details.logo);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{review.title}</Heading>
        <Link onClick={() => console.log('TODO: link to profile page')}>
          Written by: {review.user_name}
        </Link>
        <Text color={'gray.500'}>{review.created_at.toLocaleDateString()}, {review.created_at.toLocaleTimeString()}</Text>
      </CardHeader>

      <CardBody>
        <HStack>
          <Link
            onClick={() =>
              console.log('TODO: link to cafe page and pass cafeDetails')
            }
            size="md"
          >
            {review.cafe_name}
          </Link>
          {cafeLogo && (
            <Image src={cafeLogo} maxHeight={'50px'} maxWidth={'auto'} />
          )}
        </HStack>
      </CardBody>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
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
            <Text pt="2" fontSize="sm">
              {review.body}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Coffee
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.coffee.sub_rating}
              edit={false}
            />
            <Text>Beans</Text>
            {review.aspects.coffee.beans.arabica ? (
              <Tag colorScheme="teal">Arabica</Tag>
            ) : (
              <Tag colorScheme="red">Arabica</Tag>
            )}
            {review.aspects.coffee.beans.excelsa ? (
              <Tag colorScheme="teal">Excelsa</Tag>
            ) : (
              <Tag colorScheme="red">Excelsa</Tag>
            )}
            {review.aspects.coffee.beans.liberica ? (
              <Tag colorScheme="teal">Liberica</Tag>
            ) : (
              <Tag colorScheme="red">Liberica</Tag>
            )}
            {review.aspects.coffee.beans.robusta ? (
              <Tag colorScheme="teal">Robusta</Tag>
            ) : (
              <Tag colorScheme="red">Robusta</Tag>
            )}
            {review.aspects.coffee.beans.arabica ? (
              <Tag colorScheme="teal">Arabica</Tag>
            ) : (
              <Tag colorScheme="red">Arabica</Tag>
            )}
            <Text>Milk options</Text>
            {review.aspects.coffee.milk.low_fat ? (
              <Tag colorScheme="teal">Low Fat</Tag>
            ) : (
              <Tag colorScheme="red">Low Fat</Tag>
            )}
            {review.aspects.coffee.milk.almond ? (
              <Tag colorScheme="teal">Almond</Tag>
            ) : (
              <Tag colorScheme="red">Almond</Tag>
            )}
            {review.aspects.coffee.milk.oat ? (
              <Tag colorScheme="teal">Oat</Tag>
            ) : (
              <Tag colorScheme="red">Oat</Tag>
            )}
            {review.aspects.coffee.milk.soy ? (
              <Tag colorScheme="teal">Soy</Tag>
            ) : (
              <Tag colorScheme="red">Soy</Tag>
            )}
            <br></br>
            <br></br>
            {review.aspects.coffee.non_caffeinated ? (
              <Tag colorScheme="teal">Non-caffeinated option</Tag>
            ) : (
              <Tag colorScheme="red">Non-caffeinated option</Tag>
            )}

            <Text pt="2" fontSize="sm">
              {review.aspects.coffee.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Tea
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.tea.sub_rating}
              edit={false}
            />
            <Text>Leaves</Text>
            {review.aspects.tea.tea_leaves.black ? (
              <Tag colorScheme="teal">Black</Tag>
            ) : (
              <Tag colorScheme="red">Black</Tag>
            )}
            {review.aspects.tea.tea_leaves.green ? (
              <Tag colorScheme="teal">Green</Tag>
            ) : (
              <Tag colorScheme="red">Green</Tag>
            )}
            {review.aspects.tea.tea_leaves.oolong ? (
              <Tag colorScheme="teal">Oolong</Tag>
            ) : (
              <Tag colorScheme="red">Oolong</Tag>
            )}
            {review.aspects.tea.tea_leaves.pu_erh ? (
              <Tag colorScheme="teal">Pu-erh</Tag>
            ) : (
              <Tag colorScheme="red">Pu-erh</Tag>
            )}
            {review.aspects.tea.tea_leaves.white ? (
              <Tag colorScheme="teal">White</Tag>
            ) : (
              <Tag colorScheme="red">White</Tag>
            )}

            <Text>Milk options</Text>
            {review.aspects.tea.milk.low_fat ? (
              <Tag colorScheme="teal">Low Fat</Tag>
            ) : (
              <Tag colorScheme="red">Low Fat</Tag>
            )}
            {review.aspects.tea.milk.almond ? (
              <Tag colorScheme="teal">Almond</Tag>
            ) : (
              <Tag colorScheme="red">Almond</Tag>
            )}
            {review.aspects.tea.milk.oat ? (
              <Tag colorScheme="teal">Oat</Tag>
            ) : (
              <Tag colorScheme="red">Oat</Tag>
            )}
            {review.aspects.tea.milk.soy ? (
              <Tag colorScheme="teal">Soy</Tag>
            ) : (
              <Tag colorScheme="red">Soy</Tag>
            )}
            <Text pt="2" fontSize="sm">
              {review.aspects.tea.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Ambience
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.ambience.sub_rating}
              edit={false}
            />
            {review.aspects.ambience.alfresco ? (
              <Tag colorScheme="teal">Alfresco option</Tag>
            ) : (
              <Tag colorScheme="red">Alfresco option</Tag>
            )}
            <Text>Lighting: {review.aspects.ambience.lighting}</Text>
            <Text>Vibes: {review.aspects.ambience.vibe}</Text>
            <Text pt="2" fontSize="sm">
              {review.aspects.ambience.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Work/Study Friendly
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.work_friendly.sub_rating}
              edit={false}
            />
            {review.aspects.work_friendly.charging_ports ? (
              <Tag colorScheme="teal">Charging Ports</Tag>
            ) : (
              <Tag colorScheme="red">Charging Ports</Tag>
            )}
            {review.aspects.work_friendly.wifi ? (
              <Tag colorScheme="teal">WiFi</Tag>
            ) : (
              <Tag colorScheme="red">WiFi</Tag>
            )}
            <Text pt="2" fontSize="sm">
              {review.aspects.work_friendly.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Pricing
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.price.sub_rating}
              edit={false}
            />
            <Stat>
              <StatLabel>Average Price ($)</StatLabel>
              <StatNumber>{review.aspects.price.avg_price}</StatNumber>
            </Stat>
            {review.aspects.price.elderly ? (
              <Tag colorScheme="teal">Elderly</Tag>
            ) : (
              <Tag colorScheme="red">Elderly</Tag>
            )}
            {review.aspects.price.student ? (
              <Tag colorScheme="teal">Student</Tag>
            ) : (
              <Tag colorScheme="red">Student</Tag>
            )}
            <Text pt="2" fontSize="sm">
              {review.aspects.price.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Cuisine
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.cuisine.sub_rating}
              edit={false}
            />
            {review.aspects.cuisine.serve_food ? (
              <Tag colorScheme="teal">Serves food</Tag>
            ) : (
              <Tag colorScheme="red">Does not serve food</Tag>
            )}
            <Text pt="2" fontSize="sm">
              {review.aspects.cuisine.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Speciality
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.speciality.sub_rating}
              edit={false}
            />
            {review.aspects.speciality.present ? (
              <Tag colorScheme="teal">Have speciality</Tag>
            ) : (
              <Tag colorScheme="red">None</Tag>
            )}
            <Text pt="2" fontSize="sm">
              {review.aspects.speciality.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Amenities
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.amenities.sub_rating}
              edit={false}
            />
            <Text pt="2" fontSize="sm">
              {review.aspects.amenities.free_text}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Aspect: Pet-Friendliness
            </Heading>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              value={review.aspects.pet.sub_rating}
              edit={false}
            />
            {review.aspects.pet.friendly ? (
              <Tag colorScheme="teal">Friendly</Tag>
            ) : (
              <Tag colorScheme="red">Not friendly</Tag>
            )}
            <Text pt="2" fontSize="sm">
              {review.aspects.pet.free_text}
            </Text>
          </Box>

          {review.image_url && (
            <Stack>
              <Heading size="xs" textTransform="uppercase">
                Images
              </Heading>
              <Image src={review.image_url} />
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
