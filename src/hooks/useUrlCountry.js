import { useParams } from "react-router-dom";

export function useUrlCountry() {
  const { countryName } = useParams();
  return countryName;
}
