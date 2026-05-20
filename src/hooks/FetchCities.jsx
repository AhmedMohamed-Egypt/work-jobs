import { useEffect, useState } from "react";

export function useCities(search) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  

    const fetchCities = async () => {
      try {
        setLoading(true);

        // dummy api
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=US&minPopulation=1000000&limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-rapidapi-key":
                "13f6d8a0admshacd64ffa57b14cap1a8b1ajsn8c7fab47821d",
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            },
          },
        );

        const data = await response.json();
        if(response.ok){
            setCities(data.data.map((item)=>item.city))
        }
        //

   
        // setCities(uniqueCities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return {
    cities,
    loading,
  };
}
