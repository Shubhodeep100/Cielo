"use client";
import Image from 'next/image'
import React from 'react'
import cloud from '../assets/cloud.png'



const links = [
    {
        id: 1,
        link: "Features",
    },
    {
        id: 2,
        link: "Worlwide ",
    },
    {
        id: 3,
        link: "Pricing",
    },
    {
        id: 4,
        link: "FAQs",
    },
    {
        id: 5,
        link: "Blog",
    },
];
function Navbar() {



    return (
        <div className='fixed py-1 bg-zinc-950 w-full flex flex-row justify-between px-6 z-50'>
            <div className='flex flex-row justify-center sm:justify-start w-full py-2'>
                <Image
                    src={cloud}
                    alt="Logo"
                    className="w-20 h-14 transform transition duration-500 hover:scale-110"
                />
                <h1 className="flex items-center text-5xl font-serif text-white tracking-wider mx-4 font-signature font-semibold">Cielo</h1>
            </div>
            <nav className='sm:flex items-center hidden'>
                {links.map(({ id, link }) => (
                    <div
                        key={id}
                        className="px-4"
                    >
                        <p className='cursor-pointer text-base font-thin text-white hover:text-gray-400'>
                            {link}
                        </p>
                    </div>
                ))}
            </nav>
        </div>
    )
}

export default Navbar
