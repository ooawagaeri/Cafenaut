import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AddReviewSteps } from '../components/review/add_review/AddReviewSteps';

const Links = ['Dashboard', 'Cafes', 'Explore', 'Users'];

const NavLink = ({children}: { children: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={`/${children.toLowerCase()}`}
  >
    {children}
  </Link>
);

export default function Header() {
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const {
    isOpen: isAddReviewModalOpen,
    onOpen: onAddReviewModalOpen,
    onClose: onAddReviewModalClose,
  } = useDisclosure();

  return (
    <Box>
      <Modal
        size="4xl"
        isOpen={isAddReviewModalOpen}
        onClose={onAddReviewModalClose}
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            Add Review (Please fill in aspects if applicable)
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <AddReviewSteps
              onAddReviewModalClose={onAddReviewModalClose}
            ></AddReviewSteps>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onAddReviewModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isProfileOpen ? <CloseIcon/> : <HamburgerIcon/>}
            aria-label={'Open Menu'}
            display={{md: 'none'}}
            onClick={isProfileOpen ? onProfileClose : onProfileOpen}
          />
          <Button onClick={onAddReviewModalOpen} colorScheme="green">
            Add Review
          </Button>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{base: 'none', md: 'flex'}}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider/>
                <MenuItem>Sign-out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isProfileOpen ? (
          <Box pb={4} display={{md: 'none'}}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
