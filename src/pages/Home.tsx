import { Suspense } from 'react';

import AdBanners from '@/components/home/AdBanners';
import CardList from '@/components/home/CardList';
import Button from '@/components/shared/Button';
import Top from '@/components/shared/Top';
import ListRow from '@/components/shared/ListRow';

function Home() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 좋은 카드를 모아봤어요"
      />
      <Button>안녕하세요</Button>
      <AdBanners />
      <Button>안녕하세요</Button>
      <Suspense
        fallback={[...new Array(10)].map((_, index) => (
          <ListRow.Skeleton key={index} />
        ))}
      >
        <CardList />
      </Suspense>
      <Button>안녕하세요</Button>
    </div>
  );
}

export default Home;
