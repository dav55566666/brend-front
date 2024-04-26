import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByTag = createAsyncThunk(
    "products/fetchProductsByTag",
    async function ({tagsId, limit}) {
        const {data: productsByTagData} = await axios.post(`https://back.brend-instrument.ru/api/productsByTeg/${limit}`, {ids: [...tagsId], headers: {"Content-Type": "application/json"}})
        return productsByTagData;
    }
) 

export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct", 
    async function ({slug}) {
        const {data: productSinglData} = await axios.get(`https://back.brend-instrument.ru/api/singleProduct/${slug}`, {headers: {"Content-Type": "application/json"}})
        
        return productSinglData
    }
)

export const fetchTopProducts = createAsyncThunk(
    "products/fetchTopProducts",
    async function ({limit}) {
        const {data: topProductData} = await axios.get(`https://back.brend-instrument.ru/api/top-products/${limit}`)
        return topProductData
    }
)