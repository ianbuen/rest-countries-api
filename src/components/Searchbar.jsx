import { forwardRef } from "react";
import { BsSearch } from "react-icons/bs";

export const Searchbar = forwardRef(({state: [{keywords}, setState]}, ref) => {

    const handleChange = ({target}) => {
        setState(state => ({...state, 'keywords': target.value}));
    };

    return <form ref={ref} className="relative xl:w-3/4">   
        <input type="search" className="relative w-full p-4 pl-20 text-sm border-none text-dark-gray rounded-md drop-shadow-md" placeholder="Search for a country..." value={keywords} onChange={handleChange} />
        <BsSearch className="h-5 w-5 absolute top-4 left-7" />
    </form>
});

export default Searchbar;