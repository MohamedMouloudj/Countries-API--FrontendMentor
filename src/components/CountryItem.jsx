import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <Link to={`${country.name}`} className={styles.countryItem}>
      <div className={styles.countryContainer}>
        <div className={styles.imageContainer}>
          <img src={country.flag} alt="flag" />
        </div>
        <div className={styles.previewContainer}>
          <h3>{country.name}</h3>
          <div className={styles.previewDetails}>
            <p>
              <span>Population:</span> {country.population}
            </p>
            <p>
              <span>Region:</span> {country.region}
            </p>
            <p>
              <span>Capital:</span> {country.capital}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CountryItem;
