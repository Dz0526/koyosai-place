import { useFormUi } from 'hooks/useFormUi';
import { useKeyFoucsControl } from 'hooks/useKeyFoucsControl';
import { Position } from 'types/position';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  clubData: Position[];
  inputClubName: string;
  setInputClubName: Dispatch<SetStateAction<string>>;
  submit: (suggestion?: string) => void;
};

export const SearchInput = ({
  inputClubName,
  setInputClubName,
  submit,
  clubData,
}: Props) => {
  const { inputRef, register, focusToFirst } = useKeyFoucsControl();
  const {
    isFocusSearchInput,
    setIsFocusSearchInput,
    setIsMouseOverSuggestion,
  } = useFormUi();

  return (
    <div
      onKeyDown={e => {
        if (e.key == 'Escape') setIsFocusSearchInput(false);
      }}
    >
      <input
        className='border-gray-300 border-2  pb-2 pt-2 focus:bg-blue-10'
        type='search'
        placeholder='ここで検索'
        required
        value={inputClubName}
        onChange={e => {
          setInputClubName(e.target.value);
        }}
        list='club-list'
        onFocus={() => {
          setIsFocusSearchInput(true);
        }}
        onKeyDown={e => {
          if (e.key == 'ArrowDown') {
            e.preventDefault();
            focusToFirst();
          }
        }}
        ref={inputRef}
      />
      {isFocusSearchInput && (
        <ul className='absolute z-50 bg-white divide-y-2 divide-slate-200 mt-3 rounded'>
          {clubData
            .filter(club =>
              inputClubName ? club.name.indexOf(inputClubName) == 0 : false,
            )
            .map((club, index) => (
              <a key={index}>
                <li
                  tabIndex={0}
                  key={index}
                  className={`pt-2 pl-2 pb-2 pr-10 focus:bg-blue-100 hover:bg-blue-100 outline-blue-200 hover:cursor-pointer`}
                  {...register(index)}
                  onClick={() => submit(club.name)}
                  onKeyPress={e => {
                    if (e.key == 'Enter') submit(club.name);
                  }}
                  onMouseOver={() => setIsMouseOverSuggestion(true)}
                  onMouseOut={() => setIsMouseOverSuggestion(false)}
                >
                  {club.name}
                </li>
              </a>
            ))}
        </ul>
      )}
    </div>
  );
};
