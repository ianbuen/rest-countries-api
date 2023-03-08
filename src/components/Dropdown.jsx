export const Dropdown = ({items}) => {

    return <div className="w-1/2 relative">
        
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" type="button" className="grid grid-flow-col bg-white font-medium rounded-lg p-5 text-center items-center shadow-md w-full">
            Filter by Region
            <svg className="w-4 h-4 justify-self-end" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow px-9 py-5 w-full">
            <ul className="grid gap-2 font-medium" aria-labelledby="dropdownDefaultButton">
                {items.map((item, index) => <li key={index}>
                    {item}
                </li>)}
            </ul>
        </div>

    </div>  
};

export default Dropdown;