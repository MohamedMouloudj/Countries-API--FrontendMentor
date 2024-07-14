import { useEffect } from "react";
import Filters from "../components/Filters";
import { useFiltersContext } from "../context/FiltersContext";
import Countries from "../components/Countries";

function Home() {
  const { getCountries } = useFiltersContext();
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div>
      <Filters />
      <Countries />
    </div>
  );
}

export default Home;
