import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { IApplyValues } from '@/models/apply';
import { useState } from 'react';

function ApplyPage() {
  const [step, setStep] = useState(1);

  const handleTermsChange = (terms: IApplyValues['terms']) => {
    console.log(terms);
  };

  const handleBasicInfoChange = (
    infoValues: Pick<IApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log(infoValues);
  };

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo />}
    </div>
  );
}

export default ApplyPage;
