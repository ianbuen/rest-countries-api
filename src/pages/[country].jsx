import BackButton from "@/components/BackButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import _ from "lodash";
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";

export const Country = ({ country }) => {

  const { name: {common} } = country;

  return (
    <>
      <Head>
        <title>{common} - REST Countries API</title>
      </Head>

      <div className="grid gap-y-20 p-10 pb-24 lg:p-20">
        <BackButton />
        <CountryDetails country={country} />
      </div>
    </>
  );
};

const CountryDetails = ({ country }) => {

  const [borders, setBorders] = useState([]);

  // the API only returns the 3-letter country code of the border countries
  // this effect will make more API fetches to resolve the names of the borders
  useEffect(() => {
    setBorders([]);
    country?.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
          .then(res => res.json())
          .then(({name: {common}}) => setBorders(borders => [...borders, common]));
    });
  }, [country]);

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

  if (!country && !borders.length) return <div className="flex justify-center w-full py-20">
      <LoadingIcon className="animate-spin text-7xl" />;
  </div>

  return (
    <div className="grid lg:grid-cols-2 md:gap-16 xl:gap-32">
      <div className="relative w-full aspect-[3/2] md:aspect-video lg:aspect-[3/2] 2xl:aspect-auto">
        <Image src={flags?.png} alt={`flag of ${name?.common}`} fill className="object-cover object-left" />
      </div>

      <div className="grid gap-8 lg:gap-10">
        <h2 className="font-bold text-2xl pt-14 xl:text-4xl md:pt-0">{name?.common}</h2>

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
              {borders?.map((border, i) => <Link key={i} href={`/${_.kebabCase(border)}`}>
                <li className="bg-white drop-shadow shadow p-2 rounded-sm overflow-clip h-fit dark:bg-dark-blue">{border}</li>
              </Link>)}
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
    let path = country.name.common;
    return { params: { country: _.kebabCase(path) } };
  });

  return { paths, fallback: false };
};


export async function getStaticProps(context) {

  const { country } = context.params;
  let query = _.replace(country, '-', ' ');
  query = _.startCase(query);

  // need to check for these special cases, because ie. 'Aland Islands' !== Åland Islands'
  // searching for 'aland' from the API returns 404
  const specials = ['Åland Islands', 'Cocos (Keeling) Islands', 'Guinea-Bissau',  'Heard Island and McDonald Islands', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Timor-Leste'];
  specials.forEach((item) => {
    if (_.kebabCase(item) === country)
        query = item;
  })

  let data = null; 

  await fetch(`https://restcountries.com/v3.1/name/${query}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`)
        .then((res) => res.json())
        .then((json) => data = _.find(json, item => _.kebabCase(item.name.common) === _.kebabCase(query)));
  return {
    props: { 'country': data },
  }
}