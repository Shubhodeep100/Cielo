import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
  onSearch: (query: string) => void;
}

const Input: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="flex items-center md:w-2/4 w-full order-2 md:order-1" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city"
        value={query}
        onChange={handleChange}
        className="w-full bg-transparent border-b-2 placeholder-white outline-none text-white"
      />
      <button type="submit" className="ml-[-25px] text-white cursor-pointer ">
        <CiSearch className="font-bold text-xl" />
      </button>
    </form>
  );
}

export default Input;
