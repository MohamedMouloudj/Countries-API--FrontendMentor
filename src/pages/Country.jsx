import { useEffect } from "react";
import { useFiltersContext } from "../context/FiltersContext";
import { useUrlCountry } from "../hooks/useUrlCountry";
import styles from "./Country.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Country() {
  const navigate = useNavigate();
  const countryName = useUrlCountry();
  const { getCountry, selectedCountry, isLoading } = useFiltersContext();
  useEffect(() => {
    getCountry(countryName);
  }, [countryName]);

  return (
    <>
      <div className={styles.countryContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <button
              className={styles.backButton}
              onClick={() => navigate(-1, { replace: true })}
            >
              <span>&larr;</span> Back
            </button>
            <div className={styles.infoContainer}>
              <div className={styles.flag}>
                <img src={selectedCountry?.flag} alt="flag" />
              </div>
              <div className={styles.info}>
                <h2>{selectedCountry?.name}</h2>
                <div className={styles.leftRight}>
                  <div className={styles.leftInfo}>
                    <p>
                      <span>Native Name:</span> {selectedCountry?.nativeName}
                    </p>
                    <p>
                      <span>Population:</span> {selectedCountry?.population}
                    </p>
                    <p>
                      <span>Region:</span> {selectedCountry?.region}
                    </p>
                    <p>
                      <span>Sub Region:</span> {selectedCountry?.subregion}
                    </p>
                    <p>
                      <span>Capital:</span> {selectedCountry?.capital}
                    </p>
                  </div>
                  <div className={styles.rightInfo}>
                    <p>
                      <span>Top Level Domain:</span>{" "}
                      {selectedCountry?.topLevelDomain}
                    </p>
                    <p>
                      <span>Currencies:</span>{" "}
                      {selectedCountry?.currencies
                        .map((currency) => currency)
                        .join(", ")}
                    </p>
                    <p>
                      <span>Languages:</span>{" "}
                      {selectedCountry?.languages
                        .map((lang) => lang)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                {selectedCountry?.borders && (
                  <div className={styles.bordersContainer}>
                    <h3>Border Countries:</h3>
                    <div className={styles.borders}>
                      {selectedCountry.borders.map((border) => (
                        <span key={border}>{border}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Country;
