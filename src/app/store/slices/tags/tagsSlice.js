import { createSlice } from "@reduxjs/toolkit";
import { fetchTags } from "./tagsApi"

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        tagsData: []
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tagsData = action.payload
        })
    }
})

export const selectTags = state => state.tags;
// export const {addComment, addPost, removePost} = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer