import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

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