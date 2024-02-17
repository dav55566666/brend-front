"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { categoryReducer } from "./slices/category/categorySlice"
import { tagsReducer } from "./slices/tags/tagsSlice"
import { productsReducer } from "./slices/products/productsSlice"
import { brendsReducer } from "./slices/brends/brendsSlice"
import { usersReducer } from "./slices/users/usersSlice"
import { bannersReducer } from "./slices/banners/bannersSlice"

const rootReducers = combineReducers({
    category: categoryReducer,
    tags: tagsReducer,
    products: productsReducer,
    brends: brendsReducer,
    users: usersReducer,
    banners: bannersReducer
})

export default configureStore({
    reducer: rootReducers
})