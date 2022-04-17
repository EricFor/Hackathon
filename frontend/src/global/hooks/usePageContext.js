import { useContext } from 'react';
import { pageContext } from '../pageContext';

export default function usePageContext() {
  return useContext(pageContext);
}
