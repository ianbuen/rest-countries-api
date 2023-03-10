import { CountryList } from "@/components/CountryList";
import { Dropdown } from "@/components/Dropdown";
import Searchbar from "@/components/Searchbar";
import path from "path";
import fs from "fs";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

export default function Home({countries, regions}) {

  const refFilter = useRef(null);
  const refSearch = useRef(null);

  const state = useState({
    keywords: null,
    region: null
  }); 

  useEffect(() => {
    console.log(state);
  }, [state])
  

  return <>
    <div className="grid gap-10">
      <Searchbar ref={refSearch} state={state} />
      <Dropdown ref={refFilter} items={[null, ...regions]} state={state} />
      <CountryList countries={countries} />
    </div>
  </>
}

export const getStaticProps = async () => {

  let useLocalData = false;
  let countries = [];
  let regions = [];

  // fetch from API
  await fetch('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital')
  
    .then(res => {  // fetch succeeds but unable to get data
      
      if (res.statusText !== "OK")
          useLocalData = true;
      else
          return res.json();
      })

    .then(data => {
      console.log("Data fetched from API successfully...");
      countries = data;
    })
        
    .catch(err => { // if fetch fails, use local data.json
      useLocalData = true; 
    })
    
    .finally(() => {
      if (useLocalData) {
          console.log("Failed to fetch data from API, using local data...");
          const file = path.join(process.cwd(), 'src', 'data.json');
          countries = JSON.parse(fs.readFileSync(file));
      }

      // get the regions for later filtering use
      if (countries?.length > 0)
      regions = countries.reduce((list, {region}) => {
        if (!list)
            return [region];

        if (!list?.includes(region))
            return [...list, region];
        
        return list;
      }, []);
    }); 

  return {
    props: { 'countries': countries, regions }
  }
};