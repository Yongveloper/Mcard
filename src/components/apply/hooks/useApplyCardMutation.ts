import { useAlertContext } from '@/contexts/AlertContext';
import { applyCard } from '@/remote/apply';
import { useMutation } from 'react-query';

interface IUserApplyCardMutationProps {
  onSuccess: () => void;
  onError: () => void;
}

export function useApplyCardMutation({
  onSuccess,
  onError,
}: IUserApplyCardMutationProps) {
  const { open } = useAlertContext();

  return useMutation(applyCard, {
    onSuccess,
    onError: () => {
      open({
        title: '카드를 신청하지 못했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError();
        },
      });
    },
  });
}
