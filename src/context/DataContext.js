import React, { createContext, useContext, useState, useEffect } from "react";
import CapitalsList from "@components/CapitalsList";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [capitalsData, setCapitalsData] = useState([]);
  const [markedCapitals, setMarkedCapitals] = useState(() => {
    if (typeof window !== "undefined") {
      const storedMarkedCapitals = localStorage.getItem("markedCapitals");
      if (storedMarkedCapitals) {
        return JSON.parse(storedMarkedCapitals);
      }
    }

    const initialMarkedCapitals = {};
    CapitalsList.slice(0, 5).forEach((capital) => {
      initialMarkedCapitals[capital.capital] = true;
    });
    return initialMarkedCapitals;
  });

  useEffect(() => {
    setCapitalsData(CapitalsList);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("markedCapitals", JSON.stringify(markedCapitals));
    }
  }, [markedCapitals]);

  const updateCapitalsData = (newData) => {
    setCapitalsData(newData);
  };

  const updateMarkedCapitals = (newMarkedCapitals) => {
    setMarkedCapitals(newMarkedCapitals);
  };

  const contextValue = {
    capitalsData,
    updateCapitalsData,
    markedCapitals,
    updateMarkedCapitals,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
