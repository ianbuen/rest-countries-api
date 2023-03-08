import { CountryList } from "@/components/CountryList";
import { Dropdown } from "@/components/Dropdown";
import Searchbar from "@/components/Searchbar";
import path from "path";
import fs from "fs";

export default function Home({countries, regions}) {
  return <div className="grid gap-12">
    <Searchbar />
    <Dropdown items={regions} />
    <CountryList countries={countries} />
  </div>
}

export const getStaticProps = async () => {

  let useLocalData = false;
  let countries = [];
  let regions = [];

  // fetch from API
  await fetch('https://restcountries.com/v3.1/all')
  
    .then(res => {  // fetch succeeds 
      console.log("Data fetched from API successfully...");

      if (res.statusText !== "OK")
          useLocalData = true;
      else
          countries = res.json();
    })
        
    .catch(err => { // if fetch fails, use local data.json
      useLocalData = true; 
    }); 
    
    if (useLocalData) {
        console.log("Failed to fetch data from API, using local data...");
        const file = path.join(process.cwd(), 'src', 'data.json');
        countries = await JSON.parse(fs.readFileSync(file));
    }

  // get the regions for later filtering use
  if (countries.length > 0)
      regions = await countries?.reduce((list, {region}) => {
        if (!list)
            return [region];

        if (!list?.includes(region))
            return [...list, region];
        
        return list;
      }, []);

  return {
    props: { countries: countries.length > 0 ? countries.slice(0,24) : [], regions }
  }
};