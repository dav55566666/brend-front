import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddToCart = createAsyncThunk(
    "cart/fetchAddToCart",
    async function ({ productCount, productId, userToken, guestUserId }) {
        if(productId) {
            if (userToken) {
                const { data: addToCartData } = await axios.get(`https://back.brend-instrument.ru/api/auth/add-cart/${productId}/${productCount ? productCount : 1}`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" } })
                return addToCartData
            } else {
                const { data: addToCartData } = await axios.get(`https://back.brend-instrument.ru/api/add-cart/${productId}/${productCount ? productCount : 1}?uuid=${guestUserId ? guestUserId : ""}`, { headers: { "Content-Type": "application/json" } })
                return addToCartData
            }
        }
    }
)

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async function ({ userToken, guestUserId }) {
        if (userToken) {
            const { data: cartData } = await axios.get(`https://back.brend-instrument.ru/api/auth/get-cart`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" } })
            return cartData
        } else {
            const { data: cartData } = await axios.get(`https://back.brend-instrument.ru/api/get-cart?uuid=${guestUserId ? guestUserId : ""}`)
            return cartData
        }
    }
)

export const fetchDeleteCart = createAsyncThunk(
    "cart/fetchDeleteCart",
    async function ({ userToken, productId, guestUserId }) {
        if (userToken) {
            const { data: deleteCartData } = await axios.get(`https://back.brend-instrument.ru/api/auth/delete-cart/${productId}`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" } })
            return deleteCartData
        } else {
            const { data: deleteCartData } = await axios.get(`https://back.brend-instrument.ru/api/delete-cart/${productId}?uuid=${guestUserId ? guestUserId : ""}`, { headers: { "Content-Type": "application/json" } })
            return deleteCartData
        }
    }
)

export const fetchUpdateCart = createAsyncThunk(
    "cart/fetchUpdateCart",
    async function ({ userToken, productId, productCount, guestUserId }) {
        if (userToken) {
            const { data: updateCartData } = await axios.get(`https://back.brend-instrument.ru/api/auth/cart-update/${productId}/${productCount}`, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "application/json" } })
            return updateCartData
        } else {
            const { data: updateCartData } = await axios.get(`https://back.brend-instrument.ru/api/cart-update/${productId}/${productCount}?uuid=${guestUserId ? guestUserId : ""}`, { headers: { "Content-Type": "application/json" } })
            return updateCartData
        }
    }
)