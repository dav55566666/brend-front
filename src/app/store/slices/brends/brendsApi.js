import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrends = createAsyncThunk(
    "brends/fetchBrends",
    async function (payload) {
        const brendsData = []
        await axios.get("http://brand.speedshop.am/api/get-brands/30").then(res => {
            brendsData.push(...res.data)
        })
        return brendsData
    }
)

export const fetchSingleBrend = createAsyncThunk(
    "brends/fetchSingleBrend",
    async function (payload) {
        const {data: singleBrend} = await axios.get("http://brand.speedshop.am/api/get-single-brands/"+payload.brendId+"")
        return singleBrend
    }
)