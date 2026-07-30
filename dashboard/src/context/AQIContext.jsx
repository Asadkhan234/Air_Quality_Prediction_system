import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

const AQIContext = createContext();

export function AQIProvider({ children }) {

    // Current Prediction
    const [aqiData, setAQIData] = useState({
        prediction: "No Prediction",
        city: "-",

        pm10: "-",
        pm2_5: "-",

        carbon_monoxide: "-",
        nitrogen_dioxide: "-",
        sulphur_dioxide: "-",
        ozone: "-",
        dust: "-",

        temperature: "-",
        humidity: "-",
        precipitation: "-",

        wind_speed: "-",
        wind_direction: "-",

        pressure: "-",

        month: "-",
        year: "-",
        season: "-"
    });

    // Prediction History (Load from Local Storage)
    const [history, setHistory] = useState(() => {

        const savedHistory = localStorage.getItem("aqiHistory");

        return savedHistory ? JSON.parse(savedHistory) : [];

    });

    // Save History whenever it changes
    useEffect(() => {

        localStorage.setItem(
            "aqiHistory",
            JSON.stringify(history)
        );

    }, [history]);

    // Clear History Function
    const clearHistory = () => {

        setHistory([]);

        localStorage.removeItem("aqiHistory");

    };

    return (

        <AQIContext.Provider
            value={{
                aqiData,
                setAQIData,

                history,
                setHistory,

                clearHistory
            }}
        >

            {children}

        </AQIContext.Provider>

    );

}

export function useAQI() {

    return useContext(AQIContext);

}