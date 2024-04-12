"use client";

import { CiSearch } from "react-icons/ci";
interface InputProps {
    handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ handleSearch, setLocation }: InputProps) => {
    return (
        <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
            <input
                type="text"
                className="w-full rounded-xl p-2 outline-none  text-black"
                placeholder="Search city..."
                onKeyDown={handleSearch}
                onChange={(e) => setLocation(e.target.value)}
            />
            <div className="ml-[-30px] text-black cursor-pointer">
                <CiSearch className="text-black text-xl"/>
            </div>
        </form>
    );
};

export default Input;
