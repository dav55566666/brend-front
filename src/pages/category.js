"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectTags } from "../store/slices/tags/tagsSlice";
import { fetchTags } from "../store/slices/tags/tagsApi";
import { fetchProductsByTag } from "../store/slices/products/productsApi";
import Catalog from "../components/Catalog/Catalog"
import Products from "../components/Products/Products";
import { useEffect, useState } from "react";
import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs"


export default function CatalogPage() {
    const dispatch = useDispatch()
    const { tagsData, getTags } = useSelector(selectTags)
    const [sendFetch, setSendFetch] = useState(true)
    useEffect(() => {
        if (getTags) {
            setSendFetch(false)
        } else {
            setSendFetch(true)
        }
    }, [])
    return (
        <>
            <Brendcrumbs />
            <Catalog />
            <Products idx={0} fetch={sendFetch} />
        </>
    );
}
