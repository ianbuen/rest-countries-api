import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Country = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();
  const { country } = router.query;

  useEffect(() => {
    const getData = async () => {
      fetch("https://restcountries.com/v3.1/name/" + country)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    };

    country && getData();
  }, [country]);

  if (isLoading) return <h1>Loading...</h1>;

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default Country;
