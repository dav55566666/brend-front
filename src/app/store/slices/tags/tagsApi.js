"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk(
    "tags/fetchTags",
    async function () {
        const {data: tagsData} = await axios.get("http://brand.speedshop.am/api/getTags");
        return tagsData
    }
)