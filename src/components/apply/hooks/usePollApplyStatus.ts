import { APPLY_STATUS } from '@/models/apply';
import { useQuery } from 'react-query';

interface IUsePollApplyStatusProps {
  onSuccess: () => void;
  onError: () => void;
  enabled: boolean;
}

export function usePollApplyStatus({
  onSuccess,
  onError,
  enabled,
}: IUsePollApplyStatusProps) {
  return useQuery(['applyStatus'], getApplyStatus, {
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
    onSuccess: (status) => {
      if (status === APPLY_STATUS.COMPLETE) {
        onSuccess();
      }
    },
    onError,
  });
}

function getApplyStatus() {
  const values = [
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.REJECT,
  ];

  const status = values[Math.floor(Math.random() * values.length)];

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.');
  }

  return Promise.resolve(status);
}
