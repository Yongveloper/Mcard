import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { useState } from 'react';

function ApplyPage() {
  const [step, setStep] = useState(0);

  return (
    <div>
      {step === 0 && <Terms />}
      {step === 1 && <BasicInfo />}
      {step === 2 && <CardInfo />}
    </div>
  );
}

export default ApplyPage;
