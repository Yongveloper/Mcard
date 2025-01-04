import AdBanners from '@/components/home/AdBanners';
import CardList from '@/components/home/CardList';
import Top from '@/components/shared/Top';

function Home() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 좋은 카드를 모아봤어요"
      />
      <AdBanners />
      <CardList />
    </div>
  );
}

export default Home;
