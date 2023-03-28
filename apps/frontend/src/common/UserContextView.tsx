import { useState } from 'react';
import { User } from '../../../backend/src/user/user.interface';
import UserContext from './UserContext';

interface MyProviderProps {
  children: React.ReactNode;
}

export function UserContextView({ children }: MyProviderProps) {
  const [userDetails, setUserDetails] = useState<User>(
    JSON.parse(localStorage.getItem('user') || '')
  );

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
