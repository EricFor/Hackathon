import { createContext, useState } from 'react';

export const userContext = createContext();

const UserProvider = (props) => {
  const [userData, setUserData] = useState();

  return <userContext.Provider value={[userData, setUserData]}>{props.children}</userContext.Provider>;
};

export default UserProvider;
