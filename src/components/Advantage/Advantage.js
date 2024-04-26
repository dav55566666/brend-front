import Image from "next/image";
import React from "react";
import { EarthIcon, ProductsIcon, SaleIcon, StarPremiumIcon } from "../../svg";

function Advantage() {
    return (
        <section className="advantages">
            <div className="advantages__container _container">
                <div className="advantages__text">
                    <h2>Онлайн гипермаркет БРЕНД-Инструмент</h2>
                    <div className="advantages__grid">
                        <div className="advantages__item">
                            <div className="icon">
                                <ProductsIcon />
                            </div>
                            <div className="text">
                                <span>20 000</span>
                                <p>товаров в наличии</p>
                            </div>
                        </div>
                        <div className="advantages__item">
                            <div className="icon">
                                <SaleIcon />
                            </div>
                            <div className="text">
                                <span>Скидки</span>
                                <p>постоянным клиентам</p>
                            </div>
                        </div>
                        <div className="advantages__item">
                            <div className="icon">
                                <EarthIcon />
                            </div>
                            <div className="text">
                                <span>2000</span>
                                <p>брендов со всего мира</p>
                            </div>
                        </div>
                        <div className="advantages__item">
                            <div className="icon">
                                <StarPremiumIcon />
                            </div>
                            <div className="text">
                                <span>Опытные</span>
                                <p>продавцы</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="advantages__img">
                    <Image src={"https://brend-instrument.ru/img/image 5.png"} width={500} height={500} alt={"Picture of the author"} />
                </div>
            </div>
        </section>
    );
}

export default Advantage;
