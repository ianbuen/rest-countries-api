import Image from "next/image";

export const CountryList = ({countries}) => {

    console.log(countries[0].flags.png);

    return <div className="grid gap-16">
        {countries?.map(({name: {official: name}, flags, population, region, capital}, i) => 
            (<div key={i} className="shadow-md grid rounded-lg overflow-hidden" >
                <div className="relative aspect-video">
                    <Image src={flags.png} alt={flags.alt || `flag of ${name}`} fill />
                </div>

                <div className="grid gap-1 px-6 py-10">
                    <h1>{name}</h1>
                    <div className="text-lg">
                    <p><span className="font-semibold">Population: </span>{(population).toLocaleString("en-US")}</p>
                    <p><span className="font-semibold">Region: </span>{region}</p>
                    <p><span className="font-semibold">Capital: </span>{capital}</p>
                    </div>
                </div>
            </div>)
        )}
    </div> 
}
