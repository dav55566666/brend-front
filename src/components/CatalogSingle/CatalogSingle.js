"use client";
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, sortProducts, togglePrices } from '../../store/slices/category/categorySlice';
import { fetchFilterCategory, fetchSinglCategoryChildren, fetchSingleCategory, fetchSortCategory } from '../../store/slices/category/categoryApi';
import { ArrowDown, ClousIcon, FillterIcon } from '../../svg';
import FilterItem from "../FilterItem/FilterItem"
import ProductItem from '../ProductItem/ProductItem';
import { useSearchParams } from 'next/navigation';
import Loader from '../Loader/Loader';
import parse from 'html-react-parser';
import CategoryItem from '../CategoryItem/CategoryItem';
import Brendcrumbs from '../Brendcrumbs/Brendcrumbs';
import { useRouter } from 'next/router';
import CatalogTags from './CatalogTags/CatalogTags';
import { selectTags } from '@/store/slices/tags/tagsSlice';

function CatalogSingle({ slug }) {

    const [isLoading, setIsLoading] = useState(false);
    const [getCategory, setGetCategory] = useState(false);
    const [getCategoryChildren, setGetCategoryChildren] = useState(false);
    const [showMobileFillters, setShowMobileFillters] = useState(false)
    const [limit, setLimit] = useState(30)
    const dispatch = useDispatch();
    const { singleCategoryData, singleCategoryChildrenData, categoryFiltersData, prices, filterBrands } = useSelector(selectCategory);
    const { sortTagsData } = useSelector(selectTags)
    const router = useRouter()
    const priceInputs = useRef(null)
    const [filterDataArray, setFilterDataArray] = useState([])

    const handleFilter = (e) => {
        if (e) {
            e.preventDefault()
        }
        dispatch(fetchFilterCategory({ filterData: [...filterDataArray, { 9999: [...prices] }], categoryId: singleCategoryData.id, limit: limit }))
    }

    const togglePriceValue = (values) => {
        dispatch(togglePrices([values[0], values[1]]))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setGetCategory(false)
        setGetCategoryChildren(false)
        setIsLoading(false)
    }, [router])

    useEffect(() => {
        if (!getCategory) {
            setIsLoading(false);
            dispatch(fetchSingleCategory({ categorySlug: slug, limit: limit }));
            setGetCategory(true)
        }
        if (!getCategoryChildren && singleCategoryData.slug === slug) {
            dispatch(fetchSinglCategoryChildren({ categoryId: singleCategoryData.id, limit: limit }));
            setGetCategoryChildren(true)
        }
        setShowMobileFillters(false)
        setIsLoading(true);
    }, [singleCategoryData, singleCategoryChildrenData, getCategoryChildren, getCategory]);

    useEffect(() => { }, [categoryFiltersData, sortTagsData])

    const toggleMobileFillters = (type) => {
        if (window.screen.availWidth < 1024) {
            if (type === "hiden") {
                setShowMobileFillters(false)
            } else  if(type === 'showed'){
                setShowMobileFillters(true)
            }
        }
    }


    ///console.log(limit,singleCategoryData?.products?.length, 'limitlimit')
    return (
        <>
            {
                isLoading ?
                    <>
                        <Brendcrumbs title={singleCategoryData?.title} links={[]} />
                        <section className="catalog-single">
                            <div className="catalog-single__container _container">
                                <div className='catalog-single__top'>
                                    <div className="catalog-single__left">
                                        <h1>{singleCategoryData?.title}</h1>
                                        <div className="catalog-single__filters">
                                            <button className="filter-title" onClick={() => toggleMobileFillters("showed")}>
                                                <FillterIcon />
                                                Фильтр товаров
                                            </button>
                                            <div className='catalog-fillters' onClick={() => toggleMobileFillters("hiden")} style={{ display: window.screen.availWidth < 1024 && showMobileFillters ? "block" : "none" }}>
                                                <div className='catalog-fillters__box' onClick={(e) => { e.stopPropagation(); toggleMobileFillters("showed") }}>
                                                    <h4>Фильтр товаров</h4>
                                                    <button className='clousbtn' onClick={(e) => { e.stopPropagation(); toggleMobileFillters("hiden") }}><ClousIcon /></button>
                                                    <div className="catalog-single__filter-box">
                                                        <div className="catalog-single__filter-item">
                                                            <div className="catalog-single__filter-title">
                                                                <p>Цена (₽)</p>
                                                                <div className="icon">
                                                                    <ArrowDown color={"#FFF"} />
                                                                </div>
                                                            </div>
                                                            <div className="catalog-single__filter-hiden">
                                                                <form className="catalog-single__filter-price" ref={priceInputs} onSubmit={(e) => handleFilter(e)}>
                                                                    <label className="input-text">Минимум
                                                                        <input type="number"
                                                                            min={1}
                                                                            defaultValue={prices[0]}
                                                                            onInput={(e) => { togglePriceValue([e.target.value * 1, priceInputs.current.children[1].children[0].value * 1]) }}
                                                                            onBlur={() => { handleFilter() }} />
                                                                    </label>
                                                                    <label className="input-text">Максимум
                                                                        <input type="number"
                                                                            min={(priceInputs?.current?.children[0]?.children[0].value * 1) + 1}
                                                                            defaultValue={prices[1]}
                                                                            onInput={(e) => { togglePriceValue([priceInputs.current.children[0].children[0].value * 1, e.target.value * 1]) }}
                                                                            onBlur={() => { handleFilter() }} />
                                                                    </label>
                                                                    <input type="submit" />
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="catalog-single__filter">
                                                        <button className="filter-title">
                                                            Общяя характеристика
                                                        </button>
                                                        <div className="catalog-single__filter-box">
                                                            {
                                                                filterBrands.length && (
                                                                    <FilterItem toggleMobileFillters={setShowMobileFillters}   title={"Производители"} values={filterBrands} id={99999} prices={prices} {...{ filterDataArray, setFilterDataArray }} />
                                                                )
                                                            }
                                                            {
                                                                categoryFiltersData?.map(fillter => (
                                                                    <FilterItem toggleMobileFillters={setShowMobileFillters}  key={fillter.id} title={fillter.title} values={fillter.values} id={fillter.id} prices={prices} {...{ filterDataArray, setFilterDataArray }} />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="catalog-single__right">

                                        <div className="catalog-single__category">
                                            {singleCategoryChildrenData?.children?.length ?
                                                singleCategoryChildrenData?.children?.map(el => (
                                                    <CategoryItem key={el.id} title={el.title} img={"https://back.brend-instrument.ru/" + el.image} id={el.id} slug={el.slug} />
                                                )) : ""
                                            }
                                        </div>
                                        <div className="catalog-single__sort">
                                            <CatalogTags filterData={filterDataArray} {...{ prices }} />
                                            <select onChange={(e) => dispatch(sortProducts(e.target.value))}>
                                                <option value="default">По умолчанию</option>
                                                <option value="expensive">Дороже</option>
                                                <option value="cheap">Дешевле</option>
                                                <option value="name-asc">Название (А - Я)</option>
                                                <option value="name-desc">Название (Я - А)</option>
                                                <option value="model-asc">Модель (А - Я)</option>
                                                <option value="model-desc">Модель (Я - А)</option>
                                            </select>
                                        </div>
                                        <div className="catalog-single__grid">
                                            {
                                                singleCategoryData?.products?.length ?
                                                    singleCategoryData?.products.map(product => (
                                                        <Suspense key={product.id}>
                                                            <ProductItem title={product.name} img={product.image && `https://back.brend-instrument.ru/${product.image}`} price={product.price} salePrice={product.special_price === 0 ? false : product.special_price} id={product.id} slug={product.slug} />
                                                        </Suspense>
                                                    )) : <></>
                                            }
                                        </div>
                                        {limit === singleCategoryData?.products?.length && (<div className='catalog-single__more'>
                                            <button className="show-more" onClick={() => {
                                                dispatch(fetchSortCategory({
                                                    id: sortTagsData?.filter(el => el.toggle)[0]?.id,
                                                    filterData: [...filterDataArray, {9999: [...prices]}],
                                                    categoryId: singleCategoryData.id,
                                                    limit: limit + 30
                                                }))
                                                setLimit(limit + 30)
                                            }}>
                                                <svg width={18} height={18} viewBox="0 0 18 18" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1.06189 9.7385C1.02104 9.42042 1 9.09641 1 8.76755C1 4.47765 4.58172 1 9 1C11.5006 1 13.7332 2.11394 15.2002 3.85862M15.2002 3.85862V1M15.2002 3.85862V3.91276L12.2002 3.91283M16.9381 7.79661C16.979 8.11469 17 8.4387 17 8.76755C17 13.0575 13.4183 16.5351 9 16.5351C6.61061 16.5351 4.46589 15.518 3 13.9054M3 13.9054V13.6223H6M3 13.9054V16.5351"
                                                        stroke="#333333" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round"/>
                                                </svg>
                                                Показать еще
                                            </button>
                                        </div>)}
                                    </div>
                                </div>
                                <div className="catalog-abaut">
                                    {/* <div className="catalog-abaut__flex">
                                    <h2>Обычно ищут вместе</h2>
                                    <div className="catalog-abaut__buttons">
                                        <a href="#">Перфораторы</a>
                                        <a href="#">Гайковерты</a>
                                        <a href="#">Шуруповерты</a>
                                        <a href="#">Заклепочники</a>
                                        <a href="#">Сварочные аппараты</a>
                                    </div>
                                </div> */}
                                    <div className="catalog-abaut__flex">
                                        {singleCategoryData?.description && parse(singleCategoryData?.description?.replace(/<o:p>/g, "").replace(/<\/o:p>/g, ""))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                    : <Loader />
            }
        </>
    )
}

export default CatalogSingle