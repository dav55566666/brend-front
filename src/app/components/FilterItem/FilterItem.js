"use client";
import React, { useState } from 'react'
import { ArrowDown } from "../../svg"

function FilterItem({title, values}) {
    const [toggle, setToggle] = useState()
    return (
        <div className="catalog-single__filter-item" >
            <div className="catalog-single__filter-title" onClick={() => setToggle(!toggle)}>
                <p>{title}</p>
                <div className="icon">
                    <ArrowDown color={"#FFF"} active={toggle} />
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
                                        <input type="checkbox" />
                                        <span className="checkbox-span" />
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