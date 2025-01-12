import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { useUser } from '@/hooks/auth/useUser';
import { APPLY_STATUS, IApplyValues } from '@/models/apply';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: IApplyValues) => void;
}) {
  const user = useUser();
  const { id } = useParams() as { id: string };

  const storageKey = `applied-${user?.uid}-${id}`;

  // 초기 값에 함수를 넣어주면 최초에 단 한 번만 실행되는 함수가 됨
  const [applyValues, setApplyValues] = useState<Partial<IApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey);

    if (!applied) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      };
    }

    return JSON.parse(applied);
  });

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey);

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as IApplyValues);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues));
    }
  }, [applyValues, onSubmit, storageKey]);

  const handleTermsChange = (terms: IApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }));
  };

  const handleBasicInfoChange = (
    infoValues: Pick<IApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }));
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<IApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }));
  };

  return (
    <div>
      {applyValues.step === 0 && <Terms onNext={handleTermsChange} />}
      {applyValues.step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {applyValues.step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  );
}

export default Apply;
