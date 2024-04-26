import { createSlice } from "@reduxjs/toolkit";
import { fetchSortTags, fetchTags } from "./tagsApi"

const title = (title) => {
    return title === "akcii-i-specpredlozheniya" ? "Акции" : title === "novye-postupleniya-uvidet-pervym" ? "Новинки" : "Бестселлеры"
}

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        tagsData: [],
        sortTagsData: [],
        getTags: false
    },
    reducers: {
        toggleFetchTags: (state) => {
            state.getTags = true
        },
        toggleSortTags: (state, {payload}) => {
            state.sortTagsData = [
                ...state.sortTagsData.map(el => ({
                    ...el,
                    toggle: el.id === payload.id ? payload.active : false
                }))
            ]
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTags.fulfilled, (state, {payload}) => {
            if(payload) {
                state.tagsData = [...payload]
            }
        }),
        builder.addCase(fetchSortTags.fulfilled, (state, {payload}) => {
            state.sortTagsData = [
                ...payload.slice(0, 3).map(el => ({
                    ...el,
                    name: title(el.label),
                    toggle: false
                }))
            ]
        })
    }
})

export const selectTags = state => state.tags;
export const {toggleFetchTags, toggleSortTags} = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer