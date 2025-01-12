import styled from '@emotion/styled';

import { useUser } from '@/hooks/auth/useUser';
import { ChangeEvent } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { app, storage, store } from '@/remote/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { COLLECTIONTS } from '@/constants';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/atom/user';

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number;
  mode?: 'default' | 'upload';
}) {
  const user = useUser();
  const setUser = useSetAtom(userAtom);

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const currentUser = getAuth(app).currentUser;

    if (!files || !user || !currentUser) {
      return;
    }

    const fileName = files[0].name;
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`);

    const uploaded = await uploadBytes(storageRef, files[0]);

    const downloadUrl = await getDownloadURL(uploaded.ref);

    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    });

    await updateDoc(
      doc(collection(store, COLLECTIONTS.USER), currentUser.uid),
      {
        photoURL: downloadUrl,
      },
    );

    setUser({
      ...user,
      photoURL: downloadUrl,
    });
  };

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' && (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export default MyImage;
