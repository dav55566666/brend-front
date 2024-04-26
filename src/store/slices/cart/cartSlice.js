"use client"
import { createSlice } from "@reduxjs/toolkit";
import { fetchAddToCart, fetchCart, fetchDeleteCart, fetchUpdateCart } from "./cartApi";

const updateCartData = (state, payload) => {
    state.cartData = [...Object.entries(payload.cart ? payload.cart : payload).map(e => e[1])];
    state.guestUserId = payload.uuid;
    document.cookie = `guestUserId=${payload.uuid}`;
};

const initialState = {
    addToCartData: {},
    cartData: [],
    guestUserId: false,
    totalPrice: 0
};

const loadStateFromCookie = () => {
    try {
        const cookiePairs = document.cookie.split(';');
        let cartData = {};
        let guestUserId = false;
        for (const pair of cookiePairs) {
            const [key, value] = pair.trim().split('=');
            if (key === 'guestUserId') {
                guestUserId = value;
            }
        }
        return { cartData, guestUserId };
    } catch (error) {
        return { cartData: {}, guestUserId: false };
    }
};

const initialStateFromCookie = loadStateFromCookie();

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialStateFromCookie,

    reducers: {
        toglleTotalPrice: (state, { payload }) => {
            state.totalPrice = payload.sum;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAddToCart.fulfilled, (state, { payload }) => {
            if (payload) {
                updateCartData(state, payload);
            }
        }),
        builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
            if (payload) {
                updateCartData(state, payload);
            }
        }),
        builder.addCase(fetchDeleteCart.fulfilled, (state, { payload }) => {
            if (payload) {
                updateCartData(state, payload);
            }
        }),
        builder.addCase(fetchUpdateCart.fulfilled, (state, { payload }) => {
            if (payload) {
                updateCartData(state, payload);
            }
        })
    }
});

export const selectCart = state => state.cart;
export const { toglleTotalPrice } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
