"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async function ({limit}) {
        const {data: categoryData} = await axios.get(`https://back.brend-instrument.ru/api/category`, {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}})
        return categoryData
    }
)

export const fetchTopCategory = createAsyncThunk(
    "category/fetchTopCategory",
    async function ({limit}) {
        const {data: topCategoryData} = await axios.get(`https://back.brend-instrument.ru/api/top-category/${limit}`, {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}})
        return topCategoryData
    }
)

export const fetchSingleCategory = createAsyncThunk(
    "category/fetchSingleCategory",
    async function ({categorySlug, limit}) {
        const {data: singleCategoryData} = await axios.get(`https://back.brend-instrument.ru/api/singleCat/${categorySlug}/${limit ? limit : 20}`, {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}})
        return singleCategoryData
    }
)

export const fetchSinglCategoryChildren = createAsyncThunk(
    "category/fetchSinglCategoryChildren",
    async function ({categoryId, limit}) {
        const {data: singleCategoryChildrenData} = await axios.get(`https://back.brend-instrument.ru/api/category/${categoryId}`, {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}})
        return singleCategoryChildrenData
    }
)

export const fetchFilterCategory = createAsyncThunk(
    "category/fetchFilterCategory",
    async function ({filterData, categoryId, limit}) {
        const {data: filterCategoryData} = await axios.post(`https://back.brend-instrument.ru/api/filtration/${categoryId}/${limit}`, {
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            criteria: [...filterData]
        })
        return filterCategoryData
    }
)

export const fetchSortCategory = createAsyncThunk(
    "category/fetchSortCategory",
    async function ({id, categoryId, limit, filterData}) {
        const {data: sortProductsData} = await axios.post(`https://back.brend-instrument.ru/api/filtration/${categoryId}/${limit}?sort_id=${id ? id : ""}`, {
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            criteria: [...filterData]
        })
        return sortProductsData
    }
)