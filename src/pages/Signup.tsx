import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import Form from '@/components/signup/Form';
import { IFormValues } from '@/models/signup';

import { auth, store } from '@/remote/firebase';
import { COLLECTIONTS } from '@/constants';

function SignupPage() {
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

    // TODO: 로그인
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupPage;
