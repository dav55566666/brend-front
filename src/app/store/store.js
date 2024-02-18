"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { categoryReducer } from "./slices/category/categorySlice"
import { tagsReducer } from "./slices/tags/tagsSlice"
import { productsReducer } from "./slices/products/productsSlice"
import { brendsReducer } from "./slices/brends/brendsSlice"
import { usersReducer } from "./slices/users/usersSlice"
import { bannersReducer } from "./slices/banners/bannersSlice"
import { searchReducer } from "./slices/search/searchSlice"
import { cartReducer } from "./slices/cart/cartSlice"

const rootReducers = combineReducers({
    category: categoryReducer,
    tags: tagsReducer,
    products: productsReducer,
    brends: brendsReducer,
    users: usersReducer,
    banners: bannersReducer,
    search: searchReducer,
    cart: cartReducer
})

export default configureStore({
    reducer: rootReducers
})