"use client";
import Link from "next/link";
import Current from "@/app/components/Current";
import Input from "@/app/components/Input";
import WeekForecast from "@/app/components/WeekForecast";
import WeatherDetails from "@/app/components/WeatherDetails";
import { useState } from "react";


export default function City() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=538023bd3c43455084733202231905&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      }
    }
  };

  return (
    <div className="bg-cover bg-gradient-to-t from-gray-800 to-black h-fit">
      <div className=" w-full rounded-lg flex flex-col h-fit">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 mt-20 z-20">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <Link href="/" className="bg-zinc-900 rounded-xl border-2">
            <div className="p-2 text-center text-white">Go back</div>
          </Link>
        </div>
        {/* Render content */}
        {(Object.keys(data).length === 0 && error === "") && (
          <div className="text-white text-center h-screen ">
            <h2 className="text-3xl font-semibold mb-4">Welcome to Cielo</h2>
            <p className="text-xl">Enter a city name to get the weather forecast</p>
          </div>
        )}
        {error !== "" && (
          <div className="text-white text-center h-screen mt-[5rem]">
            <h2 className="text-3xl font-semibold mb-4">City not found</h2>
            <p className="text-xl">Please enter a valid city name</p>
          </div>
        )}
        {Object.keys(data).length !== 0 && error === "" && (
          <>
            <div className="flex md:flex-row flex-col p-12 items-center justify-between mt-[-4rem] gap-8">
              <Current data={data} />
              <WeekForecast data={data} />
            </div>
            <div>
              <WeatherDetails data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
