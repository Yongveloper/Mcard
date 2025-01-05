import { IUser } from '@/models/user';
import { atom } from 'jotai';

export const userAtom = atom<IUser | null>(null);
