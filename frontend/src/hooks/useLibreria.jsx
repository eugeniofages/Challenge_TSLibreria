import { useContext } from 'react';
import LibreriaContext from '../context/LibreriaProvider';

const useLibreria = () => {
  return useContext(LibreriaContext);
};

export default useLibreria;