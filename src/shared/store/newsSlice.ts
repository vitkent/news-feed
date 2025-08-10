import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { TNewsResponse, TNewsState } from '../types';

export const fetchNews = createAsyncThunk<
  TNewsResponse,
  number,
  { rejectValue: string }
>(
  'news/fetchNews',
  async (skip: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`);

      if (!response.ok) {
        throw new Error('Server error!');
      }

      const data: TNewsResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

const initialState: TNewsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  hasMore: true,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<TNewsResponse>) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.posts];
        state.total = action.payload.total;
        state.skip = state.items.length;
        state.hasMore = state.items.length < action.payload.total;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
