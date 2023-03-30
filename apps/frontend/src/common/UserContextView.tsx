import { useState } from 'react';
import { User } from '../../../backend/src/user/user.interface';
import UserContext from './UserContext';

interface MyProviderProps {
  children: React.ReactNode;
}

export function UserContextView({ children }: MyProviderProps) {
  const user =
    localStorage.getItem('user') === null
      ? {
          uid: '',
          email: '',
          name: '',
          following: [],
          followers: [],
          classification: 0,
        }
      : JSON.parse(localStorage.getItem('user') || '');

  const [userDetails, setUserDetails] = useState<User>(user);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
