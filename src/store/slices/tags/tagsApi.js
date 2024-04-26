"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk(
    "tags/fetchTags",
    async function ({fetch, limit}) {
        if(fetch) {
            console.log(fetch);
            const {data: tagsData} = await axios.get(`https://back.brend-instrument.ru/api/getTags`);
            const tagsId = await tagsData.map(el => {
                return el.id
            })
            const {data: productsByTagData} = await axios.post(`https://back.brend-instrument.ru/api/productsByTeg/${limit}`, {ids: [...tagsId], headers: {"Content-Type": "application/json"}})
            return productsByTagData
        }
    }
)

export const fetchSortTags = createAsyncThunk(
    "tags/fetchSortTags",
    async function () {
        const {data: sortTagsData} = await axios.get(`https://back.brend-instrument.ru/api/getTags`);
        return sortTagsData
    }
)