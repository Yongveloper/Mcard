import { COLLECTIONTS } from '@/constants';
import { ICard } from '@/models/card';
import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
} from 'firebase/firestore';
import { store } from './firebase';

/**
 * @param pageParam 지금 보이고 있는 맨 마지막 요소
 */
export async function getCards(pageParam?: QuerySnapshot<ICard>) {
  const cardQuery = !pageParam
    ? query(collection(store, COLLECTIONTS.CARD), limit(10))
    : query(
        collection(store, COLLECTIONTS.CARD),
        startAfter(pageParam),
        limit(10),
      );

  const cardSnapshot = await getDocs(cardQuery);

  const lastVisible = cardSnapshot.docs.at(-1);

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ICard),
  }));

  return { items, lastVisible };
}
