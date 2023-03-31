import {
  Card,
  CardBody,
  Stack,
  StackDivider,
  Text,
  Avatar,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubsetUsers } from '../../services/api_service';

export function Users({
  users_uid,
  onClose,
}: {
  users_uid: any;
  onClose: any;
}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getSubsetUsers(users_uid).then((result) => setUsers(result));
  }, []);
  const navigate = useNavigate();

  if (users_uid.length === 0) {
    return <Text>Whoops there are no users to show... 😔</Text>;
  } else {
    return (
      <Box>
        {users.map((user, index) => (
          <Card
            key={index}
            cursor={'pointer'}
            onClick={() => {
              onClose();
              navigate(`/profile/${user['uid']}`, {
                state: { uid: user['uid'] },
              });
            }}
          >
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <HStack>
                  <Avatar name={user['name']} />
                  <Text>{user['name']}</Text>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Box>
    );
  }
}
