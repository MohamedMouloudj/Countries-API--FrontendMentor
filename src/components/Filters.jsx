import { IonSearchbar } from "@ionic/react";
import { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import DropList from "./DropList";
import { useFiltersContext } from "../context/FiltersContext";

const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function Filters() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const { searchFilterControl } = useFiltersContext();

  useEffect(() => {
    searchFilterControl(query, region);
  }, [query, region]);

  return (
    <div className={styles.filtersContainer}>
      <IonSearchbar
        placeholder="Search for a country..."
        class="searchBar"
        showCancelButton="focus"
        value={query}
        onIonChange={(e) => setQuery(e.detail.value)}
      />
      <DropList content={continents} setFilter={setRegion} />
    </div>
  );
}

export default Filters;
