"use client";
import { useRouter } from "next/navigation";
import Basket from "../components/Basket/Basket";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/slices/users/usersSlice"

export default function BasketPage () {
    const router = useRouter()
    const {usersData} = useSelector(selectUsers)
    useEffect(() => {
        if(!usersData.name) {
            router.push("/")
        }
    }, [usersData.name])
    return (
        <Basket />
    )
}