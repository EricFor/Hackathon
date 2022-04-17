import { createContext, useState } from 'react';

export const pageContext = createContext();

const PageProvider = (props) => {
  const [currentPage, setCurrentPage] = useState('test');

  return <pageContext.Provider value={[currentPage, setCurrentPage]}>{props.children}</pageContext.Provider>;
};

export default PageProvider;
