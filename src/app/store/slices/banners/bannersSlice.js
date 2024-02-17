"use client";
const { createSlice } = require("@reduxjs/toolkit");
const { fetchBanners } = require("./bannersApi");

const bannersSlice = createSlice({
    name: "banners",
    initialState: {
        bannersData: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            state.bannersData = action.payload
        })
    }
})

export const selectBanners = state => state.banners;
export const bannersReducer = bannersSlice.reducer;