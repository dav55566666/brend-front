import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideos = createAsyncThunk(
    "video/fetchVideos",
    async function ({limit, page}) {
        const {data: videosData} = await axios.get(`https://back.brend-instrument.ru/api/get-videos/${limit}?page=${page}`)
        return videosData
    }
)