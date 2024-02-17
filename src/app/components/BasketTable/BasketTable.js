import Image from 'next/image'
import React from 'react'

function BasketTable() {
    return (
        <div className="basket__products">
            <div className="basket__products-title">
                <p>№</p>
                <p>Фото</p>
                <p>Наименование</p>
                <p>Цена</p>
                <p>Количество</p>
                <p>Сумма</p>
                <p>удалить</p>
            </div>
            <div className="basket__item">
                <p>1</p>
                <div className="basket__item-img">
                    <Image src="/img/img.png" alt="img" />
                </div>
                <h4>название товара</h4>
                <p className="price">7.600 ₽</p>
                <div className="counter">
                    <div className="counter-flex">
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                            </svg>
                        </button>
                        <span>1</span>
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                                <rect x={16} y={8} width={14} height={2} rx={1} transform="rotate(90 16 8)" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="total-price">7.600 ₽</p>
                <button className="remove-btn">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2675 12.5L17.8037 8.965C17.9199 8.84886 18.012 8.71099 18.0749 8.55925C18.1377 8.4075 18.1701 8.24487 18.1701 8.08063C18.1701 7.91638 18.1377 7.75375 18.0749 7.60201C18.012 7.45026 17.9199 7.31239 17.8037 7.19625C17.6876 7.08011 17.5497 6.98799 17.398 6.92513C17.2463 6.86228 17.0836 6.82993 16.9194 6.82993C16.7551 6.82993 16.5925 6.86228 16.4408 6.92513C16.289 6.98799 16.1511 7.08011 16.035 7.19625L12.5 10.7325L8.965 7.19625C8.73045 6.9617 8.41233 6.82993 8.08063 6.82993C7.74892 6.82993 7.4308 6.9617 7.19625 7.19625C6.9617 7.4308 6.82993 7.74892 6.82993 8.08063C6.82993 8.24487 6.86228 8.4075 6.92513 8.55925C6.98799 8.71099 7.08011 8.84886 7.19625 8.965L10.7325 12.5L7.19625 16.035C6.9617 16.2696 6.82993 16.5877 6.82993 16.9194C6.82993 17.2511 6.9617 17.5692 7.19625 17.8037C7.4308 18.0383 7.74892 18.1701 8.08063 18.1701C8.41233 18.1701 8.73045 18.0383 8.965 17.8037L12.5 14.2675L16.035 17.8037C16.2696 18.0383 16.5877 18.1701 16.9194 18.1701C17.2511 18.1701 17.5692 18.0383 17.8037 17.8037C18.0383 17.5692 18.1701 17.2511 18.1701 16.9194C18.1701 16.5877 18.0383 16.2696 17.8037 16.035L14.2675 12.5ZM12.5 25C5.59625 25 0 19.4037 0 12.5C0 5.59625 5.59625 0 12.5 0C19.4037 0 25 5.59625 25 12.5C25 19.4037 19.4037 25 12.5 25Z" fill="#D70000" />
                    </svg>
                </button>
            </div>
            <div className="basket__item">
                <p>2</p>
                <div className="basket__item-img">
                    <Image src="/img/img.png" alt="img" />
                </div>
                <h4>Довольно длинное название товара</h4>
                <p className="price">7.600 ₽</p>
                <div className="counter">
                    <div className="counter-flex">
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                            </svg>
                        </button>
                        <span>1</span>
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                                <rect x={16} y={8} width={14} height={2} rx={1} transform="rotate(90 16 8)" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="total-price">7.600 ₽</p>
                <button className="remove-btn">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2675 12.5L17.8037 8.965C17.9199 8.84886 18.012 8.71099 18.0749 8.55925C18.1377 8.4075 18.1701 8.24487 18.1701 8.08063C18.1701 7.91638 18.1377 7.75375 18.0749 7.60201C18.012 7.45026 17.9199 7.31239 17.8037 7.19625C17.6876 7.08011 17.5497 6.98799 17.398 6.92513C17.2463 6.86228 17.0836 6.82993 16.9194 6.82993C16.7551 6.82993 16.5925 6.86228 16.4408 6.92513C16.289 6.98799 16.1511 7.08011 16.035 7.19625L12.5 10.7325L8.965 7.19625C8.73045 6.9617 8.41233 6.82993 8.08063 6.82993C7.74892 6.82993 7.4308 6.9617 7.19625 7.19625C6.9617 7.4308 6.82993 7.74892 6.82993 8.08063C6.82993 8.24487 6.86228 8.4075 6.92513 8.55925C6.98799 8.71099 7.08011 8.84886 7.19625 8.965L10.7325 12.5L7.19625 16.035C6.9617 16.2696 6.82993 16.5877 6.82993 16.9194C6.82993 17.2511 6.9617 17.5692 7.19625 17.8037C7.4308 18.0383 7.74892 18.1701 8.08063 18.1701C8.41233 18.1701 8.73045 18.0383 8.965 17.8037L12.5 14.2675L16.035 17.8037C16.2696 18.0383 16.5877 18.1701 16.9194 18.1701C17.2511 18.1701 17.5692 18.0383 17.8037 17.8037C18.0383 17.5692 18.1701 17.2511 18.1701 16.9194C18.1701 16.5877 18.0383 16.2696 17.8037 16.035L14.2675 12.5ZM12.5 25C5.59625 25 0 19.4037 0 12.5C0 5.59625 5.59625 0 12.5 0C19.4037 0 25 5.59625 25 12.5C25 19.4037 19.4037 25 12.5 25Z" fill="#D70000" />
                    </svg>
                </button>
            </div>
            <div className="basket__item">
                <p>3</p>
                <div className="basket__item-img">
                    <Image src="/img/img.png" alt="img" />
                </div>
                <h4>название товара</h4>
                <p className="price">7.600 ₽</p>
                <div className="counter">
                    <div className="counter-flex">
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                            </svg>
                        </button>
                        <span>1</span>
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                                <rect x={16} y={8} width={14} height={2} rx={1} transform="rotate(90 16 8)" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="total-price">7.600 ₽</p>
                <button className="remove-btn">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2675 12.5L17.8037 8.965C17.9199 8.84886 18.012 8.71099 18.0749 8.55925C18.1377 8.4075 18.1701 8.24487 18.1701 8.08063C18.1701 7.91638 18.1377 7.75375 18.0749 7.60201C18.012 7.45026 17.9199 7.31239 17.8037 7.19625C17.6876 7.08011 17.5497 6.98799 17.398 6.92513C17.2463 6.86228 17.0836 6.82993 16.9194 6.82993C16.7551 6.82993 16.5925 6.86228 16.4408 6.92513C16.289 6.98799 16.1511 7.08011 16.035 7.19625L12.5 10.7325L8.965 7.19625C8.73045 6.9617 8.41233 6.82993 8.08063 6.82993C7.74892 6.82993 7.4308 6.9617 7.19625 7.19625C6.9617 7.4308 6.82993 7.74892 6.82993 8.08063C6.82993 8.24487 6.86228 8.4075 6.92513 8.55925C6.98799 8.71099 7.08011 8.84886 7.19625 8.965L10.7325 12.5L7.19625 16.035C6.9617 16.2696 6.82993 16.5877 6.82993 16.9194C6.82993 17.2511 6.9617 17.5692 7.19625 17.8037C7.4308 18.0383 7.74892 18.1701 8.08063 18.1701C8.41233 18.1701 8.73045 18.0383 8.965 17.8037L12.5 14.2675L16.035 17.8037C16.2696 18.0383 16.5877 18.1701 16.9194 18.1701C17.2511 18.1701 17.5692 18.0383 17.8037 17.8037C18.0383 17.5692 18.1701 17.2511 18.1701 16.9194C18.1701 16.5877 18.0383 16.2696 17.8037 16.035L14.2675 12.5ZM12.5 25C5.59625 25 0 19.4037 0 12.5C0 5.59625 5.59625 0 12.5 0C19.4037 0 25 5.59625 25 12.5C25 19.4037 19.4037 25 12.5 25Z" fill="#D70000" />
                    </svg>
                </button>
            </div>
            <div className="basket__item">
                <p>4</p>
                <div className="basket__item-img">
                    <Image src="/img/img.png" alt="img" />
                </div>
                <h4>Довольно длинное название товара</h4>
                <p className="price">7.600 ₽</p>
                <div className="counter">
                    <div className="counter-flex">
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                            </svg>
                        </button>
                        <span>1</span>
                        <button>
                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={30} height={30} rx={7} fill="#0C96D1" />
                                <rect x="0.5" y="0.5" width={29} height={29} rx="6.5" stroke="black" strokeOpacity="0.05" />
                                <rect x={8} y={14} width={14} height={2} rx={1} fill="white" />
                                <rect x={16} y={8} width={14} height={2} rx={1} transform="rotate(90 16 8)" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="total-price">7.600 ₽</p>
                <button className="remove-btn">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2675 12.5L17.8037 8.965C17.9199 8.84886 18.012 8.71099 18.0749 8.55925C18.1377 8.4075 18.1701 8.24487 18.1701 8.08063C18.1701 7.91638 18.1377 7.75375 18.0749 7.60201C18.012 7.45026 17.9199 7.31239 17.8037 7.19625C17.6876 7.08011 17.5497 6.98799 17.398 6.92513C17.2463 6.86228 17.0836 6.82993 16.9194 6.82993C16.7551 6.82993 16.5925 6.86228 16.4408 6.92513C16.289 6.98799 16.1511 7.08011 16.035 7.19625L12.5 10.7325L8.965 7.19625C8.73045 6.9617 8.41233 6.82993 8.08063 6.82993C7.74892 6.82993 7.4308 6.9617 7.19625 7.19625C6.9617 7.4308 6.82993 7.74892 6.82993 8.08063C6.82993 8.24487 6.86228 8.4075 6.92513 8.55925C6.98799 8.71099 7.08011 8.84886 7.19625 8.965L10.7325 12.5L7.19625 16.035C6.9617 16.2696 6.82993 16.5877 6.82993 16.9194C6.82993 17.2511 6.9617 17.5692 7.19625 17.8037C7.4308 18.0383 7.74892 18.1701 8.08063 18.1701C8.41233 18.1701 8.73045 18.0383 8.965 17.8037L12.5 14.2675L16.035 17.8037C16.2696 18.0383 16.5877 18.1701 16.9194 18.1701C17.2511 18.1701 17.5692 18.0383 17.8037 17.8037C18.0383 17.5692 18.1701 17.2511 18.1701 16.9194C18.1701 16.5877 18.0383 16.2696 17.8037 16.035L14.2675 12.5ZM12.5 25C5.59625 25 0 19.4037 0 12.5C0 5.59625 5.59625 0 12.5 0C19.4037 0 25 5.59625 25 12.5C25 19.4037 19.4037 25 12.5 25Z" fill="#D70000" />
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default BasketTable