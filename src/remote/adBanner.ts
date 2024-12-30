import { COLLECTIONTS } from '@/constants';
import { IAdBanner } from '@/models/card';
import { collection, getDocs } from 'firebase/firestore';
import { store } from './firebase';

export async function getAdBanners() {
  const adBannerSnapshot = await getDocs(
    collection(store, COLLECTIONTS.ADBANNER),
  );

  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IAdBanner),
  }));
}
