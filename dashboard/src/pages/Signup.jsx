import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { signupUser } from "../api/auth";

export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await signupUser(formData);

            toast.success("🎉 Account Created Successfully");

            navigate("/login");

        }

        catch (err) {

            if (err.response?.status === 400) {

                toast.error("⚠ Email already exists");

            }

            else {

                toast.error("❌ Signup Failed");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 px-4">

            <form

                onSubmit={handleSubmit}

                className="bg-white shadow-xl shadow-slate-200/60 border border-slate-100 rounded-3xl p-8 sm:p-10 w-full max-w-md"

            >

                <div className="flex justify-center mb-6">

                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />

                        </svg>

                    </div>

                </div>

                <h1 className="text-2xl font-bold text-center text-slate-800">

                    Create your account

                </h1>

                <p className="text-sm text-slate-400 text-center mt-2 mb-8">

                    Sign up to get started

                </p>

                {/* Name */}

                <div className="mb-4">

                    <label className="block text-sm font-medium text-slate-700 mb-1.5">

                        Full Name

                    </label>

                    <input

                        type="text"

                        name="name"

                        placeholder="John Doe"

                        value={formData.name}

                        onChange={handleChange}

                        required

                        className="w-full border border-slate-200 p-3 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"

                    />

                </div>

                {/* Email */}

                <div className="mb-4">

                    <label className="block text-sm font-medium text-slate-700 mb-1.5">

                        Email

                    </label>

                    <input

                        type="email"

                        name="email"

                        placeholder="you@example.com"

                        value={formData.email}

                        onChange={handleChange}

                        required

                        className="w-full border border-slate-200 p-3 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"

                    />

                </div>

                {/* Password */}

                <div className="mb-6">

                    <label className="block text-sm font-medium text-slate-700 mb-1.5">

                        Password

                    </label>

                    <input

                        type="password"

                        name="password"

                        placeholder="••••••••"

                        value={formData.password}

                        onChange={handleChange}

                        required

                        className="w-full border border-slate-200 p-3 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"

                    />

                </div>

                {/* Button */}

                <button

                    type="submit"

                    disabled={loading}

                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-sm
                    ${
                        loading
                            ? "bg-slate-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/20 hover:shadow-md"
                    }`}

                >

                    {loading ? (

                        <>

                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                            Creating Account...

                        </>

                    ) : (

                        <>
                            🚀 Create Account
                        </>

                    )}

                </button>

                {/* Login Link */}

                <div className="mt-6 text-center">

                    <p className="text-sm text-slate-500">

                        Already have an account?{" "}

                        <Link

                            to="/login"

                            className="text-cyan-600 font-semibold hover:underline"

                        >

                            Login

                        </Link>

                    </p>

                </div>

            </form>

        </div>

    );

}