import React from 'react'

function Pagination() {
    return (
        <div className="pagination">
            <button className="show-more">
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.06189 9.7385C1.02104 9.42042 1 9.09641 1 8.76755C1 4.47765 4.58172 1 9 1C11.5006 1 13.7332 2.11394 15.2002 3.85862M15.2002 3.85862V1M15.2002 3.85862V3.91276L12.2002 3.91283M16.9381 7.79661C16.979 8.11469 17 8.4387 17 8.76755C17 13.0575 13.4183 16.5351 9 16.5351C6.61061 16.5351 4.46589 15.518 3 13.9054M3 13.9054V13.6223H6M3 13.9054V16.5351" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Показать еще
            </button>
            <div className="pagination__buttons">
                <div className="pagination__counter">
                    <button className="slideprev">
                        <svg width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM12 3.5L1 3.5V4.5L12 4.5V3.5Z" fill="#333333" />
                        </svg>
                    </button>
                    <span>2</span>
                    <button className="slidenext">
                        <svg width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464466C7.97631 0.269204 7.65973 0.269204 7.46447 0.464466C7.2692 0.659728 7.2692 0.976311 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM0 4.5H11V3.5H0V4.5Z" fill="#333333" />
                        </svg>
                    </button>
                </div>
                <span className="pages-count">из 12</span>
            </div>
        </div>
    )
}

export default Pagination