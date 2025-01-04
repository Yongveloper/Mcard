import { getCards } from '@/remote/card';
import { useInfiniteQuery } from 'react-query';
import ListRow from '../shared/ListRow';
import { flatten } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback } from 'react';

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam);
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible;
      },
    },
  );

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (!data) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {cards.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback && <div>{card.payback}</div>}
            withArrow={true}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CardList;
