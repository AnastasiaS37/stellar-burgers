import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
};

const initialState: TFeedState = {
  orders: []
};

const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push({ ...action.payload });
    }
  }
});

export default FeedSlice.reducer;
export const { addOrder } = FeedSlice.actions;
