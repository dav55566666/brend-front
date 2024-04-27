"use client";
import React, {useState} from 'react'
import {ArrowDown} from "../../svg"
import {useDispatch, useSelector} from 'react-redux';
import {clearFillter, selectCategory, toggleFilterValues} from '../../store/slices/category/categorySlice';
import {fetchFilterCategory} from '../../store/slices/category/categoryApi';

function FilterItem({title, values, id, prices, filterDataArray, setFilterDataArray, toggleMobileFillters}) {
    const [toggle, setToggle] = useState()
    const dispatch = useDispatch()
    const {singleCategoryData} = useSelector(selectCategory)

    function handleFilter(valueId, value, toggle) {
        dispatch(toggleFilterValues({attributeId: id, valueId: valueId}))
        if (toggle) {
            setFilterDataArray([...filterDataArray.filter(el => el[id] !== value)])
            if (!filterDataArray.filter(el => el[id] !== value).length) {
                dispatch(clearFillter())
            } else {
                dispatch(fetchFilterCategory({
                    filterData: [...filterDataArray.filter(el => el[id] !== value), {9999: [...prices]}],
                    categoryId: singleCategoryData.id,
                    limit: 20
                }))
            }
        } else {
            setFilterDataArray([
                ...filterDataArray.filter(el => el[id] !== value),
                {[id]: value}
            ])
            dispatch(fetchFilterCategory({
                filterData: [...filterDataArray, {[id]: value}, {9999: [...prices]}],
                categoryId: singleCategoryData.id,
                limit: 20
            }))
        }
    }

    console.log(values, 'values')
    return (
        <div className="catalog-single__filter-item">
            <div className="catalog-single__filter-title" onClick={() => setToggle(!toggle)}>
                <p>{title}</p>
                <div className="icon">
                    <ArrowDown color={"#FFF"} active={toggle}/>
                </div>
            </div>
            {
                toggle &&
                <div className="catalog-single__filter-hiden">
                    <ul>
                        {
                            values.map(value => (
                                <li key={value.id}>
                                    <label className="checkbox">
                                        <input type="checkbox" onClick={(e) => {
                                            handleFilter(value.id, value.value, value.toggle)
                                            toggleMobileFillters(false)
                                        }}/>
                                        <span className="checkbox-span"/>
                                        <p>{value.value}</p>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default FilterItem