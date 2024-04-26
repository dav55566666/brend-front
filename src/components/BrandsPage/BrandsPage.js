"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBrands } from '../../store/slices/brands/brandsSlice'
import { fetchBrandsByName } from '../../store/slices/brands/brandsApi'
import Link from 'next/link'

function BrandsPage() {
    const dispatch = useDispatch()
    const [brendName, setBrendName] = useState("a")
    const [getBrands, setGetBrands] = useState(false)
    const {brandsByNameData} = useSelector(selectBrands)
    const brandNameLetters = [
        'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м',
        'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'э', 'ю', 'я',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    useEffect(() => {
        if(brandsByNameData.length < 1) {
            if(!getBrands) {
                dispatch(fetchBrandsByName({name: brendName}))
                setGetBrands(true)
            }
        }
    }, [brandsByNameData])
    const fetchBrend = (name) => {
        setBrendName(name)
        dispatch(fetchBrandsByName({name}))
    } 
    return (
        <section className="bredns-page">
            <div className="bredns-page__container _container">
                <h1>Наши бренды</h1>
                <div className="bredns-page__letters">
                    <button onClick={() => fetchBrend("0-9")}>0-9</button>
                    <div className="bredns-page__letters-grid">
                        {
                            brandNameLetters.map((el, idx) => (
                                <button key={idx} onClick={() => fetchBrend(el)}>{el}</button>
                            ))
                        }
                    </div>
                </div>
                <h4>{brendName}</h4>
                <div className="bredns-page__grid">
                    {
                        brandsByNameData?.map(brend => (
                            <Link key={brend.id} href={`/brandsingle/${brend.slug}`}>{brend.title}</Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default BrandsPage