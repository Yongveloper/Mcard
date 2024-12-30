import { COLLECTIONTS } from '@/constants';
import { ICard } from '@/models/card';
import { collection, getDocs } from 'firebase/firestore';
import { store } from './firebase';

export async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECTIONTS.CARD));

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ICard),
  }));
}
