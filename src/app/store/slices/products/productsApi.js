import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByTag = createAsyncThunk(
    "products/fetchProductsByTag",
    async function (payload) {
        const tagsId = []
        tagsId.push(
            ...payload.tags.map(el => el.id)
            )
        const {data: productsByTagData} = await axios.post("http://brand.speedshop.am/api/productsByTeg/"+payload.limit+"", {ids: [1, 2, 3]})
        
        return productsByTagData;
    }
) 

export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct", 
    async function ({id}) {
        const {data: productSinglData} = await axios.get(`http://brand.speedshop.am/api/singleProduct/${id}`)
        return productSinglData
    }
)