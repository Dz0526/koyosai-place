import { useFormUi } from 'hooks/useFormUi';
import { useKeyFoucsControl } from 'hooks/useKeyFoucsControl';
import { Dispatch, SetStateAction } from 'react';
import { Exihibit } from 'type/exihibit';
import { MdOutlineCancel } from 'react-icons/md';

type Props = {
  exihibitData: Exihibit[];
  inputExhibitName: string;
  setInputExhibitName: Dispatch<SetStateAction<string>>;
  submit: (suggestion?: string) => void;
  close: () => void;
};

export const SearchInput = ({
  inputExhibitName,
  setInputExhibitName,
  submit,
  exihibitData,
  close,
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
      className='flex flex-col h-full'
    >
      <div className='flex'>
        <input
          className='border-gray-300 border-2  pb-2 pt-2 focus:bg-blue-10 w-full border-0 outline-0 border-none outline-none'
          type='search'
          placeholder='展示名を入力'
          required
          value={inputExhibitName}
          onChange={e => {
            setInputExhibitName(e.target.value);
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
        <MdOutlineCancel className='self-center' onClick={close} />
      </div>
      {isFocusSearchInput && (
        <div className='overflow-auto'>
          <ul className='z-50 bg-white divide-y-2 divide-slate-200 mt-3 rounded-lg w-full space-y-3'>
            {exihibitData
              .filter(exhibit =>
                inputExhibitName
                  ? exhibit.name.indexOf(inputExhibitName) == 0
                  : true,
              )
              .map((exhibit, index) => (
                <a key={index}>
                  <li
                    tabIndex={0}
                    key={index}
                    className={`pt-2 pl-2 pb-2 pr-10 focus:bg-blue-100 hover:bg-blue-100 outline-blue-200 hover:cursor-pointer bg-gray-100 rounded-lg mt-2`}
                    {...register(index)}
                    onClick={() => submit(exhibit.name)}
                    onKeyPress={e => {
                      if (e.key == 'Enter') submit(exhibit.name);
                    }}
                    onMouseOver={() => setIsMouseOverSuggestion(true)}
                    onMouseOut={() => setIsMouseOverSuggestion(false)}
                  >
                    {exhibit.name}
                  </li>
                </a>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
