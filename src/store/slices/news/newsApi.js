import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parse from 'html-react-parser';

export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async function ({limit, page}) {
        const {data: newsData} = await axios.get(`https://back.brend-instrument.ru/api/get-news/${limit}?page=${page}`)
        return newsData
    }
)

export const fetchNewsSingl = createAsyncThunk(
    "news/fetchNewsSingle",
    async function ({newsId}) {
        const {data: newsSingleData} = await axios.get(`https://back.brend-instrument.ru/api/get-single-news/${newsId}`)
        return newsSingleData
    }
)