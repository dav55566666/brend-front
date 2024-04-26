"use client";
const { createSlice } = require("@reduxjs/toolkit");
const { fetchBanners, fetchBannerSlides } = require("./bannersApi");

const bannersSlice = createSlice({
    name: "banners",
    initialState: {
        bannersData: [],
        bannerSlidesData: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchBanners.fulfilled, (state, {payload}) => {
            if(payload) {
                state.bannersData = [...payload];
            }
        }),
        builder.addCase(fetchBannerSlides.fulfilled, (state, {payload}) => {
            if(payload) {
                state.bannerSlidesData = [...payload];
            }
        })
    }
})

export const selectBanners = state => state.banners;
export const bannersReducer = bannersSlice.reducer;
