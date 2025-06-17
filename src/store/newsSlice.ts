import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Article, NewsState } from '../types';
import newsApi from '../api/newsApi';
import { getCurrentDate, getYearAndMonth, getPreviousMonth } from '../utils/dateUtils';

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ year, month }: { year: number; month: number }, { rejectWithValue }) => {
    try {
      const response = await newsApi.getArchiveByMonth(year, month);
      return response.docs;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  async (_, { rejectWithValue }) => {
    try {
      const { year, month } = getYearAndMonth();
      const response = await newsApi.getArchiveByMonth(year, month);
      return response.docs;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchPreviousMonthNews = createAsyncThunk(
  'news/fetchPreviousMonthNews',
  async (date: Date, { rejectWithValue }) => {
    try {
      const { year, month } = getPreviousMonth(date);
      const response = await newsApi.getArchiveByMonth(year, month);
      return response.docs;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

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
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
        state.lastUpdated = getCurrentDate();
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLatestNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        
        const existingUrls = new Set(state.articles.map(article => article.web_url));
        const newArticles = action.payload.filter(article => !existingUrls.has(article.web_url));
        state.articles = [...newArticles, ...state.articles];
        state.lastUpdated = getCurrentDate();
      })
      .addCase(fetchLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPreviousMonthNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviousMonthNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        
        state.articles = [...state.articles, ...action.payload];
        state.lastUpdated = getCurrentDate();
      })
      .addCase(fetchPreviousMonthNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;