import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useContextValue } from "../Contexts/CitiesContext";

function CountryList() {
  const { citiesData, isLoading } = useContextValue();
  if (isLoading) return <Spinner />;
  if (!citiesData.length)
    return (
      <Message message="Add your first Country by clicking on the Country on the map" />
    );

  const countries = citiesData.reduce((arr, obj) => {
    if (arr.some((ele) => ele.country === obj.country)) {
      return arr;
    } else {
      return [...arr, obj];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((obj) => {
        return <CountryItem obj={obj} key={obj.id} />;
      })}
    </ul>
  );
}

export default CountryList;
