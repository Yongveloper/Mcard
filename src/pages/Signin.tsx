import Form from '@/components/signin/Form';
import { useAlertContext } from '@/contexts/AlertContext';
import { IFormValues } from '@/models/signin';
import { auth } from '@/remote/firebase';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SigninPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = useCallback(async (formValues: IFormValues) => {
    const { email, password } = formValues;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (location.state?.from) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (e) {
      // firebase error
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/invalid-credential') {
          open({
            title: '계정의 정보를 다시 확인해주세요.',
            onButtonClick: () => {},
          });

          return;
        }

        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        });
      }
    }
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default SigninPage;
