import { COLLECTIONTS } from '@/constants';
import { IApplyValues } from '@/models/apply';
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { store } from './firebase';

export async function applyCard(applyValues: IApplyValues) {
  return addDoc(collection(store, COLLECTIONTS.CARD_APPLY), applyValues);
}

export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string;
  userId: string;
  applyValues: Partial<IApplyValues>;
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONTS.CARD_APPLY),
      where('cardId', '==', cardId),
      where('userId', '==', userId),
    ),
  );

  const [applied] = snapshot.docs;

  updateDoc(applied.ref, applyValues);
}
