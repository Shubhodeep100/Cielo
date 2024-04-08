"use client"
import { CiSearch } from "react-icons/ci";
const Input = () => {



  return (
    <form className="flex items-center md:w-2/4 w-full">
      <input type="text" placeholder="Search city" className="rounded-md w-full bg-transparent" />
      <div className="ml-[-25px] text-white cursor-pointer "><CiSearch className="font-bold text-xl" /></div>
    </form>
  )
}

export default Input