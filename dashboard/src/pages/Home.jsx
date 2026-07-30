import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaWind,
  FaLeaf,
  FaChartPie,
  FaArrowRight,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-sm font-semibold text-cyan-700">
              Machine Learning Project
            </span>
          </div>

          <h1 className="text-6xl font-extrabold text-slate-800 mb-6">
            🌍 AI Air Quality Prediction
          </h1>

          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10">
            Predict Air Quality Index (AQI) using Machine Learning.
            Analyze pollution levels, explore interactive charts,
            and receive health recommendations based on air quality.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">

            <Link
              to="/prediction"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-sm shadow-cyan-500/20 hover:shadow-md transition-all duration-200"
            >
              Start Prediction
            </Link>

            <Link
              to="/dashboard"
              className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
            >
              View Dashboard
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          Project Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FaChartLine className="text-2xl text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-slate-800">
              Dashboard
            </h3>

            <p className="text-slate-400 mb-5">
              View AQI summary, pollution statistics, and visual charts.
            </p>

            <Link
              to="/dashboard"
              className="text-cyan-600 hover:text-cyan-700 font-semibold flex justify-center items-center gap-2"
            >
              Explore <FaArrowRight />
            </Link>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FaWind className="text-2xl text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-slate-800">
              AQI Prediction
            </h3>

            <p className="text-slate-400 mb-5">
              Enter pollution and weather data to predict AQI instantly.
            </p>

            <Link
              to="/prediction"
              className="text-cyan-600 hover:text-cyan-700 font-semibold flex justify-center items-center gap-2"
            >
              Predict <FaArrowRight />
            </Link>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FaChartPie className="text-2xl text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-slate-800">
              Analytics
            </h3>

            <p className="text-slate-400 mb-5">
              Explore interactive graphs and pollution trends.
            </p>

            <Link
              to="/analytics"
              className="text-cyan-600 hover:text-cyan-700 font-semibold flex justify-center items-center gap-2"
            >
              View Charts <FaArrowRight />
            </Link>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FaLeaf className="text-2xl text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-slate-800">
              About Project
            </h3>

            <p className="text-slate-400 mb-5">
              Learn about the dataset, machine learning model, and technologies.
            </p>

            <Link
              to="/about"
              className="text-cyan-600 hover:text-cyan-700 font-semibold flex justify-center items-center gap-2"
            >
              Learn More <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">21K+</h2>
              <p className="mt-2 text-slate-300">Dataset Records</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">6</h2>
              <p className="mt-2 text-slate-300">AQI Categories</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">97%</h2>
              <p className="mt-2 text-slate-300">Model Accuracy</p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">Logistic Regression</h2>
              <p className="mt-2 text-slate-300">Machine Learning Model</p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}