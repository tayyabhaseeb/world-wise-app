import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [citiesData, setCitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleDelete(e, id) {
    e.preventDefault();

    deleteCity(id);
  }

  useEffect(() => {
    async function dataFetch() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities`);
        const data = await res.json();
        setCitiesData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    dataFetch();
  }, []);

  async function addCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCitiesData((prev) => [...prev, data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      setCitiesData((prevArr) => prevArr.filter((obj) => obj.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        citiesData,
        isLoading,
        setIsLoading,
        addCity,
        handleDelete,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useContextValue() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context  Provider did not wrap this component");
  return context;
}

export { CitiesProvider, useContextValue };
