import { configureStore } from '@reduxjs/toolkit';
import feedReducer, { getFeed, initialState } from './Feed-slice';
import { TFeedsResponse } from '../../utils/burger-api';

const mockFeed: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: ['12', '3'],
      status: 'done',
      name: 'Вкусный бургер',
      createdAt: '',
      updatedAt: '',
      number: 12345
    },
    {
      _id: '2',
      ingredients: ['23', '18', '41'],
      status: 'done',
      name: 'Очень вкусный бургер',
      createdAt: '',
      updatedAt: '',
      number: 54321
    }
  ],
  total: 10,
  totalToday: 5
};

describe('Проверка Feed-slice', () => {
  it('Action Request', () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });
    store.dispatch(getFeed.pending('', undefined));

    const state = store.getState().feed;
    expect(state.loading).toBe(true);
  });

  it('Action Success', () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });
    store.dispatch(getFeed.fulfilled(mockFeed, '', undefined));

    const state = store.getState().feed;
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
  });

  it('Action Failed', () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });
    store.dispatch(getFeed.rejected(new Error('Ошибка'), '', undefined));

    const state = store.getState().feed;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
