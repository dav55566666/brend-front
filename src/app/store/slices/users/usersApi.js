"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseLink } from "../../../layout";

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async function (payload) {
        const {data: userData} = await axios.get(`${baseLink}/api/auth/user`, {
            headers: {
                Authorization: "Bearer " + payload.userToken,
                "Content-Type": "application/json"
            }
        });
        return userData
    }
)