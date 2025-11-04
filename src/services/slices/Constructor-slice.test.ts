import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  initialState
} from './Constructor-slice';
import { TIngredient } from '@utils-types';

const bun: TIngredient = {
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
};

const main1: TIngredient = {
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
};

const main2: TIngredient = {
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
};

describe('Проверка Constructor-slice', () => {
  it('Добавление булки', () => {
    const state = constructorReducer(initialState, addBun(bun));
    expect(state.bun).toMatchObject(bun);
  });

  it('Добавление ингредиента', () => {
    const state = constructorReducer(initialState, addIngredient(main1));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject(main1);
  });

  it('Удаление ингредиента', () => {
    const burgerState = constructorReducer(initialState, addIngredient(main1));
    const id = burgerState.ingredients[0].id;
    const state = constructorReducer(burgerState, removeIngredient(id));

    expect(state.ingredients).toHaveLength(0);
  });

  it('Перемещение ингредиента', () => {
    let burgerState = constructorReducer(initialState, addIngredient(main1));
    burgerState = constructorReducer(burgerState, addIngredient(main2));
    const state = constructorReducer(burgerState, moveIngredientUp(1));

    expect(state.ingredients[0].name).toBe('Помидор');
    expect(state.ingredients[1].name).toBe('Котлета');
  });
});
