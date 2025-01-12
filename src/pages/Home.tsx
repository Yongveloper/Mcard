import { Suspense } from 'react';

import AdBanners from '@/components/home/AdBanners';
import CardList from '@/components/home/CardList';
import Top from '@/components/shared/Top';
import ListRow from '@/components/shared/ListRow';

function Home() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 좋은 카드를 모아봤어요"
      />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, index) => (
          <ListRow.Skeleton key={index} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  );
}

export default Home;
