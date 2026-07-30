import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { resetPassword } from "../api/auth";

export default function ResetPassword() {

    const navigate = useNavigate();

    const email = localStorage.getItem("resetEmail");

    const otp = localStorage.getItem("verifiedOTP");

    const [loading, setLoading] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({

        new_password: "",

        confirm_password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ==========================
    // Password Strength
    // ==========================

    const getStrength = () => {

        const password = formData.new_password;

        if (password.length === 0) {

            return {
                label: "",
                color: ""
            };

        }

        if (password.length < 6) {

            return {
                label: "Weak",
                color: "bg-rose-500"
            };

        }

        if (password.length < 10) {

            return {
                label: "Medium",
                color: "bg-amber-500"
            };

        }

        return {

            label: "Strong",

            color: "bg-emerald-500"

        };

    };

    const strength = getStrength();

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            formData.new_password !==

            formData.confirm_password

        ) {

            toast.error(

                "Passwords do not match"

            );

            return;

        }

        if (

            formData.new_password.length < 6

        ) {

            toast.error(

                "Password must be at least 6 characters"

            );

            return;

        }

        try {

            setLoading(true);

            const response = await resetPassword({

                email,

                otp,

                new_password: formData.new_password,

                confirm_password: formData.confirm_password

            });

            toast.success(

                response.message ||

                "Password Reset Successfully"

            );

            // Clear temporary data

            localStorage.removeItem(

                "resetEmail"

            );

            localStorage.removeItem(

                "verifiedOTP"

            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Password reset failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

        return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 px-4 py-10">

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 w-full max-w-lg">

                {/* Header */}

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl shadow-lg shadow-cyan-500/20">

                        🔑

                    </div>

                    <h1 className="text-3xl font-bold mt-5 text-slate-800">

                        Reset Password

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Create a new secure password for your account.

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* New Password */}

                    <div className="mb-5">

                        <label className="block font-semibold mb-2 text-slate-700 text-sm">

                            New Password

                        </label>

                        <div className="relative">

                            <input

                                type={showNew ? "text" : "password"}

                                name="new_password"

                                value={formData.new_password}

                                onChange={handleChange}

                                placeholder="Enter new password"

                                required

                                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-14 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    setShowNew(!showNew)

                                }

                                className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition-colors"

                            >

                                {showNew ? "🙈" : "👁"}

                            </button>

                        </div>

                    </div>

                    {/* Password Strength */}

                    {

                        strength.label !== "" && (

                            <div className="mb-5">

                                <div className="w-full bg-slate-100 rounded-full h-2">

                                    <div

                                        className={`${strength.color} h-2 rounded-full transition-all duration-300`}

                                        style={{

                                            width:

                                                strength.label === "Weak"

                                                    ? "33%"

                                                    : strength.label === "Medium"

                                                    ? "66%"

                                                    : "100%"

                                        }}

                                    ></div>

                                </div>

                                <p className="text-sm mt-2 text-slate-500">

                                    Password Strength:

                                    <span className="font-semibold ml-2 text-slate-700">

                                        {strength.label}

                                    </span>

                                </p>

                            </div>

                        )

                    }

                    {/* Confirm Password */}

                    <div className="mb-8">

                        <label className="block font-semibold mb-2 text-slate-700 text-sm">

                            Confirm Password

                        </label>

                        <div className="relative">

                            <input

                                type={showConfirm ? "text" : "password"}

                                name="confirm_password"

                                value={formData.confirm_password}

                                onChange={handleChange}

                                placeholder="Confirm new password"

                                required

                                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-14 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    setShowConfirm(!showConfirm)

                                }

                                className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition-colors"

                            >

                                {showConfirm ? "🙈" : "👁"}

                            </button>

                        </div>

                    </div>

                    {/* Submit Button */}

                    <button

                        type="submit"

                        disabled={loading}

                        className={`w-full py-4 rounded-xl text-white font-bold text-lg transition duration-300 flex justify-center items-center gap-3 shadow-sm

                        ${

                            loading

                                ? "bg-slate-300 cursor-not-allowed"

                                : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/20"

                        }`}

                    >

                        {

                            loading ?

                            <>

                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                Resetting Password...

                            </>

                            :

                            <>

                                🔐 Reset Password

                            </>

                        }

                    </button>

                </form>

                {/* Footer */}

                <div className="mt-8 text-center">

                    <button

                        onClick={() => navigate("/login")}

                        className="text-cyan-600 hover:text-cyan-700 hover:underline font-medium text-sm"

                    >

                        ← Back to Login

                    </button>

                </div>

            </div>

        </div>

    );

}