import { Box, Center, Stack, Image, Text, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';

import Header from '../../common/Header';
import { getCafes } from '../../services/api_service';

export function CafeList() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    await getCafes().then((cafes) => setCafes(cafes));
  }

  return (
    <Box>
      <Header />
      <Grid
        padding={'5%'}
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
              onClick={() => console.log('OPEN cafe')}
            >
              {cafe['logo'] && (
                <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} position="relative">
                  <Image src={cafe['logo']} />
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
                value={cafe['rating']['unweighted']}
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
