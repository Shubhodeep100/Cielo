"use client";

// page.tsx

import { useState, useEffect, useRef } from "react";
import Input from "./component/Input";
import Link from "next/link";

interface City {
  name: string;
  country: string;
  timezone: string;
}

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Fetching data...");
      const response = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
      );
      const data = await response.json()

      if (data.results && data.results.length > 0) {
        const extractedCities: City[] = data.results.map((result: any) => ({
          name: result.name,
          country: result.cou_name_en,
          timezone: result.timezone,
        }));
        setCities(extractedCities);
      } else {
        console.error("Error: data.results is empty or undefined");
        setCities([]);
      }
    } catch (error) {
     
      setCities([
        { name: "Error fetching data", country: "Error fetching data", timezone: "Error fetching data" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchQuery(""); // Set searchQuery to empty string if query is empty
    } else {
      setSearchQuery(query); // Set searchQuery to the typed query
    }
  };

  // Filter and sort cities based on search query
  const filteredCities = cities.filter(city => city.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
  const sortedCities = filteredCities.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-slate-900 bg-cover h-screen flex items-center justify-center">
      <div className="flex w-3/5 items-center justify-center flex-col gap-5">
        <div className="w-4/5 bg-gradient-to-b from-slate-700 to-slate-600 rounded-lg h-3/5 py-2">
          <Input onSearch={handleSearch} />
        </div>
        <div className="mx-auto w-full max-w-screen-lg max-h-72 overflow-scroll overflow-x-auto" ref={tableRef}>
          <table className="min-w-full">
            <thead className="sticky top-0">
              <tr className="">
                <th className=" px-6 py-3 bg-gray-500 text-base font-thin text-white  tracking-wider">
                  City Name
                </th>
                <th className=" px-6 py-3  bg-gray-500 text-base font-thin text-white  tracking-wider">
                  Country
                </th>
                <th className=" px-6 py-3  bg-gray-500 text-base font-thin text-white  tracking-wider">
                  Timezone
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 whitespace-nowrap">
                    Loading...
                  </td>
                </tr>
              ) : sortedCities.length > 0 ? (
                sortedCities.map((city, index) => (
                  <tr key={index} className="overflow-y-auto">
                    <td className="px-6 py-2 text-center border border-orange-600 text-white bg-black ">
                      <Link href={''} className="hover:underline"> {city.name}</Link>
                    </td>
                    <td className="px-6 py-2 text-center border border-orange-600 text-white bg-black ">{city.country}</td>
                    <td className="px-6 py-2 text-center border border-orange-600 text-white bg-black ">{city.timezone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 whitespace-nowrap">
                    No matching cities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
