import { getToken } from 'lib/tokenStore';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();

  if (!getToken()) router.push('/login');
  return <>{children}</>;
};
