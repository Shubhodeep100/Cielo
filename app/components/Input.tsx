"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface InputProps {
    handleSearch: (city: string) => void;
}

const Input = ({ handleSearch }: InputProps) => {
    const router = useRouter();
    const [city, setCity] = useState("");

    // Get the city name from the URL query parameter
    const defaultCity = router.query.id as string;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(city);
    };

    return (
        <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
            <input
                type="text"
                className="w-full rounded-xl p-2 outline-none text-black"
                placeholder="Search city..."
                value={city || defaultCity || ""}
                onChange={handleInputChange}
            />
            <div className="ml-[-30px] text-black cursor-pointer" onClick={handleSearchClick}>
                <CiSearch className="text-black text-xl" />
            </div>
        </form>
    );
};

export default Input;