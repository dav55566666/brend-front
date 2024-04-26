"use client";
import TopCategory from "../components/TopCategory/TopCategory"
import Main from "../components/Main/Main";
import Products from "../components/Products/Products"
import Banner from "../components/Banner/Banner"
import Advantage from "../components/Advantage/Advantage"
import RequestProduct from "../components/RequestProduct/RequestProduct"
import BuyingUp from "../components/BuyingUp/BuyingUp"
import Brands from "../components/Brands/Brands"
import TopBrend from "../components/TopBrend/TopBrend"
import HomeNews from "../components/HomeNews/HomeNews"
import Faq from "../components/Faq/Faq"
import Videos from "@/components/Videos/Videos";

export default function Home() {
    return (
        <>
            <Main />
            <TopCategory />
            <Banner position={1} />
            <Products idx={2} fetch={true} />
            <Advantage />
            <Products idx={4} />
            <RequestProduct />
            <BuyingUp />
            <Brands />
            <TopBrend />
            <HomeNews />
            <Videos />
            <Faq />
        </>
    );
}
