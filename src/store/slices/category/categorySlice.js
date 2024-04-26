import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory, fetchFilterCategory, fetchSinglCategoryChildren, fetchSingleCategory, fetchSortCategory, fetchTopCategory } from "./categoryApi.js";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryData: [],
        topCategoryData: [],
        singleCategoryData: {},
        singleCategoryChildrenData: {},
        filterBrands: [],
        categoryFiltersData: [],
        singleCategoryProducts: [],
        prices: [100, 100000]
    },
    reducers: {
        toggleFilterValues: (state, { payload }) => {
            const { attributeId, valueId } = payload;
            state.categoryFiltersData = [
                ...state.categoryFiltersData.map(el => {
                    if (el.id === attributeId) {
                        return {
                            ...el,
                            values: [
                                ...el.values.map(value => {
                                    if (value.id === valueId) {
                                        return {
                                            ...value,
                                            toggle: !value.toggle
                                        }
                                    } else {
                                        return {
                                            ...value
                                        }
                                    }
                                })
                            ]
                        }
                    } else {
                        return {
                            ...el
                        }
                    }
                })
            ];
        },

        sortProducts: (state, { payload }) => {
            let sortedProducts = [...state.singleCategoryData.products];

            switch (payload) {
                case "expensive":
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case "cheap":
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case "name-asc":
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "name-desc":
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case "model-asc":
                    sortedProducts.sort((a, b) => a.sku.localeCompare(b.sku));
                    break;
                case "model-desc":
                    sortedProducts.sort((a, b) => b.sku.localeCompare(a.sku));
                    break;
                default:
                    // По умолчанию сортировка по имени (а-я)
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            }
            state.singleCategoryData.products = [...sortedProducts]
        },

        clearFillter: (state) => {
            state.singleCategoryData.products = [...state.singleCategoryProducts]
        },

        togglePrices: (state, {payload}) => {
            state.prices = [...payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
            if (payload) {
                state.categoryData = payload.sort((a, b) => a.title.localeCompare(b.title)).map(el => ({
                    ...el,
                    id: el.id.toString(),
                }));
            }
        })
        builder.addCase(fetchTopCategory.fulfilled, (state, { payload }) => {
            if (payload) {
                state.topCategoryData = payload.map(el => ({
                    ...el,
                    id: el.id.toString(),
                    img: el.image
                }));
            }
        })
        builder.addCase(fetchSingleCategory.fulfilled, (state, { payload }) => {
            if (payload) {
                state.singleCategoryData = { ...payload.category };
                state.filterBrands = [
                    ...payload.brands?.map(el => ({
                        ...el,
                        value: el.title,
                        toggle: false 
                    }))
                ]
                state.categoryFiltersData = [
                    ...payload.category.attributes.map(el => ({
                        ...el,
                        values: [
                            ...el.values.map((value, idx) => ({
                                ...value,
                                id: new Date().getTime().toString() + idx,
                                toggle: false 
                            }))
                        ]
                    }))
                ];
                state.singleCategoryData.products = Array.isArray(payload.category.products) ? [...payload.category.products] : [];
                state.singleCategoryProducts = [...state.singleCategoryData.products]
            }
        })
        builder.addCase(fetchSinglCategoryChildren.fulfilled, (state, { payload }) => {
            if (payload) {
                state.singleCategoryChildrenData = { ...payload };
            }
        })
        builder.addCase(fetchFilterCategory.fulfilled, (state, { payload }) => {
            if (payload) {
                state.singleCategoryData.products = [
                    ...payload.map(el => ({
                        ...el,
                        name: el.title
                    }))
                ];
            }
        })
        builder.addCase(fetchSortCategory.fulfilled, (state, {payload}) => {
            if (payload) {
                state.singleCategoryData.products = [
                    ...payload.map(el => ({
                        ...el,
                        name: el.title
                    }))
                ];
            }
        })
    }
});

export const selectCategory = state => state.category;
export const { toggleFilterValues, sortProducts, clearFillter, togglePrices } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
