import Image from "next/image";
import { useRouter } from "next/router";

export const CountryList = ({countries}) => {

    const router = useRouter();

    const viewCountry = (country) => {
        const dir = country.replaceAll(' ', '-').toLowerCase();

        router.push('/' + dir);
    }

    return <div className="grid gap-12 px-7">
        {countries?.map(({name, flags, population, region, capital}, i) => 
        (<div key={i} className="grid rounded-lg overflow-hidden shadow-lg" onClick={() => viewCountry(name.common)} >
                <div className="relative aspect-video">
                    <Image src={flags.svg} alt={flags.alt || `flag of ${name}`} fill className="object-cover" />
                </div>

                <div className="grid gap-5 p-6 pb-8">
                    <h1 className="font-bold text-xl">{name.official}</h1>
                    <div className="grid gap-1">
                        <p><span className="font-semibold">Population: </span>{(population).toLocaleString("en-US")}</p>
                        <p><span className="font-semibold">Region: </span>{region}</p>
                        <p><span className="font-semibold">Capital: </span>{capital}</p>
                    </div>
                </div>
            </div>)
        )}
    </div> 
}
