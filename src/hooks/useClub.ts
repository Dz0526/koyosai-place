import { ClubContext } from 'context/ClubContext';
import { useContext } from 'react';

export const useClub = () => {
  const context = useContext(ClubContext);

  return { club: context.club };
};
