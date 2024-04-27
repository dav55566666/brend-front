"use client";
import TopCategory from "../components/TopCategory/TopCategory"
import Main from "../components/Main/Main";
import Products from "../components/Products/Products"
import Banner from "../components/Banner/Banner"
import Advantage from "../components/Advantage/Advantage"
import Brands from "../components/Brands/Brands"
import TopBrend from "../components/TopBrend/TopBrend"
import HomeNews from "../components/HomeNews/HomeNews"
import Faq from "../components/Faq/Faq"
import Videos from "@/components/Videos/Videos";
import Link from "next/link";
import {fetchCategory, fetchSinglCategoryChildren, fetchSingleCategory} from "@/store/slices/category/categoryApi";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCategory} from "@/store/slices/category/categorySlice";

export default function Home() {
    const [category, setCategory] = useState(false)
    const {categoryData} = useSelector(selectCategory)
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.innerWidth < 1025) {
            dispatch(fetchCategory({limit: 20}))
            setCategory(!category)
        }
    }, [])
    return (
        <>
            {category && (
                <div className='hide-catalog-mobile'>
                    <ul className='hide-catalog__mobile_grid'>
                        {
                            categoryData?.map(category => (
                                <li className='category-block-li' key={category.id}>
                                    <Link
                                        className='category-mobile-title'
                                        href={`/categorySingl/${category.slug}`} onClick={() => {
                                        dispatch(fetchSingleCategory({categorySlug: category.slug, limit: 20}));
                                        dispatch(fetchSinglCategoryChildren({categoryId: category.id, limit: 20}))
                                    }}
                                    >{category.icon != 0 &&
                                        <span className='image-span'>  <Image src={"https://back.brend-instrument.ru" + category.icon}
                                                       width={25}
                                                       height={25}/></span>}<span>{category.title}</span></Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
            }
            <Main/>
            <TopCategory/>
            {!category && <Banner position={1}/>}
            <Products idx={0} fetch={true}/>
            <Advantage/>
            <Products idx={1}/>
            {/*<RequestProduct />*/}
            {/*<BuyingUp />*/}
            <Brands/>
            <TopBrend/>
            <HomeNews/>
            <Videos/>
            <Faq/>
        </>
    );
}
