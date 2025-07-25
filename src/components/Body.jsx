import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import Login from "./Login";

const Body = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        try {
            const response = await fetch(`${BASE_URL}/profile/view`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            if (data.success) {
                dispatch(addUser(data.user));
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Only fetch user if not on signup page and no user exists
        if (!user && location.pathname !== '/sign-up') {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [user, location.pathname]);

    // If user is on signup page, show the signup form without requiring login
    if (location.pathname === '/sign-up') {
        return (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        );
    }

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    // For other pages, require user to be logged in
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