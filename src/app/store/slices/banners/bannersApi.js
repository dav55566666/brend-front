"use client";

import { baseLink } from "../../../layout";

const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export  const fetchBanners = createAsyncThunk(
    "banners/fetchBanners",
    async function () {
        const bannersData = []
        await axios.get(`${baseLink}/api/get-banners`, {headers: {"Content-Type": "application/json"}}).then(res => {
            bannersData.push(
                ...res.data.map(el => ({
                    id: el.id,
                    img: baseLink + "/" + el.image
                }))
            )
        })
        return bannersData
    }
)