import { useRef } from "react";

export const Dropdown = ({items}) => {

    const formOptions = useRef(null);

    const toggleDropdown = async () => {
        const { classList } = formOptions.current;
        await classList.toggle('hidden');
    };

    return <div className="w-fit relative">
        
        <button type="button" onClick={toggleDropdown} className="grid grid-flow-col gap-x-12 bg-white font-medium rounded-lg px-5 py-4 text-center items-center shadow-md w-full">
            Filter by Region
            <svg className="w-4 h-4 justify-self-end" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <div ref={formOptions} className="z-10 absolute hidden translate-y-1 bg-white rounded-lg shadow-md p-5 w-full origin-top animate-slide">
            <ul className="grid gap-2 font-medium" aria-labelledby="dropdownDefaultButton">
                {items.map((item, index) => <li key={index}>
                    {item}
                </li>)}
            </ul>
        </div>

    </div>  
};

export default Dropdown;