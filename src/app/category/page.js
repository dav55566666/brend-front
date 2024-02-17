"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectTags } from "../store/slices/tags/tagsSlice";
import { fetchTags } from "../store/slices/tags/tagsApi";
import { fetchProductsByTag } from "../store/slices/products/productsApi";
import Catalog from "../components/Catalog/Catalog"
import Products from "../components/Products/Products";
import { useEffect } from "react";


export default function CatalogPage() {
    const dispatch = useDispatch()
    const { tagsData } = useSelector(selectTags)
    useEffect(() => {
        if (!tagsData.length) {
            dispatch(fetchTags())
        }
        if (tagsData.length) {
            dispatch(fetchProductsByTag({tags: tagsData, limit: 10}))
        }
    }, [tagsData])
    return (
        <>
            <Catalog />
            <Products title={tagsData[1]?.name} tagId={tagsData[1]?.id} />
        </>
    );
}
