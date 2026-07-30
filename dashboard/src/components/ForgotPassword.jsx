import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { forgotPassword } from "../api/auth";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {

            toast.error("Please enter your email");

            return;

        }

        try {

            setLoading(true);

            const response = await forgotPassword(email);

            toast.success(
                response.message || "OTP Sent Successfully"
            );

            // Save email for Verify OTP page
            localStorage.setItem(
                "resetEmail",
                email
            );

            setTimeout(() => {

                navigate("/verify-otp");

            }, 1200);

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Failed to send OTP"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 px-4">

            <div className="bg-white shadow-xl border border-slate-100 rounded-3xl p-8 w-full max-w-md">

                {/* Icon */}

                <div className="flex justify-center mb-6">

                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-cyan-500/20">

                        📧

                    </div>

                </div>

                <h1 className="text-3xl font-bold text-center text-slate-800">

                    Forgot Password

                </h1>

                <p className="text-center text-slate-400 mt-2 mb-8">

                    Enter your registered email to receive a verification code.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-6">

                        <label className="block font-semibold mb-2 text-slate-700 text-sm">

                            Email Address

                        </label>

                        <input

                            type="email"

                            value={email}

                            onChange={(e) =>

                                setEmail(e.target.value)

                            }

                            placeholder="you@example.com"

                            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className={`w-full py-4 rounded-xl text-white font-bold transition duration-300 flex justify-center items-center gap-3 shadow-sm

                        ${loading

                                ? "bg-slate-300 cursor-not-allowed"

                                : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/20"

                            }`}

                    >

                        {loading ? (

                            <>

                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                Sending OTP...

                            </>

                        ) : (

                            <>📨 Send OTP</>

                        )}

                    </button>

                </form>

                <div className="mt-8 text-center">

                    <Link

                        to="/login"

                        className="text-cyan-600 hover:text-cyan-700 hover:underline font-semibold text-sm"

                    >

                        ← Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

}