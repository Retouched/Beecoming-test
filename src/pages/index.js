import React from "react";
import Head from "next/head";
import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";
import { useData } from "../context/DataContext";
import styles from "@styles/Home.module.scss";

const DEFAULT_CENTER = [38.907132, -77.036546];

export default function Home() {
  const { capitalsData, markedCapitals } = useData();

  const markedCapitalsData = capitalsData.filter(
    (capital) => markedCapitals[capital.capital]
  );

  return (
    <Layout>
      <Head>
        <meta name="description" content="Create your personnal map" />
        <link rel="icon" href="/beecoming_logo.svg" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>Technical test Beecoming</h1>

          <Map
            className={styles.homeMap}
            width="800"
            height="400"
            center={DEFAULT_CENTER}
            zoom={1}
          >
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {markedCapitalsData.map((capital, index) => (
                  <Marker
                    key={index}
                    position={[capital.latitude, capital.longitude]}
                  >
                    <Popup>
                      <strong>{capital.capital}</strong> - {capital.country} -
                      Population: {capital.population}
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </Map>
          <p className={styles.position}>
            Click on the map to mark your current position
          </p>
        </Container>
      </Section>
    </Layout>
  );
}
