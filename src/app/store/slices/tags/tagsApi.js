"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseLink } from "../../../layout";

export const fetchTags = createAsyncThunk(
    "tags/fetchTags",
    async function () {
        const {data: tagsData} = await axios.get(`${baseLink}/api/getTags`, {headers: {"Content-Type": "application/json"}});
        return tagsData
    }
)