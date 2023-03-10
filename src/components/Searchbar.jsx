import { BsSearch } from "react-icons/bs";

export const Searchbar = () => {
    return <form className="w-full relative">   
        <input type="search" className="relative w-full p-4 pl-20 text-sm border-none text-gray-900 rounded-md drop-shadow-md" placeholder="Search for a country..." />
        <BsSearch className="h-5 w-5 absolute top-4 left-7" />
    </form>
};

export default Searchbar;