import { createContext, useContext, useReducer } from "react";

const BASE_URL = "https://restcountries.com/v3.1/";
const filtersContext = createContext();

const formatCountriesData = (data) => {
  return data.map((country) => {
    const { name, flags, population, region, capital } = country;
    return {
      name: name.common,
      flag: flags.png,
      population: population.toLocaleString("en-US"),
      region,
      capital,
    };
  });
};
const formatCountryData = (data) => {
  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = data;
  return {
    name: name.common,
    nativeName: name.nativeName
      ? Object.values(name.nativeName)
          .map((value) => value.common)
          .join(", ")
      : null,
    flag: flags.svg,
    population: population.toLocaleString("en-US"),
    region,
    subregion,
    capital,
    topLevelDomain: tld?.join(", "),
    currencies: currencies
      ? Object.values(currencies).map((currency) => currency.name)
      : null,
    languages: languages
      ? Object.values(languages).map((language) => language)
      : null,
    borders: borders?.length > 0 ? borders : null,
  };
};

const initialState = {
  originalCountries: null,
  filteredCountries: null,
  selectedCountry: null,
  isLoading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "originalCountries/get":
      return {
        ...state,
        originalCountries: formatCountriesData(action.payload),
        isLoading: false,
      };
    case "originalCountries/error":
      return {
        ...state,
        originalCountries: null,
        isLoading: false,
        error: "Something went wrong :/ ...",
      };
    case "filteredCountries/all":
      return {
        ...state,
        filteredCountries: state.originalCountries,
      };
    case "filteredCountries/filter":
      return {
        ...state,
        filteredCountries: state.originalCountries.filter(
          (country) => country.region === action.payload
        ),
      };
    case "filteredCountries/search":
      return {
        ...state,
        filteredCountries: state.originalCountries.filter((country) =>
          country.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "filteredCountries/both":
      return {
        ...state,
        filteredCountries: state.originalCountries.filter(
          (country) =>
            country.region === action.payload.region &&
            country.name
              .toLowerCase()
              .includes(action.payload.query.toLowerCase())
        ),
      };
    case "selectedCountry/get":
      return {
        ...state,
        selectedCountry: formatCountryData(action.payload),
        isLoading: false,
      };
    case "selectedCountry/error":
      return {
        ...state,
        selectedCountry: null,
        isLoading: false,
        error: "Something went wrong :/ ...",
      };
    default:
      return state;
  }
};

function FiltersContextProvider({ children }) {
  const [{ error, isLoading, filteredCountries, selectedCountry }, dispatch] =
    useReducer(reducer, initialState);

  function searchFilterControl(query, region) {
    if (!query && !region) {
      dispatch({ type: "filteredCountries/all" });
    }
    if (query && !region) {
      dispatch({ type: "filteredCountries/search", payload: query });
    }
    if (!query && region) {
      dispatch({ type: "filteredCountries/filter", payload: region });
    }
    if (query && region) {
      dispatch({ type: "filteredCountries/both", payload: { query, region } });
    }
  }

  async function getCountries() {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}all`);
      const data = await response.json();
      dispatch({ type: "originalCountries/get", payload: data });
      dispatch({ type: "filteredCountries/all" });
    } catch (e) {
      dispatch({ type: "originalCountries/error" });
    }
  }

  async function getCountry(countryName) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}name/${countryName}`);
      const data = await response.json();
      dispatch({ type: "selectedCountry/get", payload: data[0] });
    } catch (e) {
      dispatch({ type: "selectedCountry/error" });
    }
  }

  return (
    <filtersContext.Provider
      value={{
        error,
        isLoading,
        filteredCountries,
        selectedCountry,
        searchFilterControl,
        getCountries,
        getCountry,
      }}
    >
      {children}
    </filtersContext.Provider>
  );
}

const useFiltersContext = () => {
  const context = useContext(filtersContext);
  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context;
};

export { FiltersContextProvider, useFiltersContext };
