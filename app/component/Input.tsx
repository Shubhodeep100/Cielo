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
    <form className="flex items-center w-full px-2 z-10" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city"
        value={query}
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-white"
      />
      <button type="submit" className="text-white cursor-pointer hover:text-zinc-300">
        <CiSearch className="font-bold text-3xl " />
      </button>
    </form>
  );
}

export default Input;
