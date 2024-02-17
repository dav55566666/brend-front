"use client";
import { useDispatch, useSelector } from "react-redux";
import TopCategory from "./components/TopCategory/TopCategory";
import Main from "./components/Main/Main";
import Products from "./components/Products/Products"
import { selectTags } from "./store/slices/tags/tagsSlice";
import { useEffect } from "react";
import { fetchTags } from "./store/slices/tags/tagsApi";
import Banner from "./components/Banner/Banner"
import Advantage from "./components/Advantage/Advantage"
import RequestProduct from "./components/RequestProduct/RequestProduct"
import BuyingUp from "./components/BuyingUp/BuyingUp"
import Brends from "./components/Brends/Brends"
import { fetchProductsByTag } from "./store/slices/products/productsApi";
import TopBrend from "./components/TopBrend/TopBrend"
import HomeNews from "./components/HomeNews/HomeNews"
import Faq from "./components/Faq/Faq"

export default function Home() {
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
            <Main />
            <TopCategory />
            <Products title={tagsData[0]?.name} tagId={tagsData[0]?.id} />
            <Products title={tagsData[1]?.name} tagId={tagsData[1]?.id} />
            <Banner img={"7935cca4-1dfc-4a17-896d-4d38801114a1 1.png"} alt={"asd"} />
            <Products title={tagsData[2]?.name} tagId={tagsData[2]?.id} />
            <Advantage />
            <Products title={tagsData[1]?.name} tagId={tagsData[1]?.id} />
            <Products title={tagsData[2]?.name} tagId={tagsData[2]?.id} />
            <RequestProduct />
            <Products title={tagsData[2]?.name} tagId={tagsData[2]?.id} />
            <BuyingUp />
            <Products title={tagsData[2]?.name} tagId={tagsData[2]?.id} />
            <Brends />
            <TopBrend />
            <HomeNews />
            <Faq />
        </>
    );
}
