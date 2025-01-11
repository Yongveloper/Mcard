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

  const [step, setStep] = useState(0);
  const [applyValues, setApplyValues] = useState<Partial<IApplyValues>>({
    userId: user?.uid,
    cardId: id,
  });

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as IApplyValues);
    }
  }, [applyValues, step, onSubmit]);

  const handleTermsChange = (terms: IApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const handleBasicInfoChange = (
    infoValues: Pick<IApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<IApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  );
}

export default Apply;
