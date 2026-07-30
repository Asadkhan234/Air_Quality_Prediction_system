import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AQIProvider } from "./context/AQIContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import GeoAnalytics from "./pages/GeoAnalytics";
import About from "./pages/About";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import ChangePassword from "./pages/ChangePassword";

import ForgotPassword from "./components/ForgotPassword";

import VerifyOTP from "./components/VerifyOTP";

import ResetPassword from "./components/ResetPassword";

import Profile from "./pages/Profile";  // cld changs 


function App() {

    const token = localStorage.getItem("token");

    return (

        <AQIProvider>

            <BrowserRouter>

                <Routes>

                    {/* Default Route */}

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={token ? "/home" : "/login"}
                                replace
                            />
                        }
                    />

                    {/* ===========================
                        Public Routes
                    ============================ */}

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <Signup />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <PublicRoute>
                                <ForgotPassword />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/verify-otp"
                        element={
                            <PublicRoute>
                                <VerifyOTP />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/reset-password"
                        element={
                            <PublicRoute>
                                <ResetPassword />
                            </PublicRoute>
                        }
                    />


                    {/* ===========================
                        Protected Routes
                    ============================ */}

                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/home"
                            element={<Home />}
                        />

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/prediction"
                            element={<Prediction />}
                        />

                        <Route
                            path="/analytics"
                            element={<Analytics />}
                        />

                        <Route
                            path="/geo-analytics"
                            element={<GeoAnalytics />}
                        />

                        <Route
                            path="/about"
                            element={<About />}
                        />

                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />


                    </Route>

                    {/* ===========================
                        404 Route
                    ============================ */}

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={token ? "/dashboard" : "/login"}
                                replace
                            />
                        }
                    />

                </Routes>

            </BrowserRouter>

        </AQIProvider>

    );

}

export default App;