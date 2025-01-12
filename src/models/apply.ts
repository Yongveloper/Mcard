import { IUser } from './user';

export interface ITerm {
  id: string;
  link?: string;
  title: string;
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const;

export interface IApplyValues {
  userId: IUser['uid'];
  terms: ITerm['id'][];
  appliedAt: Date;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isHipass: boolean;
  isRf: boolean;
  status: keyof typeof APPLY_STATUS;
  step: number;
}

export interface IOption {
  label: string;
  value: string | number | undefined;
}
