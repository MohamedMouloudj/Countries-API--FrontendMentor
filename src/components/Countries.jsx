import { useFiltersContext } from "../context/FiltersContext";
import CountryItem from "../components/CountryItem";
import Loader from "../components/Loader";
import styles from "./Countries.module.css";

function Countries() {
  const { filteredCountries: countries, isLoading } = useFiltersContext();

  return (
    <main className={styles.countriesContainer}>
      {isLoading && <Loader />}
      {countries?.map((country) => (
        <CountryItem key={country.name} country={country} />
      ))}
    </main>
  );
}

export default Countries;
