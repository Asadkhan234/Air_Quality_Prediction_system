import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { changePassword } from "../api/auth";



export default function ChangePassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({

        current_password: "",

        new_password: "",

        confirm_password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            formData.new_password !==

            formData.confirm_password

        ) {

            toast.error("Passwords do not match");

            return;

        }

        if (formData.new_password.length < 6) {

            toast.error(

                "Password must be at least 6 characters"

            );

            return;

        }

        try {

            setLoading(true);

            const response = await changePassword(

                formData

            );

            toast.success(

                response.message ||

                "Password Changed Successfully"

            );

            // Remove login session

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Failed to change password"

            );

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 px-4 py-10">

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 w-full max-w-lg">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl shadow-lg shadow-cyan-500/20">

                        🔒

                    </div>

                    <h1 className="text-3xl font-bold mt-5 text-slate-800">

                        Change Password

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Update your account password securely.

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Current Password */}

                    <div className="mb-5">

                        <label className="block font-semibold mb-2 text-slate-700 text-sm">

                            Current Password

                        </label>

                        <div className="relative">

                            <input

                                type={showCurrent ? "text" : "password"}

                                name="current_password"

                                value={formData.current_password}

                                onChange={handleChange}

                                required

                                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-14 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    setShowCurrent(!showCurrent)

                                }

                                className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition-colors"

                            >

                                {showCurrent ? "🙈" : "👁"}

                            </button>

                        </div>

                    </div>

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

                        {loading ? (

                            <>

                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                Updating Password...

                            </>

                        ) : (

                            <>🔒 Change Password</>

                        )}

                    </button>

                </form>

            </div>

        </div>

    );

}