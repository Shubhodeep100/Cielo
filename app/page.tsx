"use client";

import { useState, useEffect, useRef } from "react";

interface City {
  name: string;
  country: string;
  timezone: string;
}

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Fetching data...");
      const response = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
      );
      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API data:", data);

      if (data.results && data.results.length > 0) {
        const extractedCities: City[] = data.results.map((result: any) => ({
          name: result.name,
          country: result.cou_name_en,
          timezone: result.timezone,
        }));
        console.log("Extracted cities:", extractedCities);
        setCities(extractedCities);
      } else {
        console.error("Error: data.results is empty or undefined");
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      setCities([
        { name: "Error fetching data", country: "Error fetching data", timezone: "Error fetching data" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cover bg-gradient-to-r bg-black to-zinc-700 h-screen flex items-center justify-center">
      <div className="flex w-3/5 items-center justify-center">
        <div
          className="mx-auto w-full max-w-screen-lg max-h-60 overflow-scroll overflow-x-auto "
          ref={tableRef}
        >
          <table className="min-w-full">
            <thead className="sticky top-0 w-full  ">
              <tr className="">
                <th className="px-6 py-3 bg-gray-700 text-base font-medium text-white  tracking-wider">
                  City Name
                </th>
                <th className="px-6 py-3  bg-gray-700 text-base font-medium text-white  tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3  bg-gray-700 text-base font-medium text-white  tracking-wider">
                  Timezone
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.length > 0 ? (
                cities.map((city, index) => (
                  <tr key={index} className="overflow-y-auto">
                    <td className="px-6 py-4 text-center border bg-orange-600">{city.name}</td>
                    <td className="px-6 py-4 text-center border bg-orange-600">{city.country}</td>
                    <td className="px-6 py-4 text-center border bg-orange-600">{city.timezone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 whitespace-nowrap">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Home;