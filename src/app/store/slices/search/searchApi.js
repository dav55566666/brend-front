import { baseLink } from "../../../layout";

const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const fetchSearch = createAsyncThunk(
    "search/fetchSearch",
    async function (payload) {
        const {data: searchProductData} = await axios.get(`${baseLink}/api/search/10?query=${payload.value}`, {headers: {"Content-Type": "application/json"}})
        
        return searchProductData
    }
)