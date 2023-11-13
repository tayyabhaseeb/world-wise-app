import { Link, NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useContextValue } from "../Contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ obj }) {
  const { cityName, emoji, date, id } = obj;
  const { handleDelete } = useContextValue();

  return (
    <li>
      <Link
        to={`${obj.id}?lat=${obj.position.lat}&lng=${obj.position.lng}`}
        className={`${styles.cityItem}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDelete(e, id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
