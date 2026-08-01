import axios from "axios";



const API = import.meta.env.VITE_API_URL;

export const getAQIDistribution = async () => {
    const response = await axios.get(`${API}/analytics/aqi-distribution`);
    return response.data;
};

export const getPM10City = async () => {
    const response = await axios.get(`${API}/analytics/pm10-city`);
    return response.data;
};

export const getMonthlyTrend = async () => {
    const response = await axios.get(`${API}/analytics/monthly-trend`);
    return response.data;
};

export const getTopCities = async () => {
    const response = await axios.get(`${API}/analytics/top-polluted-cities`);
    return response.data;
};

export const getAIInsights = async (filters = {}) => {

    const params = {};

    if (filters.city && filters.city !== "") {
        params.city = filters.city;
    }

    if (filters.year && filters.year !== "") {
        params.year = Number(filters.year);
    }

    if (filters.season !== undefined && filters.season !== "") {
        params.season = filters.season;
    }

    const response = await axios.get(
        `${API}/analytics/ai-insights`,
        {
            params
        }
    );

    return response.data;

};

// ⭐ ADD THIS FUNCTION

export const getAnalyticsSummary = async () => {

    const response = await axios.get(
        `${API}/analytics`
    );

    return response.data;

};