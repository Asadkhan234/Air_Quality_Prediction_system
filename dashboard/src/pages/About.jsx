import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
    Database,
    BrainCircuit,
    MapPinned,
    BarChart3,
    ShieldCheck,
    Activity,
    Sparkles,
    Mail,
    Rocket,
    LineChart,
    KeyRound,
    Globe,
    Server,
    History
} from "lucide-react";




// ===============================
// Animated Counter Component
// ===============================

function Counter({ end, duration = 2000, suffix = "" }) {

    const [count, setCount] = useState(0);

    useEffect(() => {

        let start = 0;

        const increment = end / (duration / 20);

        const timer = setInterval(() => {

            start += increment;

            if (start >= end) {

                start = end;

                clearInterval(timer);

            }

            setCount(Math.floor(start));

        }, 25);

        return () => clearInterval(timer);

    }, [end, duration]);

    return (

        <span>

            {count.toLocaleString()}
            {suffix}

        </span>

    );

}


// ===============================
// About Page
// ===============================

export default function About() {

    return (

        <div className="min-h-screen bg-gray-100">

            {/* ================= HERO SECTION ================= */}

            <section className="bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 text-white">

                <div className="max-w-7xl mx-auto px-8 py-20">

                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* Left */}

                        <div>

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">

                                <Sparkles size={20} />

                                <span className="font-semibold">

                                    Machine Learning Project • Live in Production

                                </span>

                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">

                                Air Quality
                                <br />
                                Prediction System

                            </h1>

                            <p className="mt-8 text-lg text-gray-100 leading-8">

                                A professional, full-stack Machine Learning
                                dashboard built with React, FastAPI, PostgreSQL,
                                Scikit-Learn and Tailwind CSS — deployed and
                                publicly accessible, predicting air quality
                                categories across Pakistan in real time.

                            </p>

                            <div className="flex flex-wrap gap-4 mt-10">

                                <Link
                                    to="/prediction"
                                    className="inline-flex items-center gap-2 bg-white text-cyan-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300"
                                >
                                    🚀 Live Prediction
                                </Link>

                                <Link
                                    to="/analytics"
                                    className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-white/25 hover:scale-105 transition duration-300"
                                >
                                    📊 Explore Analytics
                                </Link>

                            </div>

                        </div>

                        {/* Right */}

                        <div>

                            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">

                                <div className="flex items-center gap-3 mb-8">

                                    <Activity size={30} />

                                    <h2 className="text-2xl font-bold">

                                        Project Highlights

                                    </h2>

                                </div>

                                <div className="space-y-5">

                                    <div className="flex items-center gap-4">

                                        <Database className="text-yellow-300" />

                                        <span>

                                            Dataset of
                                            <strong> 21,840+ records</strong>

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <MapPinned className="text-green-300" />

                                        <span>

                                            Air Quality Monitoring
                                            across Pakistan

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <BrainCircuit className="text-pink-300" />

                                        <span>

                                            Logistic Regression
                                            Prediction Model

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <BarChart3 className="text-cyan-300" />

                                        <span>

                                            Interactive Analytics Dashboard

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <ShieldCheck className="text-lime-300" />

                                        <span>

                                            AI-powered Pollution Insights

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <KeyRound className="text-orange-300" />

                                        <span>

                                            Secure JWT Authentication
                                            with OTP Recovery

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <Server className="text-sky-300" />

                                        <span>

                                            Deployed on Render + Vercel
                                            with PostgreSQL

                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= DATASET STATISTICS ================= */}

            <section className="max-w-7xl mx-auto px-8 py-16">

                <h2 className="text-4xl font-bold text-center mb-12">
                    📊 Dataset Statistics
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition duration-300">
                        <div className="text-5xl mb-4">📄</div>
                        <h3 className="text-3xl font-extrabold text-blue-600">
                            <Counter end={21840} suffix="+" />
                        </h3>
                        <p className="mt-3 text-gray-600 font-semibold">Dataset Records</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition duration-300">
                        <div className="text-5xl mb-4">🏙️</div>
                        <h3 className="text-4xl font-extrabold text-green-600">
                            <Counter end={10} />
                        </h3>
                        <p className="mt-3 text-gray-600 font-semibold">Cities Covered</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition duration-300">
                        <div className="text-5xl mb-4">📅</div>
                        <h3 className="text-4xl font-extrabold text-purple-600">
                            <Counter end={2} />
                        </h3>
                        <p className="mt-3 text-gray-600 font-semibold">Years of Data</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition duration-300">
                        <div className="text-5xl mb-4">🌫️</div>
                        <h3 className="text-4xl font-extrabold text-red-600">
                            <Counter end={6} />
                        </h3>
                        <p className="mt-3 text-gray-600 font-semibold">AQI Categories</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition duration-300">
                        <div className="text-5xl mb-4">🎯</div>
                        <h3 className="text-4xl font-extrabold text-indigo-600">
                            <Counter end={97} suffix="%" />
                        </h3>
                        <p className="mt-3 text-gray-600 font-semibold">Model Accuracy</p>
                    </div>

                </div>

            </section>

            {/* ================= TECHNOLOGY STACK + FEATURES ================= */}

            <div className="max-w-7xl mx-auto px-8 space-y-16 pb-16">

                {/* Technology Stack */}

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <h2 className="text-3xl font-bold mb-8 text-center">
                        ⚙️ Technology Stack
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        {[
                            { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
                            { name: "FastAPI", icon: "🚀", color: "from-green-500 to-emerald-500" },
                            { name: "Machine Learning", icon: "🤖", color: "from-purple-500 to-indigo-500" },
                            { name: "Python", icon: "🐍", color: "from-yellow-500 to-orange-500" },
                            { name: "Pandas", icon: "📊", color: "from-pink-500 to-rose-500" },
                            { name: "Scikit-learn", icon: "🧠", color: "from-orange-500 to-red-500" },
                            { name: "Tailwind CSS", icon: "🎨", color: "from-sky-500 to-cyan-500" },
                            { name: "Leaflet", icon: "🗺️", color: "from-green-600 to-lime-500" },
                            { name: "Recharts", icon: "📈", color: "from-teal-500 to-cyan-600" },
                            { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-700" },
                            { name: "SQLAlchemy", icon: "💾", color: "from-indigo-500 to-blue-500" },
                            { name: "JWT", icon: "🔐", color: "from-red-500 to-pink-500" },
                            { name: "Render", icon: "☁️", color: "from-slate-600 to-slate-800" },
                            { name: "Vercel", icon: "▲", color: "from-gray-800 to-black" }
                        ].map((tech, index) => (

                            <div
                                key={index}
                                className={`bg-gradient-to-r ${tech.color} rounded-2xl text-white p-6 text-center hover:scale-105 transition duration-300`}
                            >
                                <div className="text-5xl mb-3">{tech.icon}</div>
                                <h3 className="font-bold text-lg">{tech.name}</h3>
                            </div>

                        ))}

                    </div>

                </div>

                {/* Features */}

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <h2 className="text-3xl font-bold mb-8 text-center">
                        ⭐ Key Features
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {[
                            "Real-time AQI Prediction",
                            "Interactive Pakistan Pollution Map",
                            "Machine Learning Classification",
                            "Dynamic AI Pollution Insights",
                            "Advanced Analytics Dashboard",
                            "Monthly Pollution Trends",
                            "City-wise Comparison",
                            "Health Risk Recommendations",
                            "Secure JWT Authentication",
                            "Email OTP Password Recovery",
                            "User Profile & Prediction History",
                            "Deployed with Persistent PostgreSQL Storage"
                        ].map((feature, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-4 bg-gray-50 rounded-xl p-5 hover:bg-blue-50 transition"
                            >
                                <div className="text-3xl">✅</div>
                                <p className="text-lg font-medium">{feature}</p>
                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* ================= PROJECT FEATURES (detailed cards) ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-16">

                <h2 className="text-4xl font-bold text-center mb-12">
                    ⭐ Project Features
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🔮</div>
                        <h3 className="text-2xl font-bold mb-3">AQI Prediction</h3>
                        <p className="text-gray-600 leading-7">
                            Predict Air Quality Index using a trained Machine Learning model
                            with real environmental parameters.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">📈</div>
                        <h3 className="text-2xl font-bold mb-3">Analytics Dashboard</h3>
                        <p className="text-gray-600 leading-7">
                            Explore monthly trends, AQI distribution,
                            pollution statistics and interactive charts.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🌍</div>
                        <h3 className="text-2xl font-bold mb-3">Geo Analytics</h3>
                        <p className="text-gray-600 leading-7">
                            Visualize pollution across Pakistan using an
                            interactive city-wise pollution map.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🤖</div>
                        <h3 className="text-2xl font-bold mb-3">AI Insights</h3>
                        <p className="text-gray-600 leading-7">
                            Get automatic pollution analysis,
                            health risk assessment and recommendations.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">⚡</div>
                        <h3 className="text-2xl font-bold mb-3">Fast Prediction API</h3>
                        <p className="text-gray-600 leading-7">
                            FastAPI backend deployed on Render provides
                            high-speed prediction and analytics endpoints.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">💻</div>
                        <h3 className="text-2xl font-bold mb-3">Responsive Dashboard</h3>
                        <p className="text-gray-600 leading-7">
                            Fully responsive interface built using
                            React and Tailwind CSS, deployed on Vercel.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🔐</div>
                        <h3 className="text-2xl font-bold mb-3">Secure Authentication</h3>
                        <p className="text-gray-600 leading-7">
                            JWT authentication, email OTP verification,
                            password recovery and protected routes.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">👤</div>
                        <h3 className="text-2xl font-bold mb-3">Profile & History</h3>
                        <p className="text-gray-600 leading-7">
                            Manage your profile picture and details,
                            and review your past AQI predictions.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🐘</div>
                        <h3 className="text-2xl font-bold mb-3">Persistent PostgreSQL</h3>
                        <p className="text-gray-600 leading-7">
                            User accounts and prediction history are stored
                            in a managed PostgreSQL database on Render.
                        </p>
                    </div>

                </div>

            </section>

            {/* ================= MACHINE LEARNING PIPELINE ================= */}

            <section className="max-w-7xl mx-auto px-8 py-16">

                <h2 className="text-4xl font-bold text-center mb-12">
                    🧠 Machine Learning Pipeline
                </h2>

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="grid md:grid-cols-7 gap-6 items-center text-center">

                        <div>
                            <div className="text-5xl mb-4">📂</div>
                            <h3 className="font-bold text-lg">Dataset</h3>
                            <p className="text-gray-500 text-sm mt-2">Air Quality Data</p>
                        </div>

                        <div className="text-4xl text-blue-500">➜</div>

                        <div>
                            <div className="text-5xl mb-4">🧹</div>
                            <h3 className="font-bold text-lg">Data Cleaning</h3>
                            <p className="text-gray-500 text-sm mt-2">Missing Values</p>
                        </div>

                        <div className="text-4xl text-blue-500">➜</div>

                        <div>
                            <div className="text-5xl mb-4">⚙️</div>
                            <h3 className="font-bold text-lg">Feature Engineering</h3>
                            <p className="text-gray-500 text-sm mt-2">Encoding & Scaling</p>
                        </div>

                        <div className="text-4xl text-blue-500">➜</div>

                        <div>
                            <div className="text-5xl mb-4">🤖</div>
                            <h3 className="font-bold text-lg">Trained Machine Learning Model</h3>
                            <p className="text-gray-500 text-sm mt-2">(Logistic Regression)</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* ================= AQI CATEGORIES ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-16">

                <h2 className="text-4xl font-bold text-center mb-12">
                    🌫 AQI Categories
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-green-100 border-l-8 border-green-600 rounded-3xl p-8 shadow-lg hover:scale-105 transition">
                        <h3 className="text-2xl font-bold text-green-700">🟢 Good</h3>
                        <p className="mt-4 text-gray-700">
                            Air quality is satisfactory.
                            Pollution poses little or no risk.
                        </p>
                    </div>

                    <div className="bg-yellow-100 border-l-8 border-yellow-500 rounded-3xl p-8 shadow-lg hover:scale-105 transition">
                        <h3 className="text-2xl font-bold text-yellow-700">🟡 Moderate</h3>
                        <p className="mt-4 text-gray-700">
                            Air quality is acceptable.
                            Sensitive individuals should be cautious.
                        </p>
                    </div>

                    <div className="bg-orange-100 border-l-8 border-orange-500 rounded-3xl p-8 shadow-lg hover:scale-105 transition">
                        <h3 className="text-2xl font-bold text-orange-700">🟠 Unhealthy for Sensitive Groups</h3>
                        <p className="mt-4 text-gray-700">
                            Children and elderly should
                            limit prolonged outdoor exposure.
                        </p>
                    </div>

                    <div className="bg-red-100 border-l-8 border-red-600 rounded-3xl p-8 shadow-lg hover:scale-105 transition">
                        <h3 className="text-2xl font-bold text-red-700">🔴 Unhealthy</h3>
                        <p className="mt-4 text-gray-700">
                            Everyone may begin experiencing
                            health effects.
                        </p>
                    </div>

                    <div className="bg-purple-100 border-l-8 border-purple-600 rounded-3xl p-8 shadow-lg hover:scale-105 transition">
                        <h3 className="text-2xl font-bold text-purple-700">🟣 Very Unhealthy</h3>
                        <p className="mt-4 text-gray-700">
                            Serious health effects may occur.
                            Stay indoors when possible.
                        </p>
                    </div>

                    <div className="bg-gray-200 border-l-8 border-gray-700 rounded-3xl p-8 shadow-lg hover:scale-105 transition">
                        <h3 className="text-2xl font-bold text-gray-800">⚫ Hazardous</h3>
                        <p className="mt-4 text-gray-700">
                            Emergency conditions.
                            Avoid all outdoor activities.
                        </p>
                    </div>

                </div>

            </section>

            {/* ================= SYSTEM ARCHITECTURE ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-20">

                <h2 className="text-4xl font-bold text-center mb-12">
                    🏗 System Architecture
                </h2>

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="grid md:grid-cols-9 gap-4 text-center items-center">

                        <div className="bg-blue-50 rounded-2xl p-6 shadow">
                            <div className="text-5xl mb-4">💻</div>
                            <h3 className="font-bold">React Dashboard</h3>
                            <p className="text-gray-500 text-xs mt-2">Vercel</p>
                        </div>

                        <div className="text-4xl text-blue-600">➜</div>

                        <div className="bg-green-50 rounded-2xl p-6 shadow">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="font-bold">FastAPI Backend</h3>
                            <p className="text-gray-500 text-xs mt-2">Render</p>
                        </div>

                        <div className="text-4xl text-blue-600">➜</div>

                        <div className="bg-purple-50 rounded-2xl p-6 shadow">
                            <div className="text-5xl mb-4">🤖</div>
                            <h3 className="font-bold">ML Model</h3>
                            <p className="text-gray-500 text-xs mt-2">Scikit-learn</p>
                        </div>

                        <div className="text-4xl text-blue-600">➜</div>

                        <div className="bg-indigo-50 rounded-2xl p-6 shadow">
                            <div className="text-5xl mb-4">🐘</div>
                            <h3 className="font-bold">PostgreSQL</h3>
                            <p className="text-gray-500 text-xs mt-2">Render Database</p>
                        </div>

                    </div>

                    <div className="flex justify-center mt-10">

                        <div className="bg-orange-50 rounded-2xl shadow p-8 w-72 text-center">
                            <div className="text-5xl mb-4">📂</div>
                            <h3 className="font-bold text-xl">Pakistan Air Quality Dataset</h3>
                            <p className="text-gray-500 mt-3">Source of training and analytics data.</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* ================= PROJECT OBJECTIVES ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-16">

                <h2 className="text-4xl font-bold text-center mb-12">
                    🎯 Project Objectives
                </h2>

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">✅</div>
                            <div>
                                <h3 className="text-xl font-bold">Predict Air Quality</h3>
                                <p className="text-gray-600 mt-2">
                                    Predict AQI categories using Machine Learning
                                    based on environmental parameters.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">📊</div>
                            <div>
                                <h3 className="text-xl font-bold">Analyze Pollution</h3>
                                <p className="text-gray-600 mt-2">
                                    Visualize pollution statistics through interactive
                                    charts and dashboards.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🌍</div>
                            <div>
                                <h3 className="text-xl font-bold">Geographic Analysis</h3>
                                <p className="text-gray-600 mt-2">
                                    Display pollution levels across Pakistan using
                                    interactive maps.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🤖</div>
                            <div>
                                <h3 className="text-xl font-bold">AI Insights</h3>
                                <p className="text-gray-600 mt-2">
                                    Generate health recommendations based on
                                    pollution severity.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">☁️</div>
                            <div>
                                <h3 className="text-xl font-bold">Production Deployment</h3>
                                <p className="text-gray-600 mt-2">
                                    Ship a fully working, publicly accessible
                                    application with persistent cloud storage.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">📜</div>
                            <div>
                                <h3 className="text-xl font-bold">Prediction History</h3>
                                <p className="text-gray-600 mt-2">
                                    Let users track and revisit their previous
                                    AQI predictions over time.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* ================= FUTURE ENHANCEMENTS ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-16">

                <h2 className="text-4xl font-bold text-center mb-12">
                    🚀 Future Enhancements
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">📡</div>
                        <h3 className="text-2xl font-bold mb-4">Real-time IoT Sensors</h3>
                        <p className="text-gray-600">
                            Integrate live sensor networks for
                            real-time, hyper-local air quality readings.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🌦</div>
                        <h3 className="text-2xl font-bold mb-4">Weather API Integration</h3>
                        <p className="text-gray-600">
                            Pull live weather data automatically instead
                            of manual environmental input.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">📱</div>
                        <h3 className="text-2xl font-bold mb-4">Mobile App</h3>
                        <p className="text-gray-600">
                            Develop Android and iOS applications
                            for instant AQI monitoring.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🔔</div>
                        <h3 className="text-2xl font-bold mb-4">Push Notifications</h3>
                        <p className="text-gray-600">
                            Alert users automatically when air quality
                            reaches unhealthy levels.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">🧩</div>
                        <h3 className="text-2xl font-bold mb-4">Explainable AI (SHAP)</h3>
                        <p className="text-gray-600">
                            Show which factors most influenced each
                            individual AQI prediction.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl mb-5">⚡</div>
                        <h3 className="text-2xl font-bold mb-4">Caching & Rate Limiting</h3>
                        <p className="text-gray-600">
                            Add response caching and rate limiting to
                            further scale the deployed API.
                        </p>
                    </div>

                </div>

            </section>

            {/* ================= DEVELOPER ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-20">

                <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-green-500 rounded-3xl shadow-2xl text-white p-12">

                    <div className="text-center">

                        <div className="text-7xl mb-6">👨‍💻</div>
                        <h2 className="text-4xl font-bold mb-3">Developed By</h2>
                        <h3 className="text-3xl font-semibold">Asad Khan</h3>
                        <p className="text-xl mt-3 text-blue-100">
                            Final Year BS Computer Science Student
                        </p>

                        <div className="flex justify-center flex-wrap gap-4 mt-8">
                            <span className="bg-white/20 px-5 py-3 rounded-full">Python</span>
                            <span className="bg-white/20 px-5 py-3 rounded-full">Machine Learning</span>
                            <span className="bg-white/20 px-5 py-3 rounded-full">React</span>
                            <span className="bg-white/20 px-5 py-3 rounded-full">FastAPI</span>
                            <span className="bg-white/20 px-5 py-3 rounded-full">PostgreSQL</span>
                            <span className="bg-white/20 px-5 py-3 rounded-full">Data Science</span>
                        </div>

                        <p className="mt-10 text-blue-100">
                            Air Quality Prediction System © 2026
                        </p>

                    </div>

                </div>

            </section>

            {/* ================= PROJECT TIMELINE ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-20">

                <h2 className="text-4xl font-bold text-center mb-12">
                    📅 Project Timeline
                </h2>

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="space-y-8">

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                            <div>
                                <h3 className="text-2xl font-bold">Data Collection</h3>
                                <p className="text-gray-600">Collected and prepared Pakistan Air Quality Dataset.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
                            <div>
                                <h3 className="text-2xl font-bold">Data Preprocessing</h3>
                                <p className="text-gray-600">Feature Engineering, Cleaning and Standardization.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                            <div>
                                <h3 className="text-2xl font-bold">Machine Learning</h3>
                                <p className="text-gray-600">Trained Logistic Regression model for AQI prediction.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">4</div>
                            <div>
                                <h3 className="text-2xl font-bold">Dashboard Development</h3>
                                <p className="text-gray-600">React + FastAPI Dashboard with Analytics and AI Insights.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">5</div>
                            <div>
                                <h3 className="text-2xl font-bold">Production Deployment</h3>
                                <p className="text-gray-600">Deployed backend on Render with PostgreSQL and frontend on Vercel.</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* ================= PROJECT STATUS ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-20">

                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-2xl text-white p-10">

                    <h2 className="text-4xl font-bold text-center mb-10">🚀 Project Status</h2>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">

                        <div>
                            <h3 className="text-5xl font-bold">✔</h3>
                            <p className="mt-3">Frontend</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">✔</h3>
                            <p className="mt-3">Backend</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">✔</h3>
                            <p className="mt-3">Machine Learning</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">✔</h3>
                            <p className="mt-3">Authentication</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">✔</h3>
                            <p className="mt-3">Database</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">✔</h3>
                            <p className="mt-3">Live &amp; Deployed</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* ================= CONTACT ================= */}

            <section className="max-w-7xl mx-auto px-8 pb-20">

                <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

                    <h2 className="text-4xl font-bold mb-6">📬 Contact</h2>

                    <p className="text-lg text-gray-600">
                        For project demonstrations, collaborations or feedback,
                        feel free to reach out.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-6">

                        <a
                            href="mailto:ak5963905@gmail.com"
                            className="inline-flex items-center gap-2 bg-gray-100 px-6 py-4 rounded-xl shadow hover:bg-blue-50 transition"
                        >
                            <Mail size={20} className="text-blue-600" />
                            ak5963905@gmail.com
                        </a>

                        <a
                            href="https://github.com/Asadkhan234"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-100 px-6 py-4 rounded-xl shadow hover:bg-blue-50 transition"
                        >
                            <FaGithub size={20} className="text-gray-800" />
                            GitHub Portfolio
                        </a>

                        <a
                            href="https://www.linkedin.com/in/asadullah-khan-35461729a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-100 px-6 py-4 rounded-xl shadow hover:bg-blue-50 transition"
                        >
                            <FaLinkedin size={20} className="text-blue-700" />
                            LinkedIn Profile
                        </a>

                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-6">

                        <a
                            href="https://air-quality-prediction-system-mauve.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-6 py-4 rounded-xl shadow hover:bg-cyan-100 transition font-semibold"
                        >
                            <Globe size={20} />
                            Live Site
                        </a>

                    </div>

                </div>

            </section>

            {/* ================= FOOTER ================= */}

            <footer className="bg-gray-900 text-gray-300 py-8 mt-10">

                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">

                    <p>© 2026 Air Quality Prediction System</p>

                    <p className="mt-4 md:mt-0">
                        Developed with ❤️ using React • FastAPI • PostgreSQL
                    </p>

                </div>

            </footer>

        </div>

    );

}