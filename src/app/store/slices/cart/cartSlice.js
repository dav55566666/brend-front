import { createSlice } from "@reduxjs/toolkit";
import { fetchAddToCart, fetchCart } from "./cartApi";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        addToCartData: {},
        cartData: []
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchAddToCart.fulfilled, (state, {payload}) => {
            state.addToCartData = {...payload}
        }),
        builder.addCase(fetchCart.fulfilled, (state, {payload}) => {
            state.cartData = [...payload]
        })
    }
})

export const selectCart = state => state.cart
export const cartReducer = cartSlice.reducer