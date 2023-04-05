import { Box, Center, Stack, Image, Text, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

import Header from '../../common/Header';
import UserContext from '../../common/UserContext';
import { getAllCafes } from '../../services/api_service';
import { Classification } from 'apps/backend/src/classifier/classification.interface';
import { Ratings } from 'apps/backend/src/rating/rating.interface';

export function CafeList() {
  const [cafes, setCafes] = useState([]);
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    await getAllCafes().then((cafes) => setCafes(cafes));
  }

  return (
    <Box>
      <Header />
      <Grid
        padding={'1%'}
        h="200px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={3}
      >
        {cafes.map((cafe, index) => (
          <Center key={index} py={6}>
            <Box
              maxW={'60%'}
              w={'full'}
              boxShadow={'2xl'}
              rounded={'md'}
              p={6}
              overflow={'hidden'}
              cursor={'pointer'}
              onClick={() => navigate(`/cafe/${cafe['id']}`, { state: cafe })}
            >
              {cafe['logo'] && (
                <Center
                  bg={'gray.100'}
                  mt={-6}
                  mx={-6}
                  mb={6}
                  position="relative"
                  maxH={'400px'}
                >
                  <Image src={cafe['logo']} />
                </Center>
              )}

              <ReactStars
                count={5}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                value={
                  cafe['rating'][
                    Classification[
                      userDetails.classification
                    ].toLowerCase() as keyof Ratings
                  ]
                }
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
                  {cafe['name']}
                </Text>
              </Stack>
            </Box>
          </Center>
        ))}
      </Grid>
    </Box>
  );
}
