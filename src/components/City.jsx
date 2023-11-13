import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useContextValue } from "../Contexts/CitiesContext";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContextValue();

  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:8000/cities/${params.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setCurrentCity(data);
          setIsLoading(false); // Set isLoading to false on success
        });
    } catch (err) {
      // because when data not commes it throws error and this block runs
      console.log(err);
      setIsLoading(false);
    }
  }, [params.id, setIsLoading]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button onClick={() => navigate(-1)} type="back">
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
