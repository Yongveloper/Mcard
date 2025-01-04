import { IFormValues } from '@/models/signup';
import { css } from '@emotion/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import FixedBottomButton from '../shared/FixedBottomButton';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import TextField from '../shared/TextField';
import validator from 'validator';

function Form({ onSubmit }: { onSubmit: (formValues: IFormValues) => void }) {
  const [formValues, setFormValues] = useState<IFormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  });
  const [dirty, setDirty] = useState<Partial<IFormValues>>();

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const 제출가능한상태인가 = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="example@gamil.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={!!dirty?.email && !!errors.email}
        helpMessage={!!dirty?.email && errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={!!dirty?.password && !!errors.password}
        helpMessage={!!dirty?.password && errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={!!dirty?.rePassword && !!errors.rePassword}
        helpMessage={!!dirty?.rePassword && errors.rePassword}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="홍길동"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={!!dirty?.name && !!errors.name}
        helpMessage={!!dirty?.name && errors.name}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={!제출가능한상태인가}
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

export default Form;

function validate(formValues: IFormValues) {
  let errors: Partial<IFormValues> = {};

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력해주세요';
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8자 이상 입력해주세요';
  } else if (!validator.equals(formValues.password, formValues.rePassword)) {
    errors.rePassword = '비밀번호를 확인해주세요';
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2자 이상 입력해주세요';
  }

  return errors;
}
