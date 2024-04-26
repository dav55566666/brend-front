import Link from 'next/link'
import React, { Fragment } from 'react'

function Brendcrumbs({ title, links }) {
    return (
        <div className="brendcrumbs">
            <div className="brendcrumbs__container _container">
                <Link href="/">Главная</Link>
                <svg width={6} height={10} viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-5.13609e-08 1.175L3.7085 5L-3.85753e-07 8.825L1.1417 10L6 5L1.1417 -2.12363e-07L-5.13609e-08 1.175Z" fill="#333333" />
                </svg>
                {
                    links?.length ?
                        links.map((el, idx) => (
                            <Fragment key={idx}>
                                <Link href={el.link}>{el.name}</Link>
                                <svg width={6} height={10} viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M-5.13609e-08 1.175L3.7085 5L-3.85753e-07 8.825L1.1417 10L6 5L1.1417 -2.12363e-07L-5.13609e-08 1.175Z" fill="#333333" />
                                </svg>
                            </Fragment>
                        )) : ""
                }
                <p>{title}</p>
            </div>
        </div>
    )
}

export default Brendcrumbs