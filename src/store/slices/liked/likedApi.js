import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLiked = createAsyncThunk(
    "liked/fetchLiked",
    async function ({ userToken, guestUserId }) {
        if (userToken) {
            const { data: likedData } = await axios.get(`https://back.brend-instrument.ru/api/wishlist/get-wishlist/20?page=1&uuid=${guestUserId ? guestUserId : ""}`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" } })
            return likedData
        }
        if (guestUserId) {
            const { data: likedData } = await axios.get(`https://back.brend-instrument.ru/api/wishlist/get-wishlist/20?page=1&uuid=${guestUserId ? guestUserId : ""}`)
            return likedData
        }
    }
)

export const fetchLikedAdd = createAsyncThunk(
    "liked/fetchLikedAdd",
    async function ({ userToken, productId, guestUserId }) {
        if (userToken) {
            const { data: addLikedData } = await axios.get(`https://back.brend-instrument.ru/api/wishlist/add-wishlist/${productId}/1?uuid=${guestUserId ? guestUserId : ""}`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" }, id: productId })
            return addLikedData
        } else {
            const { data: addLikedData } = await axios.get(`https://back.brend-instrument.ru/api/wishlist/add-wishlist/${productId}/1?uuid=${guestUserId ? guestUserId : ""}`, { headers: { "Content-Type": "application/json" } })
            return addLikedData
        }
    }
)

export const fetchLikedRemove = createAsyncThunk(
    "liked/fetchLikedRemove",
    async function ({ userToken, productId, guestUserId }) {
        if (userToken) {
            const { data: likedData } = await axios.get(`https://back.brend-instrument.ru/api/wishlist/delete-wishlist/${productId}?uuid=${guestUserId ? guestUserId : ""}`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" } })
            return likedData
        }
        if (guestUserId) {
            const { data: likedData } = await axios.get(`https://back.brend-instrument.ru/api/wishlist/delete-wishlist/${productId}?uuid=${guestUserId ? guestUserId : ""}`)
            return likedData
        }
    }
)