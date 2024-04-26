import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchContacts",
    async function() {
        const {data: contactsData} = await axios.get(`https://back.brend-instrument.ru/api/contacts-us`)
        return contactsData
    }
)