import { AiOutlineSearch } from 'react-icons/ai';
import { Transition, Dialog } from '@headlessui/react';
import { SearchInput } from './SearchInput';
import { exihibitToPosition } from 'func/exihibit-to-position';
import { usePosition } from 'hooks/usePosition';
import { Fragment, useState } from 'react';
import { useExihibitModal } from 'hooks/useExihibitModal';
import { useExhibit } from 'hooks/useExhibit';

export const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exihibitName, setExihibitName] = useState('');
  const { dispatch } = usePosition();
  const { exihibitModal, setExihibitModal } = useExihibitModal();
  const { exhibit } = useExhibit();

  const submit = (suggestion?: string) => {
    const inputOrSuggestion = suggestion ?? exihibitName;
    const selectedExihibit = exhibit.find(c => c.name == inputOrSuggestion);
    const positionData =
      selectedExihibit && exihibitToPosition(selectedExihibit);
    if (positionData) {
      dispatch({
        type: 'SET_POSITION',
        payload: positionData,
      });
      setExihibitName('');
      setIsOpen(false);
      setExihibitModal({
        ...exihibitModal,
        isOpen: true,
        exihibit: {
          ...exihibitModal.exihibit,
          name: selectedExihibit.name,
          imageUrl: selectedExihibit.imageUrl,
          description: selectedExihibit.description,
          latestWatingTime: selectedExihibit.latestWatingTime,
        },
      });
    }
  };

  return (
    <>
      <AiOutlineSearch
        className='self-center'
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => {
            setIsOpen(false);
            setExihibitName('');
          }}
        >
          {/* <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child> */}

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full h-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='mt-2 h-full'>
                    <SearchInput
                      inputExhibitName={exihibitName}
                      setInputExhibitName={setExihibitName}
                      exihibitData={exhibit}
                      submit={submit}
                      close={() => setIsOpen(false)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
