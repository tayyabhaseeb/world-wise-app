import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useContextValue } from "../Contexts/CitiesContext";

function CityList() {
  const { citiesData, isLoading } = useContextValue();

  if (isLoading) return <Spinner />;
  if (!citiesData.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {citiesData.map((obj) => {
        return <CityItem obj={obj} key={obj.id} />;
      })}
    </ul>
  );
}

export default CityList;
