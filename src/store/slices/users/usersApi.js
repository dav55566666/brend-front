"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async function (payload) {
        const {data: userData} = await axios.get(`https://back.brend-instrument.ru/api/auth/user`, {
            headers: {
                Authorization: "Bearer " + payload.userToken,
                "Content-Type": "application/json"
            }
            
        });
         (userData);
        return userData
    }
)

export const fetchLogin = createAsyncThunk(
    "users/fetchLogin",
    async function ({login, password}) {
        const { data: loginData } = await axios.post("https://back.brend-instrument.ru/api/auth/login", {
            email: login,
            password
        })
        return loginData;
    }
)

export const fetchOrders = createAsyncThunk(
    "users/fetchOrders",
    async function ({userToken, limit, page}) {
        const {data: orderStoryData} = await axios.get(`https://back.brend-instrument.ru/api/auth/get-orders/${limit}?page=${page}`, {
            headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json"
            }
        });
        return orderStoryData
    }
)

export const fetchOrderSingle = createAsyncThunk(
    "users/fetchOrderSingle",
    async function ({orderId, userToken}) {
        const {data: orderSingleData} = await axios.get(`https://back.brend-instrument.ru/api/auth/single-orders/${orderId}`, {
            headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json"
            }
        });
        return orderSingleData
    }
)