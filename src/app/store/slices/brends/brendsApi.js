import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseLink } from "../../../layout";

export const fetchBrends = createAsyncThunk(
    "brends/fetchBrends",
    async function (payload) {
        const brendsData = []
        await axios.get(`${baseLink}/api/get-brands/30`, {headers: {"Content-Type": "application/json"}}).then(res => {
            brendsData.push(...res.data)
        })
        return brendsData
    }
)

export const fetchSingleBrend = createAsyncThunk(
    "brends/fetchSingleBrend",
    async function (payload) {
        const {data: singleBrend} = await axios.get(`${baseLink}/api/get-single-brands/${payload.brendId}`, {headers: {"Content-Type": "application/json"}})
        return singleBrend
    }
)