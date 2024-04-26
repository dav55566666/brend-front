import { createSlice } from "@reduxjs/toolkit";
import { fetchSearch } from "./searchApi"

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchProductsData: []
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchSearch.fulfilled, (state, {payload}) => {
            if(payload) {
                state.searchProductsData = [...payload.products]
            }
        })
    }
})

export const selectSearch = state => state.search
export const searchReducer = searchSlice.reducer