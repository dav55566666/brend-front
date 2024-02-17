"use client";
const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export  const fetchBanners = createAsyncThunk(
    "banners/fetchBanners",
    async function () {
        const bannersData = []
        await axios.get("http://brand.speedshop.am/api/get-banners").then(res => {
            bannersData.push(
                ...res.data.map(el => ({
                    id: el.id,
                    img: "http://brand.speedshop.am/" + el.image
                }))
            )
        })
        return bannersData
    }
)