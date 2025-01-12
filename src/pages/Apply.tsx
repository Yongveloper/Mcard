import Apply from '@/components/apply';
import { useAppliedCard } from '@/components/apply/hooks/useAppliedCard';
import { useApplyCardMutation } from '@/components/apply/hooks/useApplyCardMutation';
import { usePollApplyStatus } from '@/components/apply/hooks/usePollApplyStatus';
import FullPageLoader from '@/components/shared/FullPageLoader';
import { useAlertContext } from '@/contexts/AlertContext';
import { useUser } from '@/hooks/auth/useUser';
import { APPLY_STATUS } from '@/models/apply';
import { updateApplyCard } from '@/remote/apply';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

function ApplyPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const [readyToPoll, setReadyToPoll] = useState(false);

  const user = useUser();
  const { id } = useParams() as { id: string };

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (!applied) {
          return;
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back();
            },
          });

          return;
        }

        setReadyToPoll(true);
      },
      onError: () => {},
      suspense: true,
    },
  });

  // onSuccess 및 onError 콜백 함수 로직을 여기서 작성하는 이유는
  // 커스텀 훅 내부에 모두 작성하게 되면 사용하는 부분에서 어떤 일을 하는지 구체적으로 알 수 없다.
  // 훅은 상태 관리와 폴링 로직만 담당하고, 실제 비즈니스 로직은 사용하는 컴포넌트에서 결정한다.
  // 컴포넌트에서 로직을 직접 볼 수 있어 코드의 흐름을 이해하기 쉽다.
  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      });
      queryClient.invalidateQueries(['appliedCard', user?.uid as string, id]);
      navigate('/apply/done?success=true', { replace: true });
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      });
      navigate('/apply/done?success=false', { replace: true });
    },
    enabled: readyToPoll,
  });

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true);
    },
    onError: () => {
      window.history.back();
    },
  });

  if (data && data.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message="카드를 신청 중입니다." />;
  }

  return <Apply onSubmit={mutate} />;
}

export default ApplyPage;
