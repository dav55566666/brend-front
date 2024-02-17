import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsByTag, fetchSingleProduct } from "./productsApi";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        productsByTagData: [],
        singlProductData: {}
    },
    reducers: {
        counter: (state, {payload}) => {
            state.singlProductData = {
                ...state.singlProductData,
                count: payload.type === "+" ? state.singlProductData.count + 1 : state.singlProductData.count - 1
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsByTag.fulfilled, (state, action) => {
            if (state.productsByTagData?.length <= 1) {
                state.productsByTagData = [...action.payload.map(el => el.products)]
            }
        }),
        builder.addCase(fetchSingleProduct.fulfilled, (state, {payload}) => {
            state.singlProductData = {
                ...payload,
                count: 1,
                image: "https://brendinstrument.ru/image/" + payload.image,
                images: [
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                    {
                        id: payload.id + 1,
                        img: "https://brendinstrument.ru/image/" + payload.image
                    },
                ]
            }
        })
    }
})

export const selectProducts = state => state.products
export const { counter } = productsSlice.actions
export const productsReducer = productsSlice.reducer