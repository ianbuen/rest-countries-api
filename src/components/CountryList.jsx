import Image from "next/image";
import { useRouter } from "next/router";
import { kebabCase } from "lodash";
import { forwardRef, useEffect } from "react";

export const CountryList = forwardRef(({countries, state: [{keywords, region}]}, ref) => {

    const router = useRouter();

    const viewCountry = (country) => {
        const dir = kebabCase(country);
        router.push('/' + dir);
    }

    const checkMatch = (a, b) => {

        if (b.length < 1)
            return true;
        
        const { altSpellings, name: {official, common} } = a;
        let string = altSpellings?.join() + official + common;
        console.log(altSpellings);
        string = string.toLowerCase().replaceAll(' ', '');
        const sub = b.toLowerCase().split(' ');
        return sub.every(word => string.includes(word));
    }

    // maps the countries array with basic details
    const showCountryList = (countries) => { 
        let copyCountries = countries.reverse();

        return copyCountries?.map((country, i) => {
            const {name, flags, population, region, capital} = country;

            if (checkMatch(country, keywords))
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

    // conditional rendering: if region filter is set, only show countries for that region
    return <div ref={ref} className="grid gap-12 px-7 animate-fadeIn md:grid-cols-2 md:col-span-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-20 xl:px-0">
        {region ? showCountryList(countries.filter(country => country.region === region)) : showCountryList(countries)}
    </div>
});
