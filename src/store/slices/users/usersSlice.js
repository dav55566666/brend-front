import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderSingle, fetchOrders, fetchUser } from "./usersApi";

const updateUserData = (state, payload) => {
    state.loginData = payload.loginData || {};
    state.usersData = payload.usersData || {};
    state.ordersStoryData = payload.ordersStoryData || [];
    state.orderSingleData = payload.orderSingleData || {};
};

const initialState = {
    loginData: {},
    usersData: {},
    ordersStoryData: [],
    orderSingleData: {},
    saveUser: false
};

const loadStateFromCookie = () => {
    try {
        const cookiePairs = document.cookie.split(';');
        let loginData = {};
        let usersData = {};
        let ordersStoryData = []
        let orderSingleData = {}
        for (const pair of cookiePairs) {
            const [key, value] = pair.trim().split('=');
            switch (key) {
                case 'loginData':
                    loginData = JSON.parse(value || '{}');
                    break;
                case 'usersData':
                    usersData = JSON.parse(value || '{}');
                    break;
                default:
                    break;
            }
        }

        return { loginData, usersData, ordersStoryData, orderSingleData };
    } catch (error) {
        return initialState;
    }
};

const saveStateToCookie = (state) => {
    document.cookie = `loginData=${JSON.stringify(state.loginData)}`;
    document.cookie = `usersData=${JSON.stringify(state.usersData)}`;
};

const initialStateFromCookie = loadStateFromCookie();
function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
}
export const usersSlice = createSlice({
    name: "users",
    initialState: initialStateFromCookie,
    reducers: {
        logIn(state, { payload }) {
            clearAllCookies();
            state.loginData = { ...payload.loginData };
            if(payload.save) {
                state.saveUser = true
                saveStateToCookie(state);
            }
        },
        toggleAddress(state, { payload }) {
            state.usersData = {
                ...state.usersData,
                address: state.usersData.address.map(el => ({
                    ...el,
                    checked: el.id === payload.id ? true : false
                }))
            };
            if(!state.loginData.access_token || state.saveUser) {
                saveStateToCookie(state);
            }
        },
        logOut(state) {
            state.loginData = {};
            state.usersData = {};
            state.ordersStoryData = [];
            state.orderSingleData = {};
            clearAllCookies();
            saveStateToCookie(state)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            clearAllCookies();
            if (payload) {
                state.usersData = {
                    ...payload.data,
                    address: [
                        ...payload.data.address.map(el => ({
                            ...el,
                            checked: false
                        }))
                    ]
                };
                if(!state.loginData.access_token || state.saveUser) {
                    saveStateToCookie(state);
                }
            }
        }),
        builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
            if (payload) {
                state.ordersStoryData = [...payload.data];
                if(!state.loginData.access_token || state.saveUser) {
                    saveStateToCookie(state);
                }
            }
        }),
        builder.addCase(fetchOrderSingle.fulfilled, (state, { payload }) => {
            if (payload) {
                state.orderSingleData = { ...payload };
                if(!state.loginData.access_token || state.saveUser) {
                    saveStateToCookie(state);
                }
            }
        })
    }
});

export const selectUsers = state => state.users;
export const { logIn, toggleAddress, logOut } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;