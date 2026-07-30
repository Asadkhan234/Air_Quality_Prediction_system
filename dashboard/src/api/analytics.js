import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getAnalytics = async (filters = {}) => {

    const params = {};

    if (filters.city) {
        params.city = filters.city;
    }

    if (filters.year) {
        params.year = Number(filters.year);
    }

    if (filters.season !== "" && filters.season !== undefined) {
        params.season = Number(filters.season);
    }

    const response = await axios.get(`${API}/analytics`, {
        params
    });

    return response.data;
};