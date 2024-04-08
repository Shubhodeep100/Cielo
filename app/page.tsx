"use client"

import Input from "./component/Input";

const Home = () => {
  return (
    <div className="bg-cover bg-gradient-to-r from-cyan-600 to-blue-400 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-full">
        {/* Input And Logo */}
        <div className="flex flex-col justify-between items-center p-12 md:flex-row">
          <Input />
          <h1>Cielo</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;