"use client"
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchSinglCategoryChildren, fetchSingleCategory } from '../../store/slices/category/categoryApi'

export default function CategoryItem({title, img, id, slug}) {
    const dispatch = useDispatch()
    return (
        <div className="category-item">
            <Link href={`/categorySingl/${slug}`} onClick={() => {dispatch(fetchSingleCategory({categorySlug: slug, limit: 20})); dispatch(fetchSinglCategoryChildren({categoryId: id, limit: 20}))}} className="category-item__img"><img src={img} alt={title}/></Link>
            <h3><Link href={`/categorySingl/${slug}`} onClick={() => {dispatch(fetchSingleCategory({categorySlug: slug, limit: 20})); dispatch(fetchSinglCategoryChildren({categoryId: id, limit: 20}))}}>{title}</Link></h3>
        </div>
    )
}
