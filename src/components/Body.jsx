import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import Login from "./Login";


const Body = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    async function fetchUser() {
        const response = await fetch(`${BASE_URL}/profile/view`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        dispatch(addUser(data.user));
    }
    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    },[]);

    return (
        user ? (
            <>          
                <Navbar />
                <Outlet />
            <Footer />
            </>
        ) : (
            <Login />
        )
    );
}

export default Body;