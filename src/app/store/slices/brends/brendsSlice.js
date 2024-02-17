"use client";
import { createSlice } from "@reduxjs/toolkit";
import { fetchBrends, fetchSingleBrend } from "./brendsApi";

export const brendsSlice = createSlice({
    name: "brends",
    initialState: {
        brendsData: [],
        singleBrend: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchBrends.fulfilled, (state, action) => {
            state.brendsData = action.payload
        })
        builder.addCase(fetchSingleBrend.fulfilled, (state, {payload}) => {
            state.singleBrend = payload
        })
    }
})

export const selectBrends = state => state.brends;
export const brendsReducer = brendsSlice.reducer