
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { AnyAction } from "redux";

export interface Article {
  multimedia: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  title: string;
  source: string;
  url: string;
  published_date: string;
  abstract: string;
}

export interface NytDoc {
    multimedia?: Array<{
      url: string;
      width?: number;
      height?: number;
    }>;
    headline?: {
      main: string;
    };
    source: string;
    web_url: string;
    pub_date: string;
    abstract: string;
  }

  interface NewsState {
    allArticles: Article[];
    displayedArticles: Article[];
    itemsToShow: number;
    loading: boolean;
  }
  
  const initialState: NewsState = {
    allArticles: [],
    displayedArticles: [],
    itemsToShow: 10,
    loading: false,
  };
  
  const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
      setArticles: (state, action: PayloadAction<Article[]>) => {
        state.allArticles = action.payload.reverse();
        state.displayedArticles = action.payload.slice(0, state.itemsToShow);
        state.loading = false
      },
      loadMore: (state) => {
        state.itemsToShow += 5;
        state.displayedArticles = state.allArticles.slice(0, state.itemsToShow);
        state.loading = false
      },
      startLoading: (state) => {
        state.loading = true
      },
      finishLoading: (state) => {
        state.loading = false
      }
    },
    extraReducers: (builder) => {
      builder.addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...(action.payload?.news ?? {})
        };
      });
    },
  });
  
  export const { setArticles, loadMore, startLoading, finishLoading } = newsSlice.actions;
  export default newsSlice.reducer;
