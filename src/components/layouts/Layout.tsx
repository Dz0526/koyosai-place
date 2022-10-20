import { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { usePosition } from 'hooks/usePosition';
import { SearchInput } from 'components/SearchInput';
import { useFormUi } from 'hooks/useFormUi';
import { useClub } from 'hooks/useClub';
import { clubsToPosition, clubToPosition } from 'types/position';

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  const { dispatch } = usePosition();
  const [clubName, setClubName] = useState('');
  const { setIsFocusSearchInput, isMouseOverSuggestion } = useFormUi();
  const { club } = useClub();

  const submit = (suggestion?: string) => {
    const inputOrSuggestion = suggestion ?? clubName;
    const selectedClub = club.find(c => c.name == inputOrSuggestion);
    const positionData = selectedClub && clubToPosition(selectedClub);
    if (positionData) {
      dispatch({
        type: 'SET_POSITION',
        payload: positionData,
      });
      setClubName('');
    }
  };

  return (
    <div
      onMouseDown={() => {
        if (!isMouseOverSuggestion) setIsFocusSearchInput(false);
      }}
    >
      <header className='p-5 flex'>
        <h1 className='text-3xl font-bold font-red italic grow'>Place</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
            return;
          }}
          className='relative grow-0'
        >
          <SearchInput
            inputClubName={clubName}
            setInputClubName={setClubName}
            submit={submit}
            clubData={clubsToPosition(club)}
          />
          <button type='submit' className='absolute inset-y-0 right-0 pr-2'>
            <FontAwesomeIcon
              className='hover:text-blue-300'
              icon={faMagnifyingGlass}
            />
          </button>
        </form>
      </header>
      {children}
      <footer className='text-center'>
        <p>Copyright © 4I team 4</p>
      </footer>
    </div>
  );
};
