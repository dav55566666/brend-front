import { createSlice } from "@reduxjs/toolkit";
import { fetchNews, fetchNewsSingl } from "./newsApi";

export const newsSlice = createSlice({
    name: "news",
    initialState: {
        newsData: {},
        newsSlingleData: {},
        homeNewsData: []
    },

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, {payload}) => {
            if(payload) {
                state.newsData = {...payload}
                state.homeNewsData = [...payload.data.slice(0, 3)]
            }
        }),
        builder.addCase(fetchNewsSingl.fulfilled, (state, {payload}) => {
            if(payload) {
                state.newsSlingleData = {...payload}
            }
        })
    }
})

export const selectNews = state => state.news
export const newsReducer = newsSlice.reducer