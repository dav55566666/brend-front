"use client";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory, fetchSingleCategory, fetchTopCategory } from "./categoryApi.js";


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryData: [],
        topCategoryData: [],
        singleCategoryData: {}
    },
    reducers: {
        toggleFilterValues: (state, {payload}) => {
            state.singleCategoryData = {
                ...state.singleCategoryData,
                attributes: [
                    ...state.singleCategoryData.attributes.map(el => ({
                        ...el,
                        toggle: el.id === payload.id ? !el.toggle : el.toggle
                    }))
                ],
            }
            console.log(state.singleCategoryData);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.categoryData = action.payload.map(el => ({
                ...el,
                id: el.id.toString(),
            }))
        }),
        builder.addCase(fetchTopCategory.fulfilled, (state, action) => {
            state.topCategoryData = action.payload.map(el => ({
                ...el,
                id: el.id.toString(),
                img: "http://brand.speedshop.am/" + el.image
            }))
        }),
        builder.addCase(fetchSingleCategory.fulfilled, (state, {payload}) => {
            state.singleCategoryData = {...payload}
        })
    },
})
export const selectCategory = state => state.category;
export const {toggleFilterValues} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer