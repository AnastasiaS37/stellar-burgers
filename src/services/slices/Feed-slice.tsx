import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const getFeed = createAsyncThunk('feed/get', async () => getFeedsApi());

const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  }
});

export default FeedSlice.reducer;
