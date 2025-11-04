import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  all: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  all: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.buns = action.payload.filter(
          (item: TIngredient) => item.type === 'bun'
        );
        state.mains = action.payload.filter(
          (item: TIngredient) => item.type === 'main'
        );
        state.sauces = action.payload.filter(
          (item: TIngredient) => item.type === 'sauce'
        );
        state.all = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
