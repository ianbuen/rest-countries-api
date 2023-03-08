import Image from "next/image";
import { useRouter } from "next/router";

export const CountryList = ({countries}) => {

    const router = useRouter();

    const viewCountry = (country) => {
        const dir = country.replaceAll(' ', '-').toLowerCase();

        router.push('/' + dir);
    }

    if (!countries)
        return <h1>Loading...</h1>

    return <div className="grid gap-16 px-12">
        {countries?.map(({name, flags, population, region, capital}, i) => 
            (<div key={i} className="shadow-lg grid rounded-lg overflow-hidden" onClick={() => viewCountry(name.common)} >
                <div className="relative aspect-video">
                    <Image src={flags.png} alt={flags.alt || `flag of ${name}`} fill />
                </div>

                <div className="grid gap-5 p-8 pb-12">
                    <h1 className="font-bold text-2xl">{name.official}</h1>
                    <div className="grid gap-1 text-lg">
                        <p><span className="font-semibold">Population: </span>{(population).toLocaleString("en-US")}</p>
                        <p><span className="font-semibold">Region: </span>{region}</p>
                        <p><span className="font-semibold">Capital: </span>{capital}</p>
                    </div>
                </div>
            </div>)
        )}
    </div> 
}
