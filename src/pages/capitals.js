import { useState } from "react";
import { useData } from "src/context/DataContext";
import Head from "next/head";
import Layout from "@components/Layout";
import Button from "@components/Button";

import styles from "@styles/Capitals.module.scss";

const Capitals = () => {
  const {
    capitalsData,
    updateCapitalsData,
    markedCapitals,
    updateMarkedCapitals,
  } = useData();
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedLatitude, setEditedLatitude] = useState("");
  const [editedLongitude, setEditedLongitude] = useState("");
  const [editedPopulation, setEditedPopulation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedName(capitalsData[index].capital);
    setEditedCountry(capitalsData[index].country);
    setEditedLatitude(capitalsData[index].latitude.toString());
    setEditedLongitude(capitalsData[index].longitude.toString());
    setEditedPopulation(capitalsData[index].population.toString());
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedName("");
    setEditedCountry("");
    setEditedLatitude("");
    setEditedLongitude("");
    setEditedPopulation("");
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedCapitals = [...capitalsData];
      updatedCapitals[editIndex] = {
        ...updatedCapitals[editIndex],
        capital: editedName,
        country: editedCountry,
        latitude: parseFloat(editedLatitude),
        longitude: parseFloat(editedLongitude),
        population: parseInt(editedPopulation),
      };

      updateCapitalsData(updatedCapitals);

      setEditIndex(null);
      setEditedName("");
      setEditedCountry("");
      setEditedLatitude("");
      setEditedLongitude("");
      setEditedPopulation("");
      setIsEditing(false);
    }
  };

  const handleDelete = (index) => {
    const updatedCapitals = [...capitalsData];
    updatedCapitals.splice(index, 1);
    updateCapitalsData(updatedCapitals);
  };

  const handleCreate = () => {
    const newCapital = {
      country: "New country",
      capital: "New capital",
      latitude: 0,
      longitude: 0,
      population: 0,
      type: "Capital",
    };
    const updatedCapitals = [...capitalsData, newCapital];
    updateCapitalsData(updatedCapitals);

    const newIndex = 0;
    setEditIndex(newIndex);
    setEditedName("");
    setEditedCountry("");
    setEditedLatitude("");
    setEditedLongitude("");
    setEditedPopulation("");
  };

  const handleCheckboxChange = (capital) => {
    updateMarkedCapitals((prevMarkedCapitals) => {
      return { ...prevMarkedCapitals, [capital]: !prevMarkedCapitals[capital] };
    });
  };

  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta
          name="description"
          content="Create mapping apps with Next.js Leaflet Starter"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.tableContainer}>
        <Button onClick={handleCreate}>Create a new capital</Button>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableCell}>Marker</th>
              <th className={styles.tableCell}>Capital</th>
              <th className={styles.tableCell}>Country</th>
              <th className={styles.tableCell}>Latitude</th>
              <th className={styles.tableCell}>Longitude</th>
              <th className={styles.tableCell}>Population</th>
              <th className={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {capitalsData.map((capital, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={markedCapitals[capital.capital]}
                    onChange={() => handleCheckboxChange(capital.capital)}
                  />
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Enter capital name"
                    />
                  ) : (
                    capital.capital
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedCountry}
                      onChange={(e) => setEditedCountry(e.target.value)}
                      placeholder="Enter country name"
                    />
                  ) : (
                    capital.country
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editedLatitude}
                      onChange={(e) => setEditedLatitude(e.target.value)}
                      placeholder="Enter latitude"
                    />
                  ) : (
                    capital.latitude
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editedLongitude}
                      onChange={(e) => setEditedLongitude(e.target.value)}
                      placeholder="Enter longitude"
                    />
                  ) : (
                    capital.longitude
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editedPopulation}
                      onChange={(e) => setEditedPopulation(e.target.value)}
                      placeholder="Enter population"
                    />
                  ) : (
                    capital.population
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <div className={styles.btnContainer}>
                      <button
                        className={styles.button55}
                        onClick={() => handleSave(index)}
                      >
                        Save
                      </button>
                      <button
                        className={styles.button55}
                        onClick={() => handleCancel(index)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className={styles.btnContainer}>
                      <button
                        className={styles.button55}
                        onClick={() => {
                          setIsEditing(true);
                          handleEdit(index);
                        }}
                        disabled={isEditing}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.button55}
                        onClick={() => {
                          setIsEditing(true);
                          handleDelete(index);
                        }}
                        disabled={isEditing}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Capitals;
