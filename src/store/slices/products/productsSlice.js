import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsByTag, fetchSingleProduct, fetchTopProducts } from "./productsApi";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        productsByTagData: [],
        singlProductData: {},
        topProductsData: [],
        preOrder: {
            id: "",
            price: "",
            toggle: false
        }
    },
    reducers: {
        counter: (state, {payload}) => {
            state.singlProductData = {
                ...state.singlProductData,
                count: payload.type === "+" ? state.singlProductData.count + 1 : state.singlProductData.count - 1
            }
        },
        preOrder: (state, {payload}) => {
            state.preOrder.id = payload.id;
            state.preOrder.price = payload.price / 100 * 10
            state.preOrder.toggle = payload.toggle
            state.preOrder.name = payload.name
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsByTag.fulfilled, (state, {payload}) => {
            if(payload) {
                state.productsByTagData = [...payload]
            }
        }),
        builder.addCase(fetchSingleProduct.fulfilled, (state, {payload}) => {
            if(payload) {
                state.singlProductData = {
                    ...payload,
                    count: 1,
                }
            }
        }),
        builder.addCase(fetchTopProducts.fulfilled, (state, {payload}) => {
            if(payload) {
                state.topProductsData = [...payload.products] 
            }
        })
    }
})

export const selectProducts = state => state.products
export const { counter, preOrder } = productsSlice.actions
export const productsReducer = productsSlice.reducer