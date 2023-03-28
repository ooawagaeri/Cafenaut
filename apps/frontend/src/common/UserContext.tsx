import { createContext } from 'react';
import { User } from '../../../backend/src/user/user.interface';

interface UserContextType {
  userDetails: User;
  setUserDetails: (data: User) => void;
}

const UserContext = createContext<UserContextType>({
  userDetails: {
    uid: '',
    email: '',
    name: '',
    following: [],
    followers: [],
    classification: 0,
  },
  setUserDetails: () => {},
});

export default UserContext;
