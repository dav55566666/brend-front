"use client";

import { useRouter } from "next/router";
import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/slices/users/usersSlice";
import { useEffect } from "react";


export default function Home() {
    const router = useRouter()
    const {usersData} = useSelector(selectUsers)
    useEffect(() => {
        if(usersData.name) {
            router.push("/")
            return
        }
    },[])
    return (
        <>
            <Brendcrumbs title={"Вход"} />
            <Login />
        </>
    );
}
