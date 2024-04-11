"use client"
import { useState, useEffect, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { FaSortAlphaDownAlt, FaSortAlphaDown } from "react-icons/fa";

interface City {
  id: string;
  name: string;
  country: string;
  timezone: string;
}

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof City; direction: "asc" | "desc" } | null>(null);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = cities.filter(city =>
      city.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [searchQuery, cities]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const extractedCities: City[] = data.results.map((result: any) => ({
          name: result.name,
          country: result.cou_name_en,
          timezone: result.timezone,
        }));
        setCities(extractedCities);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const sortedCities = [...cities];
  if (sortConfig !== null) {
    sortedCities.sort((a, b) => {
      const key = sortConfig.key;
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  const handleSort = (key: keyof City) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        ...sortConfig,
        direction: sortConfig.direction === "asc" ? "desc" : "asc"
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  return (
    <div className="bg-gradient-to-t from-slate-900 to-black bg-cover h-screen flex items-center justify-center">
      <div className="flex w-3/5 items-center justify-center flex-col gap-5">
        <div className=" w-4/5 bg-gray rounded-lg h-3/5 py-2 border-b-2 px-3">
          <input
            type="text"
            className="form-control flex items-center w-full px-2 z-10 bg-transparent outline-none text-white"
            placeholder="Search city"
            value={searchQuery}
            ref={searchInputRef}
            onChange={handleSearchChange}
          />
          <div className="absolute bg-white mt-2 shadow-lg rounded-b-lg z-10 overflow-y-auto max-h-60">
            {suggestions.map(city => (
              <div key={city.name} className="p-2 border-b">
                <Link href={`/city/${city.id}`} className="text-gray-800" >
                  {city.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-lg max-h-72 overflow-scroll overflow-x-auto ">
          <table className="min-w-full">
            <thead className="sticky top-0">
              <tr className="">
                <th className=" px-6 py-3 bg-gray-500 text-base font-thin text-white  tracking-wider cursor-pointer" onClick={() => handleSort("name")}>
                  City Name
                  {sortConfig && sortConfig.key === "name" && (
                    <>
                      {sortConfig.direction === "asc" ? (
                        <FaSortAlphaDown className="ml-1" />
                      ) : (
                        <FaSortAlphaDownAlt className="ml-1" />
                      )}
                    </>
                  )}
                </th>


                <th className=" px-6 py-3  bg-gray-500 text-base font-thin text-white  tracking-wider cursor-pointer" onClick={() => handleSort("country")}>
                  Country
                  {sortConfig && sortConfig.key === "country" && (
                    <>
                      {sortConfig.direction === "asc" ? (
                        <FaSortAlphaDown className="ml-1" />
                      ) : (
                        <FaSortAlphaDownAlt className={`ml-1`} />
                      )}
                    </>
                  )}
                </th>


                <th className=" px-6 py-3  bg-gray-500 text-base font-thin text-white  tracking-wider cursor-pointer" onClick={() => handleSort("timezone")}>
                  Timezone
                  {sortConfig && sortConfig.key === "timezone" && (
                    <>
                      {sortConfig.direction === "asc" ? (
                        <FaSortAlphaDown className="ml-1" />
                      ) : (
                        <FaSortAlphaDownAlt className={`ml-1`} />
                      )}
                    </>
                  )}
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
                      <Link href={`/city/${city.id}`} className="hover:underline" >
                        {city.name}
                      </Link>
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
