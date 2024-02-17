"use client";
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, toggleFilterValues } from '../../store/slices/category/categorySlice';
import { fetchSingleCategory } from '../../store/slices/category/categoryApi';
import { ArrowDown, FillterIcon } from '../../svg';
import FilterItem from "../FilterItem/FilterItem"
import ProductItem from '../ProductItem/ProductItem';

function CatalogSingle({categoryId}) {
    const dispatch = useDispatch()

    const {singleCategoryData} = useSelector(selectCategory)

    useLayoutEffect(() => {
        dispatch(fetchSingleCategory({categoryId: categoryId, limit: 20}))
    }, [categoryId])

    return (
        <section className="catalog-single">
            <div className="catalog-single__container _container">
                <div className="catalog-single__left">
                    <h1>{singleCategoryData?.title}</h1>
                    <div className="catalog-single__filters">
                        <div className="catalog-single__filter">
                            <button className="filter-title">
                                <FillterIcon />
                                Фильтр товаров
                            </button>
                            <div className="catalog-single__filter-box">
                                <div className="catalog-single__filter-item">
                                    <div className="catalog-single__filter-title">
                                        <p>Цена (₽)</p>
                                        <div className="icon">
                                            <ArrowDown color={"#FFF"} />
                                        </div>
                                    </div>
                                    <div className="catalog-single__filter-hiden">
                                        <div className="catalog-single__filter-price">
                                            <label className="input-text">Минимум <input type="number" min={1} defaultValue={490} /></label>
                                            <label className="input-text">Максимум <input type="number" min /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            singleCategoryData?.attributes?.length ?
                            <div className="catalog-single__filter">
                                <button className="filter-title">
                                    Общяя характеристика
                                </button>
                                <div className="catalog-single__filter-box">
                                    {
                                        singleCategoryData.attributes.map(fillter => (
                                            <FilterItem key={fillter.id} title={fillter.title} values={fillter.values} id={fillter.id}  />
                                        ))
                                    }
                                </div>
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="catalog-single__right">
                    
                    {/* <div className="catalog-single__category">
                    </div> */}
                    <div className="catalog-single__sort">
                        <div className="catalog-single__sort-left">
                            <button>
                                <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0.647059C0 0.289698 0.289698 0 0.647059 0H4.52941C4.88677 0 5.17647 0.289698 5.17647 0.647059V4.52941C5.17647 4.88677 4.88677 5.17647 4.52941 5.17647H0.647059C0.289698 5.17647 0 4.88677 0 4.52941V0.647059Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M8.41177 0.647059C8.41177 0.289698 8.70146 0 9.05882 0H12.9412C13.2985 0 13.5882 0.289698 13.5882 0.647059V4.52941C13.5882 4.88677 13.2985 5.17647 12.9412 5.17647H9.05882C8.70146 5.17647 8.41177 4.88677 8.41177 4.52941V0.647059Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M16.8235 0.647059C16.8235 0.289698 17.1132 0 17.4706 0H21.3529C21.7103 0 22 0.289698 22 0.647059V4.52941C22 4.88677 21.7103 5.17647 21.3529 5.17647H17.4706C17.1132 5.17647 16.8235 4.88677 16.8235 4.52941V0.647059Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M0 9.05882C0 8.70146 0.289698 8.41177 0.647059 8.41177H4.52941C4.88677 8.41177 5.17647 8.70146 5.17647 9.05882V12.9412C5.17647 13.2985 4.88677 13.5882 4.52941 13.5882H0.647059C0.289698 13.5882 0 13.2985 0 12.9412V9.05882Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M8.41177 9.05882C8.41177 8.70146 8.70146 8.41177 9.05882 8.41177H12.9412C13.2985 8.41177 13.5882 8.70146 13.5882 9.05882V12.9412C13.5882 13.2985 13.2985 13.5882 12.9412 13.5882H9.05882C8.70146 13.5882 8.41177 13.2985 8.41177 12.9412V9.05882Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M16.8235 9.05882C16.8235 8.70146 17.1132 8.41177 17.4706 8.41177H21.3529C21.7103 8.41177 22 8.70146 22 9.05882V12.9412C22 13.2985 21.7103 13.5882 21.3529 13.5882H17.4706C17.1132 13.5882 16.8235 13.2985 16.8235 12.9412V9.05882Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M0 17.4706C0 17.1132 0.289698 16.8235 0.647059 16.8235H4.52941C4.88677 16.8235 5.17647 17.1132 5.17647 17.4706V21.3529C5.17647 21.7103 4.88677 22 4.52941 22H0.647059C0.289698 22 0 21.7103 0 21.3529V17.4706Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M8.41177 17.4706C8.41177 17.1132 8.70146 16.8235 9.05882 16.8235H12.9412C13.2985 16.8235 13.5882 17.1132 13.5882 17.4706V21.3529C13.5882 21.7103 13.2985 22 12.9412 22H9.05882C8.70146 22 8.41177 21.7103 8.41177 21.3529V17.4706Z" fill="#333333" fillOpacity="0.8" />
                                    <path d="M16.8235 17.4706C16.8235 17.1132 17.1132 16.8235 17.4706 16.8235H21.3529C21.7103 16.8235 22 17.1132 22 17.4706V21.3529C22 21.7103 21.7103 22 21.3529 22H17.4706C17.1132 22 16.8235 21.7103 16.8235 21.3529V17.4706Z" fill="#333333" fillOpacity="0.8" />
                                </svg>
                            </button>
                            <button>
                                <svg width={22} height={21} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0.636364C0 0.28491 0.289698 0 0.647059 0H21.3529C21.7103 0 22 0.28491 22 0.636364V2.54545C22 2.89691 21.7103 3.18182 21.3529 3.18182H0.647059C0.289699 3.18182 0 2.89691 0 2.54545V0.636364Z" fill="#E6E6E6" />
                                    <path d="M0 9.54545C0 9.194 0.289698 8.90909 0.647059 8.90909H21.3529C21.7103 8.90909 22 9.194 22 9.54545V11.4545C22 11.806 21.7103 12.0909 21.3529 12.0909H0.647059C0.289699 12.0909 0 11.806 0 11.4545V9.54545Z" fill="#E6E6E6" />
                                    <path d="M0 18.4545C0 18.1031 0.289698 17.8182 0.647059 17.8182H21.3529C21.7103 17.8182 22 18.1031 22 18.4545V20.3636C22 20.7151 21.7103 21 21.3529 21H0.647059C0.289699 21 0 20.7151 0 20.3636V18.4545Z" fill="#E6E6E6" />
                                </svg>
                            </button>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span />
                                <p>Новинки</p>
                            </label>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span />
                                <p>Акции</p>
                            </label>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span />
                                <p>Бестселлеры</p>
                            </label>
                        </div>
                        <select>
                            <option value="Сортировать">Сортировать</option>
                        </select>
                    </div>
                    <div className="catalog-single__grid">
                        {
                            singleCategoryData?.products?.length ?
                            singleCategoryData?.products.map(product => (
                                <ProductItem key={product.id} title={product.title} img={`http://brand.speedshop.am/${product.image}`} price={product.price} salePrice={product.special_price === 0 ? false : product.special_price} id={product.id} />
                            )) : <></>
                        }
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CatalogSingle