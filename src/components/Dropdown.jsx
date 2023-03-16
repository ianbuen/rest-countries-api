import { forwardRef, useEffect, useRef, useState } from "react";

export const Dropdown = forwardRef(({items, state: [{region}, setState]}, ref) => {

    const refOptions = useRef(null);
    const refClose = useRef(null);

    const [width, setWidth] = useState();

    const toggleDropdown = () => {
        const { classList: dropdown } = refOptions.current;
        const { classList: close } = refClose.current;
        dropdown.toggle('hidden');
        close.toggle('hidden');
    }; 
    
    const selectOption = ({target}) => {
        const textOption = target.getAttribute('data-name');
        textOption !== region && setState(state => ({ ...state, region: textOption }));
        toggleDropdown();
    }

    useEffect(() => {
        // prevent dropdown resizing after selecting, by setting width to fit 'Filter by Region'
        setWidth(ref.current.children[0].offsetWidth);
    }, [ref])

    const handleClick = () => {
        const { classList : dropdown } = refOptions.current;
        const { classList : dropdownClose } = refClose.current;
        dropdown.add('hidden');
        dropdownClose.add('hidden');
    }
    
    return <>
        <div ref={ref} data-value={region} className='w-fit relative z-20 md:justify-self-end' style={{width: width}}>
            <button type="button" onClick={toggleDropdown} className="grid grid-flow-col gap-x-12 bg-white font-semibold rounded-lg px-5 py-4 text-center items-center drop-shadow-md w-full dark:bg-dark-blue">
                <p className="text-left">{region || 'Filter by Region'}</p>
                <svg className="w-4 h-4 justify-self-end" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            <div ref={refOptions} className="z-10 absolute hidden translate-y-1 bg-white rounded-lg shadow-md p-5 w-full origin-top animate-slide dark:bg-dark-blue">
                <ul className="grid font-semibold [&>li:hover]:bg-blue-300" aria-labelledby="dropdownDefaultButton">
                    {items.map((item, index) => <li key={index} data-name={item} onClick={selectOption} className="p-2 min-h-[2.5rem]">
                        {item}
                    </li>)}
                </ul>
            </div>
        </div>

        <div ref={refClose} className="fixed w-screen h-screen top-0 left-0 z-10 hidden" onClick={handleClick}></div>
    </>
});

Dropdown.displayName = "Dropdown";

export default Dropdown;