import rootReducer from './rootReducer';
import { initialState as constructorInitialState } from './slices/Constructor-slice';
import { initialState as ingredientsInitialState } from './slices/Ingredients-slice';
import { initialState as orderInitialState } from './slices/Order-slice';
import { initialState as feedInitialState } from './slices/Feed-slice';
import { initialState as userInitialState } from './slices/User-slice';

describe('Проверка rootReducer', () => {
  it('Инициализация с начальными состояниями всех слайсов', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      burgerConstructor: constructorInitialState,
      ingredients: ingredientsInitialState,
      order: orderInitialState,
      feed: feedInitialState,
      user: userInitialState
    });
  });

  it('Корректное начальное состояние при некорректном экшене', () => {
    const initialReducerState = rootReducer(undefined, { type: '@@INIT' });
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialReducerState);
  });
});
