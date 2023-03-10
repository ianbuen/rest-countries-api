import BackButton from "@/components/BackButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import _ from "lodash";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Country = ({ country }) => {
  return (
    <div className="grid gap-y-20 p-10 pb-24 lg:p-20">
      <BackButton />
      <CountryDetails country={country} />
    </div>
  );
};

const CountryDetails = ({ country }) => {

  const [borders, setBorders] = useState([]);

  // the API only returns the 3-letter country code of the border countries
  // this effect will make more API fetches to resolve the names of the borders
  useEffect(() => {
    const getBorderNames = async () => {
      country?.borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
          .then(res => res.json())
          .then(({name: {common}}) => setBorders(state => _.uniq([...state, common])))
      });
    };
    !borders.length && getBorderNames();
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
    return _.isEmpty(nativeName) ? 'None' : nativeName[key]["common"];
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
  
  const getTLDs = () => {
    return _.toString(tld).replaceAll(",", ", ");
  }

  return (
    <div className="grid lg:grid-cols-2 md:gap-16 xl:gap-32">
      <div className="relative w-full aspect-[3/2] md:aspect-video lg:aspect-[3/2] 2xl:aspect-auto">
        <Image src={flags.png} alt={`flag of ${name.common}`} fill className="object-cover object-left" />
      </div>

      <div className="grid gap-8 lg:gap-10">
        <h1 className="font-bold text-2xl pt-14 xl:text-4xl md:pt-0">{name.common}</h1>

        <div className="grid gap-12 [&_span]:font-semibold lg:[&_span]:font-bold lg:grid-cols-2">
          <div className="grid gap-2">
            <p><span>Native Name:</span> {getNativeName()}</p>
            <p><span>Population:</span> {population.toLocaleString()}</p>
            <p><span>Region:</span> {region}</p>
            <p><span>Sub Region:</span> {subregion}</p>
            <p><span>Capital:</span> {capital.length ? capital : 'None'}</p>
          </div>

          <div className="grid auto-rows-min gap-2">
            <p><span>Top Level Domain:</span> {getTLDs()}</p>
            <p><span>Currencies:</span> {getCurrencies()}</p>
            <p><span>Languages:</span> {getLanguages()}</p>
          </div>
        </div>

        <div className="grid gap-4 mt-4 lg:my-0 xl:my-8 2xl:grid-cols-[max-content,auto] xl:mb-16">
          <h2 className="font-semibold text-lg lg:text-base lg:font-bold mt-2">Border Countries:</h2>

          {borders.length ?
            <ul className="grid grid-cols-3 gap-x-2 gap-y-3 text-center 2xl:grid-cols-4">
              {borders.map((border, i) => <li key={i} className="bg-white drop-shadow shadow p-2 rounded-sm overflow-clip h-fit">
                {border}
              </li>)}
            </ul> : 

            <p className="text-center mt-2 justify-self-start">- None -</p>
          }
        </div>
      </div>



    </div>
  );
};

export default Country;


export const getStaticPaths = async () => {

  const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
  const countries = await res.json();

  const paths = countries.map(country => {
    let path = country.name.common.toLowerCase();
    return { params: { country: _.kebabCase(path) } };
  });

  return { paths, fallback: false };
};


export async function getStaticProps(context) {

  const { country } = context.params;
  let query = _.replace(country, '-', ' ');
  query = _.startCase(query);

  let data = null;

  await fetch(`https://restcountries.com/v3.1/name/${query}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`)
        .then((res) => res.json())
        .then((json) => data = _.find(json, item => item.name.common.toUpperCase() === query.toUpperCase()));
  return {
    props: { 'country': data },
  }
}