import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { IApplyValues } from '@/models/apply';

function Apply({ step, onSubmit }: { step: number; onSubmit: () => void }) {
  const handleTermsChange = (terms: IApplyValues['terms']) => {
    console.log(terms);
  };

  const handleBasicInfoChange = (
    infoValues: Pick<IApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log(infoValues);
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<IApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    console.log(cardInfoValues);
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
