import { forwardRef, useEffect, useRef, useState } from "react";

export const Dropdown = forwardRef(({items, state: [{region}, setState]}, ref) => {

    const formOptions = useRef(null);

    const [width, setWidth] = useState();

    const toggleDropdown = async () => {
        const { classList } = formOptions.current;
        await classList.toggle('hidden');
    }; 
    
    const selectOption = ({target}) => {
        const textOption = target.getAttribute('data-name');
        textOption !== region && setState(state => ({ ...state, region: textOption }));
        toggleDropdown();
    }

    useEffect(() => {
        setWidth(ref.current.children[0].offsetWidth);
    }, [])
    

    return <div ref={ref} data-value={region} className='w-fit relative' style={{width: width}}>
        
        <button type="button" onClick={toggleDropdown} className="grid grid-flow-col gap-x-12 bg-white font-semibold rounded-lg px-5 py-4 text-center items-center drop-shadow-md w-full">
            <p className="text-left">{region || 'Filter by Region'}</p>
            <svg className="w-4 h-4 justify-self-end" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <div ref={formOptions} className="z-10 absolute hidden translate-y-1 bg-white rounded-lg shadow-md p-5 w-full origin-top animate-slide">
            <ul className="grid font-semibold [&>li:hover]:bg-blue-300" aria-labelledby="dropdownDefaultButton">
                {items.map((item, index) => <li key={index} data-name={item} onClick={selectOption} className="p-2 min-h-[2.5rem]">
                    {item}
                </li>)}
            </ul>
        </div>

    </div>  
});

export default Dropdown;