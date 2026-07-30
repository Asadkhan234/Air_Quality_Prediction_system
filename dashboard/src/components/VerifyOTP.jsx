import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    verifyOTP,
    forgotPassword
} from "../api/auth";

export default function VerifyOTP() {

    const navigate = useNavigate();

    const email = localStorage.getItem("resetEmail");

    const [loading, setLoading] = useState(false);

    const [resending, setResending] = useState(false);

    const [timer, setTimer] = useState(60);

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        ""
    ]);

    const inputRefs = useRef([]);

    // =============================
    // Countdown Timer
    // =============================

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    // =============================
    // Handle OTP Input
    // =============================

    const handleChange = (value, index) => {

        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < 5) {

            inputRefs.current[index + 1].focus();

        }

    };

    // =============================
    // Backspace
    // =============================

    const handleKeyDown = (e, index) => {

        if (

            e.key === "Backspace" &&

            otp[index] === "" &&

            index > 0

        ) {

            inputRefs.current[index - 1].focus();

        }

    };

    // =============================
    // Paste OTP
    // =============================

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted = e.clipboardData

            .getData("text")

            .trim()

            .slice(0, 6);

        if (!/^\d+$/.test(pasted)) return;

        const digits = pasted.split("");

        const filled = [...otp];

        digits.forEach((digit, i) => {

            if (i < 6) {

                filled[i] = digit;

            }

        });

        setOtp(filled);

    };

    // =============================
    // Verify OTP
    // =============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const code = otp.join("");

        if (code.length !== 6) {

            toast.error("Enter complete OTP");

            return;

        }

        try {

            setLoading(true);

            const response = await verifyOTP({

                email,

                otp: code

            });

            toast.success(

                response.message ||

                "OTP Verified"

            );

            localStorage.setItem(

                "verifiedOTP",

                code

            );

            setTimeout(() => {

                navigate("/reset-password");

            }, 1200);

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Invalid OTP"

            );

        }

        finally {

            setLoading(false);

        }

    };

        // =============================
    // Resend OTP
    // =============================

    const handleResend = async () => {

        try {

            setResending(true);

            const response = await forgotPassword(email);

            toast.success(

                response.message ||

                "OTP Sent Successfully"

            );

            setTimer(60);

            setOtp([
                "",
                "",
                "",
                "",
                "",
                ""
            ]);

            inputRefs.current[0]?.focus();

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Failed to resend OTP"

            );

        }

        finally {

            setResending(false);

        }

    };

    // =============================
    // UI
    // =============================

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 px-4">

            <div className="bg-white shadow-xl border border-slate-100 rounded-3xl p-8 w-full max-w-lg">

                <div className="flex justify-center mb-6">

                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-cyan-500/20">

                        🔐

                    </div>

                </div>

                <h1 className="text-3xl font-bold text-center text-slate-800">

                    Verify OTP

                </h1>

                <p className="text-center text-slate-400 mt-3 mb-8">

                    Enter the 6-digit code sent to

                    <br />

                    <span className="font-semibold text-cyan-600">

                        {email}

                    </span>

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="flex justify-center gap-3 mb-8">

                        {otp.map((digit, index) => (

                            <input

                                key={index}

                                ref={(el) =>

                                    inputRefs.current[index] = el

                                }

                                type="text"

                                maxLength="1"

                                value={digit}

                                onChange={(e) =>

                                    handleChange(

                                        e.target.value,

                                        index

                                    )

                                }

                                onKeyDown={(e) =>

                                    handleKeyDown(

                                        e,

                                        index

                                    )

                                }

                                onPaste={handlePaste}

                                className="w-14 h-14 text-center text-2xl border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            />

                        ))}

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

                                Verifying...

                            </>

                        ) : (

                            <>✅ Verify OTP</>

                        )}

                    </button>

                </form>

                <div className="text-center mt-8">

                    {

                        timer > 0 ?

                        (

                            <p className="text-slate-400">

                                Resend OTP in

                                <span className="font-bold text-cyan-600">

                                    {" "} {timer}s

                                </span>

                            </p>

                        )

                        :

                        (

                            <button

                                onClick={handleResend}

                                disabled={resending}

                                className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline"

                            >

                                {

                                    resending

                                    ?

                                    "Sending..."

                                    :

                                    "Resend OTP"

                                }

                            </button>

                        )

                    }

                </div>

                <div className="mt-8 text-center">

                    <button

                        onClick={() => navigate("/login")}

                        className="text-slate-400 hover:text-cyan-600 transition-colors text-sm"

                    >

                        ← Back to Login

                    </button>

                </div>

            </div>

        </div>

    );

}