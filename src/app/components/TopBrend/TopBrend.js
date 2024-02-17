"use client";
import React, { useEffect, useState } from 'react'
import ProductItem from "../ProductItem/ProductItem"
import { useDispatch, useSelector } from 'react-redux';
import { selectBrends } from '../../store/slices/brends/brendsSlice';
import { fetchSingleBrend } from '../../store/slices/brends/brendsApi';
import axios from 'axios';

function TopBrend() {

    const  dispatch = useDispatch()
    const {singleBrend} = useSelector(selectBrends)
    const [topBrendProduct, setTopBrendProduct] = useState([])
    useEffect(() => {
        if(!singleBrend?.id) {
            dispatch(fetchSingleBrend({brendId: 2}))
        }else {
            axios.get("http://brand.speedshop.am/api/products-by-brand-id/"+singleBrend?.id+"/6").then(res => {
                setTopBrendProduct([...res.data.products])
            })
        }
    }, [singleBrend])
    return (
        <section className="top-brned">
            <div className="top-brned__container _container">
                <div className="section-title">
                    <h2>Электроинструменты от {singleBrend?.title}</h2>
                    <a href="#">Смотреть все</a>
                </div>
                <div className="top-brned__flex">
                    <div className="top-brned__img">
                        <img src="/img/Rectangle 149938.png" alt="img" />
                    </div>
                    <div className="top-brned__products">
                        {
                            topBrendProduct?.map(el => (
                                <ProductItem key={el.id}  title={el.title} img={el.image} price={el.price} salePrice={el.special_price === 0 ? false : el.special_price} id={el.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopBrend