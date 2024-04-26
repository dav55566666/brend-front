import { createSlice } from "@reduxjs/toolkit";
import { fetchLiked, fetchLikedAdd, fetchLikedRemove } from "./likedApi";

const updateLikedData = (state, payload) => {
    state.likedData = [...Object.entries(payload.cart ? payload.cart : payload).map(e => e[1])];
    state.uuId = payload.uuid;
    document.cookie = `uuId=${payload.uuid}`;
};

const loadStateFromCookie = () => {
    try {
        const cookiePairs = document.cookie.split(';');
        let likedData = [];
        let uuId = false;
        for (const pair of cookiePairs) {
            const [key, value] = pair.trim().split('=');
            if (key === 'uuId') {
                uuId = value
            }
        }
        return { likedData, uuId };
    } catch (error) {
        return { likedData: [], uuId: false };
    }
};

const initialStateFromCookie = loadStateFromCookie();
export const likedSlice = createSlice({
    name: "liked",
    initialState: initialStateFromCookie,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLiked.fulfilled, (state, { payload }) => {
            if (payload) {
                updateLikedData(state, payload);
            }
        }),
        builder.addCase(fetchLikedAdd.fulfilled, (state, { payload }) => {
            if (payload) {
                updateLikedData(state, payload);
            }
        }),
        builder.addCase(fetchLikedRemove.fulfilled, (state, { payload }) => {
            if (payload) {
                updateLikedData(state, payload);
            }
        });
    }
});

export const selectLiked = state => state.liked;
export const likedReducer = likedSlice.reducer;
