import axios from "axios";


const API = import.meta.env.VITE_API_URL;

// ================= LOGIN =================

export const loginUser = async (data) => {

    const response = await axios.post(
        `${API}/login`,
        data
    );

    return response.data;

};

// ================= SIGNUP =================

export const signupUser = async (data) => {

    const response = await axios.post(
        `${API}/signup`,
        data
    );

    return response.data;

};

// ================= CHANGE PASSWORD =================

export const changePassword = async (data) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(

        `${API}/change-password`,

        data,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};


// Forgate Password



export const forgotPassword = async (email) => {

    const response = await axios.post(

        `${API}/forgot-password`,

        {

            email

        }

    );

    return response.data;

};

export const verifyOTP = async (data) => {

    const response = await axios.post(

        `${API}/verify-otp`,

        data

    );

    return response.data;

};

export const resetPassword = async (data) => {

    const response = await axios.post(

        `${API}/reset-password`,

        data

    );

    return response.data;

};


// Get profile 

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

//  Update profile

export const updateProfile = async (data) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API}/profile`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};



// ================= UPLOAD PROFILE IMAGE =================

export const uploadProfileImage = async (file) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(

        `${API}/profile/upload`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${token}`,

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};