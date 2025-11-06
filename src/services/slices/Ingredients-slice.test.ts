import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { getIngredients } from './Ingredients-slice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 50,
    fat: 10,
    carbohydrates: 30,
    calories: 200,
    price: 1000,
    image: 'https://burger/bun.png',
    image_mobile: 'https://burger/bun-mobile.png',
    image_large: 'https://burger/bun-large.png'
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 100,
    fat: 50,
    carbohydrates: 10,
    calories: 500,
    price: 300,
    image: 'https://burger/meat.png',
    image_mobile: 'https://burger/meat-mobile.png',
    image_large: 'https://burger/meat-large.png'
  },
  {
    _id: '3',
    name: 'Помидор',
    type: 'main',
    proteins: 50,
    fat: 30,
    carbohydrates: 5,
    calories: 250,
    price: 80,
    image: 'https://burger/tomato.png',
    image_mobile: 'https://burger/tomato-mobile.png',
    image_large: 'https://burger/tomato-large.png'
  }
];

describe('Проверка Ingredients-slice', () => {
  it('Action Request', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
    store.dispatch(getIngredients.pending('', undefined));

    const state = store.getState().ingredients;
    expect(state.loading).toBe(true);
  });

  it('Action Success', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
    store.dispatch(getIngredients.fulfilled(mockIngredients, '', undefined));

    const state = store.getState().ingredients;
    expect(state.loading).toBe(false);
    expect(state.all).toEqual(mockIngredients);
  });

  it('Action Failed', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
    store.dispatch(getIngredients.rejected(new Error('Ошибка'), '', undefined));

    const state = store.getState().ingredients;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
