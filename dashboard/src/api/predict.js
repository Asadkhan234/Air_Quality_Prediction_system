import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

export const predictAQI = async (data) => {

    // Get JWT token stored after login
    const token = localStorage.getItem("token");

    const response = await axios.post(

        `${API_URL}/predict`,

        data,

        {
            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};