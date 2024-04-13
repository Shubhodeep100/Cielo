"use client";
import Link from "next/link";
import Loader from "@/app/components/Loader"
import { useState, useEffect } from "react";
import Current from "@/app/components/Current";
import WeekForecast from "@/app/components/WeekForecast";
import WeatherDetails from "@/app/components/WeatherDetails";

export default function City() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data when component mounts
    const fetchData = async () => {
      try {
        // Extract city name from URL
        const cityName = window.location.pathname.split('/').pop() || '';
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=538023bd3c43455084733202231905&q=${cityName}&days=7&aqi=yes&alerts=yes`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setData(data);
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`bg-cover bg-gradient-to-t from-gray-800 to-black ${Object.keys(data).length === 0 ? "h-screen" : ""}`}>
      <div className="rounded-lg flex flex-col h-full">
        {/* Render search input and back button */}
        <div className="flex flex-col md:flex-row justify-between items-center px-10 mt-20 z-20">
          {/* <Input handleSearch={handleSearch} setLocation={setLocation} /> */}
          <Link href="/" className="bg-zinc-900 rounded-xl border-2">
            <div className="p-2 text-center text-white">Go back</div>
          </Link>
        </div>
        <div className="flex items-center justify-center h-full">
          {loading && <Loader />}
        </div>
        {/* Render weather data */}
        {Object.keys(data).length !== 0 && error === "" && (
          <div className="w-full h-full mt-8">
            <div className="flex md:flex-row flex-col p-12 items-center justify-between mt-[-4rem] gap-8">
              <Current data={data} />
              <WeekForecast data={data} />
            </div>
            <div>
              <WeatherDetails data={data} />
            </div>
          </div>
        )}

        {/* Render error message if city not found */}
        {error !== "" && (
          <div className="flex flex-col items-center justify-center sm:justify-start text-white h-screen">
            <h2 className="text-2xl sm:text-3xl mb-4">City data not found!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
