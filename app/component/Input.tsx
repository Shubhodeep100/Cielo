"use client"
import { CiSearch } from "react-icons/ci";
const Input = () => {



  return (
    <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
      <input type="text" placeholder="Search city" className="w-full bg-transparent border-b-2 placeholder-white outline-none text-white" />
      <div className="ml-[-25px] text-white cursor-pointer ">
        <CiSearch className="font-bold text-xl" />
      </div>
    </form>
  )
}

export default Input