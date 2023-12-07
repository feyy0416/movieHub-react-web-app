import TopNavigation from "./TopNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Login/Signup";
import MyProfile from "./Profile";
import UserTable from "./Profile/userTable";
import MovieDetail from "./MovieDetail";
import UserProfile from "./Profile/user";
// import { Provider } from "react-redux";
// import axios from "axios";

function Moviehub() {
    return (
        <div>
            <TopNavigation />
            <div className="w-100">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Search" element={<Search />} />
                    <Route path="Profile" element={<MyProfile />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="Signup" element={<Signup />} />
                    <Route path="Admin/UsersManagement" element={<UserTable />} />
                    <Route path="movies/:movieId" element={<MovieDetail />} />
                    <Route path="user/:username" element={<UserProfile />} />
                </Routes>
            </div>
        </div>
    );   
}
export default Moviehub;