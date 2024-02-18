import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./usersApi"
import axios from "axios";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        loginData: {},
        usersData: {}
    },
    reducers: {
        logIn(state, { payload }) {
            state.loginData = { ...payload };
            console.log(payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.usersData = { ...action.payload }
        })
    }
})

export const selectUsers = state => state.users
export const { logIn } = usersSlice.actions;
export const usersReducer = usersSlice.reducer