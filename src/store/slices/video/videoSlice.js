import { createSlice } from "@reduxjs/toolkit";
import { fetchVideos } from "./videoApi";

export const videoSlice = createSlice({
    name: "video",
    initialState: {
        videosData: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVideos.fulfilled, (state, {payload}) => {
            if(payload) {
                state.videosData = {...payload}
            }
        })
    }
})

export const selectVideo = state => state.video
export const videoReducer = videoSlice.reducer