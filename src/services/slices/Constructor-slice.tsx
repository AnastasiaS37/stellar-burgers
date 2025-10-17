import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  // bun: { price: number };
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = { ...action.payload, id: nanoid() };
    },
    addIngredient: (state, action) => {
      state.ingredients.push({ ...action.payload, id: nanoid() });
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      const temporary = state.ingredients[index - 1];
      state.ingredients[index - 1] = state.ingredients[index];
      state.ingredients[index] = temporary;
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      const temporary = state.ingredients[index + 1];
      state.ingredients[index + 1] = state.ingredients[index];
      state.ingredients[index] = temporary;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export default constructorSlice.reducer;
export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;
