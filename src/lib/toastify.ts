import { toast } from 'react-toastify';

export const failSomethingToast = (title: string) => () =>
  toast.error(title, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
  });
export const successSomethingToast = (title: string) => () =>
  toast.success(title, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
  });
