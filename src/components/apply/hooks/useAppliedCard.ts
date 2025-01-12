import { IApplyValues } from '@/models/apply';
import { getAppliedCard } from '@/remote/apply';
import { useQuery, UseQueryOptions } from 'react-query';

export function useAppliedCard({
  userId,
  cardId,
  options,
}: {
  userId: string;
  cardId: string;
  options?: Pick<
    UseQueryOptions<IApplyValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >;
}) {
  return useQuery(
    ['appliedCard', userId, cardId],
    () => getAppliedCard({ userId, cardId }),
    options,
  );
}
