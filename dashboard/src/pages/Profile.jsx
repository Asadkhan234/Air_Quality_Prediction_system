// src/pages/Profile.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
    uploadProfileImage
} from "../api/auth";

export default function Profile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const [profile, setProfile] = useState({

        name: "",

        email: "",

        created_at: "",

        profile_image: null

    });

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const data = await getProfile();

            setProfile(data);

        }

        catch (error) {

            toast.error(

                "Failed to load profile"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const updated = await updateProfile({

                name: profile.name,

                email: profile.email

            });

            setProfile(updated);

            localStorage.setItem(

                "user",

                JSON.stringify({

                    ...JSON.parse(

                        localStorage.getItem("user")

                    ),

                    name: updated.name,

                    email: updated.email

                })

            );

            window.dispatchEvent(

                new Event("profileUpdated")

            );

            toast.success(

                "Profile updated successfully"

            );

        }

        catch {

            toast.error(

                "Failed to update profile"

            );

        }

        finally {

            setSaving(false);

        }

    };

    const handleImageUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setUploading(true);

            const result = await uploadProfileImage(file);

            const updatedProfile = {

                ...profile,

                profile_image: result.profile_image

            };

            setProfile(updatedProfile);

            // Update localStorage
            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            currentUser.profile_image = result.profile_image;

            localStorage.setItem(
                "user",
                JSON.stringify(currentUser)
            );

            toast.success("Profile picture updated");

            // Notify Navbar and Sidebar
            window.dispatchEvent(
                new Event("profileUpdated")
            );

        }

        catch {

            toast.error("Upload failed");

        }

        finally {

            setUploading(false);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        toast.success("Logged out successfully");

        navigate("/login", { replace: true });

    };

    // Skeleton loading state
    if (loading) {

        return (

            <div className="max-w-3xl mx-auto animate-pulse">

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

                    <div className="flex flex-col items-center">

                        <div className="w-28 h-28 rounded-full bg-slate-100"></div>

                        <div className="h-9 w-32 bg-slate-100 rounded-lg mt-5"></div>

                        <div className="h-8 w-48 bg-slate-100 rounded-lg mt-5"></div>

                        <div className="h-4 w-56 bg-slate-100 rounded mt-3"></div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

                        <div className="h-20 bg-slate-100 rounded-2xl"></div>

                        <div className="h-20 bg-slate-100 rounded-2xl"></div>

                        <div className="h-20 bg-slate-100 rounded-2xl"></div>

                    </div>

                    <div className="mt-10 space-y-6">

                        <div className="h-14 bg-slate-100 rounded-xl"></div>

                        <div className="h-14 bg-slate-100 rounded-xl"></div>

                        <div className="h-14 bg-slate-100 rounded-xl"></div>

                        <div className="h-14 bg-slate-100 rounded-xl"></div>

                    </div>

                </div>

            </div>

        );

    }

    // Profile completeness for the stats card
    const filledFields = [
        profile.name,
        profile.email,
        profile.profile_image
    ].filter(Boolean).length;

    const completionPercent = Math.round(
        (filledFields / 3) * 100
    );

    const memberSince = profile.created_at
        ? new Date(profile.created_at).toLocaleDateString(
              undefined,
              { year: "numeric", month: "short" }
          )
        : "—";

    return (

        <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

                <div className="flex flex-col items-center">

                    <div className="relative">

                        {

                            profile.profile_image ?

                            (

                                <img

                                    src={`http://127.0.0.1:8000/uploads/${profile.profile_image}`}

                                    alt="Profile"

                                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"

                                />

                            )

                            :

                            (

                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-cyan-500/20">

                                    {

                                        profile.name

                                            ? profile.name.charAt(0).toUpperCase()

                                            : "U"

                                    }

                                </div>

                            )

                        }

                    </div>

                    <div className="mt-5">

                        <label className="cursor-pointer">

                            <input

                                type="file"

                                accept="image/*"

                                className="hidden"

                                onChange={handleImageUpload}

                            />

                            <span className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-5 py-2 rounded-xl shadow-sm shadow-cyan-500/20 transition-all duration-200">

                                {

                                    uploading

                                        ? "Uploading..."

                                        : "📷 Upload Photo"

                                }

                            </span>

                        </label>

                    </div>

                    <h1 className="text-3xl font-bold mt-5 text-slate-800">

                        My Profile

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Manage your account information

                    </p>

                </div>

                {/* Statistics cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

                    <div className="bg-blue-50/60 rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                        <p className="text-2xl font-bold text-blue-600">

                            {memberSince}

                        </p>

                        <p className="text-xs text-slate-500 mt-1">

                            Member Since

                        </p>

                    </div>

                    <div className="bg-emerald-50/60 rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                        <p className="text-2xl font-bold text-emerald-600">

                            Active

                        </p>

                        <p className="text-xs text-slate-500 mt-1">

                            Account Status

                        </p>

                    </div>

                    <div className="bg-violet-50/60 rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                        <p className="text-2xl font-bold text-violet-600">

                            {completionPercent}%

                        </p>

                        <p className="text-xs text-slate-500 mt-1">

                            Profile Complete

                        </p>

                    </div>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="mt-10 space-y-6"

                >

                    <div>

                        <label className="block mb-2 font-semibold text-slate-700 text-sm">

                            Full Name

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={profile.name}

                            onChange={handleChange}

                            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            required

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold text-slate-700 text-sm">

                            Email Address

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={profile.email}

                            onChange={handleChange}

                            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"

                            required

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold text-slate-700 text-sm">

                            Joined On

                        </label>

                        <input

                            type="text"

                            value={new Date(
                                profile.created_at
                            ).toLocaleDateString()}

                            readOnly

                            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-500 cursor-not-allowed"

                        />

                    </div>

                    <button

                        type="submit"

                        disabled={saving}

                        className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-sm
                        ${
                            saving
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/20"
                        }`}

                    >

                        {saving ? (

                            <div className="flex justify-center items-center gap-3">

                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                Saving...

                            </div>

                        ) : (

                            "💾 Save Changes"

                        )}

                    </button>

                </form>

                <button

                    type="button"

                    onClick={() => setShowLogoutConfirm(true)}

                    className="w-full mt-4 py-3 rounded-xl text-rose-600 font-semibold border border-rose-200 hover:bg-rose-50 transition-colors"

                >

                    🚪 Logout

                </button>

            </div>

            {/* Logout confirmation dialog */}
            {showLogoutConfirm && (

                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm animate-dropdown">

                        <h2 className="text-lg font-bold text-slate-800">

                            Confirm Logout

                        </h2>

                        <p className="text-sm text-slate-400 mt-2">

                            Are you sure you want to log out of your account?

                        </p>

                        <div className="flex gap-3 mt-6">

                            <button

                                type="button"

                                onClick={() => setShowLogoutConfirm(false)}

                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"

                            >

                                Cancel

                            </button>

                            <button

                                type="button"

                                onClick={handleLogout}

                                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"

                            >

                                Logout

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}