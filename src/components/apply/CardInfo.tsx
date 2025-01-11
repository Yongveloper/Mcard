import { IApplyValues } from '@/models/apply';
import { MouseEvent, useCallback, useState } from 'react';
import Button from '../shared/Button';
import FixedBottomButton from '../shared/FixedBottomButton';
import Spacing from '../shared/Spacing';

type CardInfoValues = Pick<IApplyValues, 'isHipass' | 'isMaster' | 'isRf'>;

function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void;
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: false,
    isMaster: false,
    isRf: false,
  });

  const { isHipass, isMaster, isRf } = cardInfoValues;

  const handleButtonClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const $button = (e.target as HTMLButtonElement).closest('button');

    if (!$button) {
      return;
    }

    setCardInfoValues((prevValues) => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }));
  }, []);

  return (
    <>
      <div onClick={handleButtonClick}>
        <Button.Group title="해외결제">
          <Button
            name="isMaster"
            weak={!isMaster}
            size="medium"
            data-value={true}
          >
            Master
          </Button>
          <Button
            name="isMaster"
            weak={isMaster}
            size="medium"
            data-value={false}
          >
            국내전용
          </Button>
        </Button.Group>

        <Spacing size={12} />

        <Button.Group title="후불교통기능">
          <Button name="isRf" weak={isRf} size="medium" data-value={false}>
            신청안함
          </Button>
          <Button name="isRf" weak={!isRf} size="medium" data-value={true}>
            신청
          </Button>
        </Button.Group>

        <Spacing size={12} />

        <Button.Group title="후불하이패스카드">
          <Button
            name="isHipass"
            weak={isHipass}
            size="medium"
            data-value={false}
          >
            신청안함
          </Button>
          <Button
            name="isHipass"
            weak={!isHipass}
            size="medium"
            data-value={true}
          >
            신청
          </Button>
        </Button.Group>
      </div>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues);
        }}
      />
    </>
  );
}

export default CardInfo;
