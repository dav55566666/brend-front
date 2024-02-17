"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async function (payload) {
        const {data: userData} = await axios.get("http://brand.speedshop.am/api/auth/user", {
            headers: {
                Authorization: "Bearer " + payload.userToken
            }
        });
        return userData
    }
)