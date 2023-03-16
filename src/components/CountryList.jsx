import Image from "next/image";
import { useRouter } from "next/router";
import { kebabCase } from "lodash";
import { createRef, forwardRef, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters as LoadingIcon, AiOutlineVerticalAlignTop as BackToTopIcon } from "react-icons/ai";

export const CountryList = forwardRef(({countries, state}, ref) => {

    const router = useRouter();

    const [itemsPerBatch, setItemsPerBatch] = useState(25);
    const [scroll, setScroll] = useState({ current: 0, max: 0});
    const [mappedCountries, setMappedCountries] = useState(countries);

    const refTopButton = createRef(null);

    // clicking a card triggers this function
    const viewCountry = (country) => {
        const dir = kebabCase(country);
        router.push('/' + dir);
    }
    
    // add scroll listener
    useEffect(() => {
        const handleScroll = () => setScroll({ current: window.scrollY, max: document.body.offsetHeight - window.innerHeight });
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, []);

    // loads more 25 more items when reaching bottom of page
    // also controls visibility of BackToTop button
    useEffect(() => {
        if (scroll.current > 100)
            refTopButton.current.classList.remove('hidden');
        else
            refTopButton.current.classList.add('hidden');

        // refTopButton.current.style.opacity = scroll.current > 100 ? 1 : 0;
        const moreItemsExist = () => scroll.max - scroll.current < 200 && itemsPerBatch < mappedCountries?.length;
        const timeout = setTimeout(() => setItemsPerBatch(items => moreItemsExist() ? items + 25 : items), 500);
        return () => clearTimeout(timeout);
    }, [scroll, itemsPerBatch, mappedCountries, refTopButton])

    // remap countries based on search/filter
    useEffect(() => {
        const [{ region, keywords }] = state;

        setMappedCountries(() => { 
            // no filters set
            if (!(region || keywords))
                return countries;

            return countries.filter(country => {
                // both filters set
                if (region && keywords)
                    return region === country.region && checkMatch(country, keywords)

                // either only keywords or only region filter is set
                return region ? region === country.region : checkMatch(country, keywords);
            });
        });

        // refresh the list into batches of 25 after filters are set
        setItemsPerBatch(25);
    }, [state, countries]);

    // compare keywords if substring of the names and aliases of the country
    const checkMatch = (a, b) => {
        if (b.length < 1)
            return true;
        
        const { altSpellings, name: {official, common} } = a;
        let string = altSpellings?.join() + official + common;
        string = string.toLowerCase().replaceAll(' ', '');
        const sub = b.toLowerCase().split(' ');
        return sub.every(word => string.includes(word));
    }

    // maps the countries array with basic details
    const CountryList = () => { 
        return mappedCountries?.map((country, i) => {
            const {name, flags, population, region, capital} = country;

            if (i < itemsPerBatch)
                return <div key={i} className="grid rounded-lg overflow-hidden shadow-lg cursor-pointer dark:bg-dark-blue" onClick={() => viewCountry(name.common)} >
                    <div className="relative aspect-video">
                        <Image src={flags.svg} alt={flags.alt || `flag of ${name}`} fill className="object-cover" />
                    </div>

                    <div className="grid gap-5 p-6 pb-8">
                        <h1 className="font-bold text-xl">{name.official}</h1>
                        <div className="grid gap-1">
                            <p><span className="font-semibold">Population: </span>{(population).toLocaleString("en-US")}</p>
                            <p><span className="font-semibold">Region: </span>{region}</p>
                            <p><span className="font-semibold">Capital: </span>{capital.length ? capital : 'None'}</p>
                        </div>
                    </div>
                </div>
        }); 
    }; 

    return <>
        <div ref={ref} className="grid gap-12 px-7 animate-fadeIn portrait:grid-cols-1 portrait:sm:grid-cols-2 grid-cols-2 md:col-span-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-20 xl:px-0">
            <CountryList />
            <BackToTopButton ref={refTopButton} />
        </div>
        <LoadingIcon className={`my-16 animate-spin text-7xl col-span-full justify-self-center${itemsPerBatch + 25 > mappedCountries?.length ? ' hidden' : ''}`} />
    </>
});

CountryList.displayName = "CountryList";

const BackToTopButton = forwardRef((props, ref) => {

    const classes = "fixed bottom-5 right-5 sm:bottom-10 sm:right-10 z-10 p-5 rounded-full shadow-md drop-shadow-md " +
                    "animate-fadeIn hover:opacity-100 transition-all text-5xl bg-white dark:bg-dark-blue";

    const handleClick = () => window.scrollTo({top: 0, behavior: 'smooth'});

    return <button ref={ref} className={classes} onClick={handleClick}>
        <BackToTopIcon />
    </button>
});

BackToTopButton.displayName = "BackToTopButton";