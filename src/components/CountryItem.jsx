import styles from "./CountryItem.module.css";

function CountryItem({ obj }) {
  return (
    <li className={styles.countryItem}>
      <span>{obj.emoji}</span>
      <span>{obj.country}</span>
    </li>
  );
}

export default CountryItem;
