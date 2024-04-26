import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./contactsApi";

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        contactsData: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.fulfilled, (state, {payload}) => {
            if(payload) {
                state.contactsData = {...payload.data}
            }
        })
    }
})

export const selectContacts = state => state.contacts;
export const contactsReducer = contactsSlice.reducer