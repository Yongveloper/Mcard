import { userAtom } from '@/atom/user';
import { useAtomValue } from 'jotai';

export const useUser = () => {
  return useAtomValue(userAtom);
};
