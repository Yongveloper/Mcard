import { IUser } from './user';

export interface ITerm {
  id: string;
  link?: string;
  title: string;
}

export interface IApplyValues {
  userId: IUser['uid'];
  terms: ITerm['id'][];
  appliedAt: Date;
  cardId: string;
}
