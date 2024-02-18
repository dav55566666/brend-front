import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseLink } from "../../../layout"

export const fetchAddToCart = createAsyncThunk(

    "cart/fetchAddToCart",

    async function ({productCount, productId, userToken}) {

        const {data: addToCartData} = await axios.get(`${baseLink}/api/auth/add-cart/${productId}/${productCount}`, { headers: {Authorization: "Bearer " + userToken, "Content-Type": "application/json" }})

        return addToCartData

    }
)

export const fetchCart = createAsyncThunk(

    "cart/fetchCart",

    async function () {

        const {data: cartData} = await axios.get(`${baseLink}/api/auth/get-cart`, { headers: {Authorization: "Bearer " + userToken, "Content-Type": "application/json" }})

        return cartData

    }
)