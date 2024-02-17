"use client";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../store/slices/category/categorySlice';
import { fetchCategory } from '../../store/slices/category/categoryApi';
import CategoryItem from '../CategoryItem/CategoryItem';

function Catalog() {
    const dispatch = useDispatch()
    const {categoryData} = useSelector(selectCategory)
    useEffect(() => {
        if(!categoryData.length) {
            dispatch(fetchCategory())
        }
    }, [])
    return (
        <section className="catalog">
            <div className="catalog__container _container">
                <h1>Каталог</h1>
                <div className="catalog__grid">
                    {
                        categoryData?.map(category => (
                            <CategoryItem key={category.id} img={category.img} title={category.title} id={category.id.toString()} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Catalog