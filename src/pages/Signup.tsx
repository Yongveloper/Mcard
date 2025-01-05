import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import Form from '@/components/signup/Form';
import { IFormValues } from '@/models/signup';

import { auth, store } from '@/remote/firebase';
import { COLLECTIONTS } from '@/constants';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formValues: IFormValues) => {
    const { email, password, name } = formValues;

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(user, {
      displayName: formValues.name,
    });

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    await setDoc(doc(collection(store, COLLECTIONTS.USER), user.uid), newUser);

    navigate('/', { replace: true });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupPage;
