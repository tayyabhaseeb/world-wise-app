// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useUrlState from "../hooks/useUrlState";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContextValue } from "../Contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlState();
  const [emoji, setEmoji] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addCity } = useContextValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapLat && !mapLng) return;
    async function data() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();

        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    data();
  }, [mapLat, mapLng]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,

      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };

    // console.log(newCity);
    await addCity(newCity);
    navigate("/app");
  }

  if (!cityName)
    return <Message message="You are not clicking on any country or city 😁" />;

  if (isLoading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          value={date}
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
