import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useExihibitModal } from 'hooks/useExihibitModal';

export const ExihibitDrawer = () => {
  const { exihibitModal, setExihibitModal } = useExihibitModal();

  return (
    <Transition appear show={exihibitModal.isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10'
        onClose={() => {
          setExihibitModal({ ...exihibitModal, isOpen: false });
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='h-full w-full pr-20  text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full h-full max-w-md transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all'>
                <img
                  src={exihibitModal.exihibit.imageUrl}
                  alt='modal content image'
                />
                <div className='pl-3 pt-3'>
                  <Dialog.Title
                    as='h1'
                    className='text-3xl font-medium leading-6 text-gray-900'
                  >
                    {exihibitModal.exihibit.name}
                  </Dialog.Title>
                  <div className='mt-2 flex text-lg text-blue-500 gap-2'>
                    <p>{exihibitModal.exihibit.latestWatingTime.type}</p>
                    {exihibitModal.exihibit.latestWatingTime.type ==
                      '待ち時間あり' && (
                      <p>{exihibitModal.exihibit.latestWatingTime.minutes}分</p>
                    )}
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      {exihibitModal.exihibit.description}
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
