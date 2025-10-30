import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { getFeed } from '../../services/slices/Feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.feed.orders);
  const loading = useSelector((state: RootState) => state.feed.loading);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
