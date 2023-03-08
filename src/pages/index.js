import { CountryList } from "@/components/CountryList";
import { Dropdown } from "@/components/Dropdown";
import Searchbar from "@/components/Searchbar";
import path from "path";
import fs from "fs";

export default function Home({countries, regions}) {
  return <div className="grid gap-10">
    <Searchbar />
    <Dropdown items={['foo', 'bar', 'hello', 'world']} />
    <CountryList countries={countries} />
  </div>
}

export const getStaticProps = async () => {

  let countries = [];

  // fetch from API
  await fetch('https://restcountries.com/v3.1/all')
    .then(res => {  // fetch succeeds 
      console.log("Data fetched from API successfully...");
      countries = res.json();
    })
    .catch(err => { // if fetch fails, use local data.json
      console.log("Failed to fetch data from API, using local data...");
      const file = path.join(process.cwd(), 'src', 'data.json');
      countries = JSON.parse(fs.readFileSync(file));
    }); 

  // get the regions for later filtering use
  const regions = await countries.reduce((list, {region}) => {
    if (!list)
        return [region];

    if (!list?.includes(region))
        return [...list, region];
    
    return list;
  }, []);

  return {
    props: { countries: countries?.slice(0,24), regions }
  }
};