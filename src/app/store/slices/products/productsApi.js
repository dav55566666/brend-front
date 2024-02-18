import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseLink } from "../../../layout";

export const fetchProductsByTag = createAsyncThunk(
    "products/fetchProductsByTag",
    async function (payload) {
        const tagsId = []
        tagsId.push(
            ...payload.tags.map(el => el.id)
            )
        const {data: productsByTagData} = await axios.post(`${baseLink}/api/productsByTeg/${payload.limit}`, {ids: [1, 2, 3], headers: {"Content-Type": "application/json"}})
        
        return productsByTagData;
    }
) 

export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct", 
    async function ({id}) {
        const {data: productSinglData} = await axios.get(`${baseLink}/api/singleProduct/${id}`, {headers: {"Content-Type": "application/json"}})
        return productSinglData
    }
)