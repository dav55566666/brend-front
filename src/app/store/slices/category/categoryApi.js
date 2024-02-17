"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async function () {
        const categoryData = [] 
        await axios.get("http://brand.speedshop.am/api/category/").then(res => {
            categoryData.push(...res.data)
        })
        return categoryData
    }
)

export const fetchTopCategory = createAsyncThunk(
    "category/fetchTopCategory",
    async function (payload) {
        const topCategoryData = [] 
        await axios.get("http://brand.speedshop.am/api/top-category/"+payload.limit+"").then(res => {
            topCategoryData.push(
                ...res.data.map(el => ({
                    ...el,
                    image: "https://brendinstrument.ru/" + el.image
                }))
            )
        })
        return topCategoryData
    }
)

export const fetchSingleCategory = createAsyncThunk(
    "category/fetchSingleCategory",
    async function ({categoryId, limit}) {
        let singleCategoryData = {}
        await axios.get(`http://brand.speedshop.am/api/singleCat/${categoryId}/${limit}`).then(res => {
            singleCategoryData = {
                attributes: [
                    ...res.data.attributes.map(el => ({
                        attribute_id: el.attribute_id,
                        created_at: el.created_at,
                        id: el.id,
                        pivot: el.pivot,
                        title: el.title,
                        type: el.type,
                        updated_at: el.updated_at,
                        values: [...el.values],
                        toggle: false
                    }))
                ],
                banner: res.data.banner,
                category_id: res.data.category_id,
                created_at: res.data.created_at,
                description: res.data.description,
                id: res.data.id,
                image: res.data.image,
                meta_desc: res.data.meta_desc,
                meta_key: res.data.meta_key,
                meta_title: res.data.meta_title,
                parent_id: res.data.parent_id,
                products: res.data.products,
                slug: res.data.slug,
                status: res.data.status,
                title: res.data.title,
                top: res.data.top,
                updated_at: res.data.updated_at
            }
            console.log(singleCategoryData);
        })
        return singleCategoryData
    }
)