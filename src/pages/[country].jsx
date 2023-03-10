import BackButton from "@/components/BackButton";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";
import { AiOutlineLoading3Quarters, IconName } from "react-icons/ai";

export const Country = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const { country } = router.query;

  useEffect(() => {
    const getData = async () => {
      await
        fetch(`https://restcountries.com/v3.1/name/${country}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`)
        .then((res) => res.json())
        .then((data) => { setData(data[0]); });
    };

    country && getData();
  }, [country]);

  return (
    <div className="grid gap-y-14">
      <BackButton />
      <CountryDetails country={data} />
    </div>
  );
};

const CountryDetails = ({ country }) => {

  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);

  // the API only returns the 3-letter country code of the border countries
  // this effect will make more API fetches to resolve the names of the borders
  useEffect(() => {
    const getBorderNames = async () => {
      country.borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
          .then(res => res.json())
          .then(({name: {common}}) => setBorders(state => [...state, common]))
      });
    };
    country?.borders && !borders.length && getBorderNames();
  }, [country?.borders])

  // 
  if (!country) return <div className="flex justify-center w-full py-20">
      <AiOutlineLoading3Quarters className="animate-spin text-7xl" />;
  </div>

  const {
    flags, name, population, region, subregion, 
    capital, tld, currencies, languages,
  } = country;

  const getNativeName = () => {
    const { nativeName } = name;
    const key = _.findKey(nativeName);
    return nativeName[key]["common"];
  };

  const getCurrencies = () => {
    // get all currencies into an array and return
    // as a string, split by spaced-commas.
    let names = _.mapValues(currencies, "name");
    names = _.values(names).map((name) => _.startCase(name));
    return _.toString(names).replaceAll(",", ", ");
  };

  const getLanguages = () => {
    // get all languages into an array and return
    // as a string, split by spaced-commas.
    let langs = _.values(languages);
    return _.toString(langs).replaceAll(",", ", ");
  };

  return (
    <div className="grid gap-8">
      <div className="relative w-full aspect-video bg-green-300">
        <Image
          src={flags.svg}
          alt={`flag of ${country.name.common}`}
          fill
          className="object-cover object-left"
        />
      </div>

      <h1 className="font-bold text-2xl pt-3">{name.common}</h1>

      <div className="grid gap-3 [&_span]:font-semibold">
        <p><span>Native Name:</span> {getNativeName()}</p>
        <p><span>Population:</span> {population.toLocaleString()}</p>
        <p><span>Region:</span> {region}</p>
        <p><span>Sub Region:</span> {subregion}</p>
        <p><span>Capital:</span> {capital}</p>
        <hr className="border-none py-2" />
        <p><span>Top Level Domain:</span> {tld}</p>
        <p><span>Currencies:</span> {getCurrencies()}</p>
        <p><span>Languages:</span> {getLanguages()}</p>
      </div>

      <div className="grid gap-4">
        <h2 className="font-semibold text-lg">Border Countries:</h2>
        <ul className="grid grid-cols-3 gap-4 text-center">
          {borders?.map(border => <li className="bg-white drop-shadow p-2">
            {border}
          </li>)}
        </ul>
      </div>
    </div>
  );
};

export default Country;
