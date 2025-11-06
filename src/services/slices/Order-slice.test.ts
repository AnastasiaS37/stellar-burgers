import { configureStore } from '@reduxjs/toolkit';
import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  fetchUserOrders
} from './Order-slice';
import { TNewOrderResponse } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['12', '3'],
  status: 'done',
  name: 'Вкусный бургер',
  createdAt: '',
  updatedAt: '',
  number: 12345
};

const mockNewOrder: TNewOrderResponse = {
  success: true,
  name: 'Бургер',
  order: mockOrder
};

const mockOrders: TOrder[] = [
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
];

describe('Проверка Order-slice', () => {
  it('Action Request createOrder', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(createOrder.pending('', []));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(true);
  });

  it('Action Success createOrder', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(createOrder.fulfilled(mockNewOrder, '', []));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockNewOrder.order);
  });

  it('Action Failed createOrder', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(createOrder.rejected(new Error('Ошибка'), '', []));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('Action Request fetchOrderByNumber', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(fetchOrderByNumber.pending('', 3));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(true);
  });

  it('Action Success fetchOrderByNumber', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });

    store.dispatch(fetchOrderByNumber.fulfilled(mockOrder, '', 3));
    const state = store.getState().order;

    expect(state.orderByNumber).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });

  it('Action Failed fetchOrderByNumber', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(fetchOrderByNumber.rejected(new Error('Ошибка'), '', 6));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('Action Request fetchUserOrders', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(fetchUserOrders.pending('', undefined));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(true);
  });

  it('Action Success fetchUserOrders', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(fetchUserOrders.fulfilled(mockOrders, '', undefined));

    const state = store.getState().order;
    expect(state.userOrders).toEqual(mockOrders);
    expect(state.orderRequest).toBe(false);
  });

  it('Action Failed fetchUserOrders', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(
      fetchUserOrders.rejected(new Error('Ошибка'), '', undefined)
    );

    const state = store.getState().order;
    expect(state.error).toBe('Ошибка');
    expect(state.orderRequest).toBe(false);
  });
});
