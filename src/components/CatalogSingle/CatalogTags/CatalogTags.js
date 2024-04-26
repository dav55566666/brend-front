"use client"
import { selectTags, toggleSortTags } from '@/store/slices/tags/tagsSlice'
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react'
import { fetchSortTags } from '@/store/slices/tags/tagsApi';
import { fetchSortCategory } from '@/store/slices/category/categoryApi';
import { selectCategory } from '@/store/slices/category/categorySlice';

function CatalogTags(filterData) {

    const {sortTagsData} = useSelector(selectTags)
    const {singleCategoryData, prices} = useSelector(selectCategory)
    const dispatch = useDispatch()
    const [getTags, setGetTags] = useState(false)

    useEffect(() => {
        if(!getTags) {
            dispatch(fetchSortTags())
            setGetTags(true)
        }
    }, [sortTagsData, getTags])

    const toggleTag = useCallback((e, id) => {
        dispatch(toggleSortTags({id: id, active: e.target.checked}))
        console.log(prices);
        dispatch(fetchSortCategory({id, filterData: [...filterData.filterData, {9999: [...prices]}], categoryId: singleCategoryData.id, limit: 20 }))
    }, [sortTagsData,filterData,prices])

    return (
        <div className="catalog-single__sort-left">
            {
                sortTagsData?.map(el => (
                    <label key={el.id} className="checkbox">
                        <input type="checkbox" onClick={(e) => toggleTag(e, el.id)} checked={el.toggle} />
                        <span />
                        <p>{el.name}</p>
                    </label>
                ))
            }
        </div>
    )
}

export default CatalogTags