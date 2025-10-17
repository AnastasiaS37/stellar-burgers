import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './slices/Constructor-slice';
import ingredientsReducer from './slices/Ingredients-slice';
import orderReducer from './slices/Order-slice';
import feedReducer from './slices/Feed-slice';

const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer
});

export default rootReducer;
