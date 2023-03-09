import BackButton from "@/components/BackButton";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";

export const Country = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();
  const { country } = router.query;

  useEffect(() => {
    const getData = async () => {

      await fetch(`https://restcountries.com/v3.1/name/${country}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`)
        .then(res => res.json())
        .then(data => {
          setData(data[0]);
          setLoading(false);
      });
    };

    country && getData();
  }, [country]);

  return <div className="min-h-screen outline-red-400 outline-1 outline">
      <BackButton />
      <CountryDetails country={data} />
  </div>;
};

const CountryDetails = ({country}) => {

  if (!country)
      return <h1>Loading...</h1>

  const { flags, name, population, region, 
          subregion, capital, tld, currencies, 
          languages, borders } = country;

  const getNativeName = () => {
    const { nativeName } = name;
    const key = _.findKey(nativeName);
    return nativeName[key]['common'];
  }

  const getCurrencies = () => {
    // get all currencies into an array and return
    // as a string, split by spaced-commas.
    let names = _.mapValues(currencies, 'name');
    names = _.values(names).map(name => _.startCase(name));
    return _.toString(names).replace(',', ', ');
  }

  const getLanguages = () => {
    // get all languages into an array and return
    // as a string, split by spaced-commas.
    let langs = _.values(languages);
    return _.toString(langs).replace(',', ', ');
  }

  return <div className="grid">
    <div className="relative w-full aspect-video">
      <Image src={flags.svg} alt={`flag of ${country.name.common}`} fill />
    </div>

    <h1 className="">{name.common}</h1>
    <p>Native Name: {getNativeName()}</p>
    <p>Population: {population.toLocaleString()}</p>
    <p>Region: {region}</p>
    <p>Sub Region: {subregion}</p>
    <p>Capital: {capital}</p>

    <p>Top Level Domain: {tld}</p>
    <p>Currencies: {getCurrencies()}</p>
    <p>Languages: {getLanguages()}</p>

    <h2>Border Countries:</h2>
    <ul>

    </ul>
  </div>
}

export default Country;
